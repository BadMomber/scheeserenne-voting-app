import { SchemaDirectiveVisitor } from "graphql-tools"
import {
  defaultFieldResolver,
  DirectiveLocation,
  GraphQLDirective,
} from "graphql"
import { AuthenticationError, ForbiddenError } from "apollo-server-express"

import { hasRole } from "./auth.js"

// provides: directive @role(requires: Role = ADMIN) on OBJECT | FIELD_DEFINITION
class AuthDirective extends SchemaDirectiveVisitor {
  visitObject(type) {
    this.ensureFieldsWrapped(type)
    type._requiredAuthRole = this.args.requires
  }

  // Visitor methods for nested types like fields and arguments
  // also receive a details object that provides information about
  // the parent and grandparent types.
  visitFieldDefinition(field, details) {
    this.ensureFieldsWrapped(details.objectType)
    field._requiredAuthRole = this.args.requires
  }

  ensureFieldsWrapped(objectType) {
    // Mark the GraphQLObjectType object to avoid re-wrapping:
    if (objectType._authFieldsWrapped) {
      return
    }
    objectType._authFieldsWrapped = true

    const fields = objectType.getFields()

    Object.keys(fields).forEach(fieldName => {
      const field = fields[fieldName]
      const { resolve = defaultFieldResolver } = field

      field.resolve = function(...args) {
        // Get the required Role from the field first, falling back
        // to the objectType if no Role is required by the field:
        const requiredRole =
          field._requiredAuthRole || objectType._requiredAuthRole

        if (!requiredRole) {
          return resolve.apply(this, args)
        }

        const context = args[2]
        const { currentUser } = context

        if (requiredRole !== "guest" && !currentUser) {
          throw new AuthenticationError("Please login")
        }

        if (!hasRole(currentUser, requiredRole)) {
          throw new ForbiddenError("insufficient rights")
        }

        return resolve.apply(this, args)
      }
    })
  }

  static getDirectiveDeclaration(directiveName, schema) {
    // const previousDirective = schema.getDirective(directiveName)
    // if (previousDirective) {
    //   // If a previous directive declaration exists in the schema, it may be
    //   // better to modify it than to return a new GraphQLDirective object.
    //   previousDirective.args.forEach(arg => {
    //     if (arg.name === "requires") {
    //       // Lower the default minimum Role from ADMIN to REVIEWER.
    //       arg.defaultValue = "admin"
    //     }
    //   })

    //   return previousDirective
    // }

    return new GraphQLDirective({
      name: directiveName,
      locations: [DirectiveLocation.OBJECT, DirectiveLocation.FIELD_DEFINITION],
      args: {
        requires: {
          // Having the schema available here is important for
          // obtaining references to existing type objects, such
          // as the Role enum.
          type: schema.getType("Role"),
          defaultValue: "admin",
        },
      },
    })
  }
}

export default {
  role: AuthDirective,
}
