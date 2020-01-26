import knex from "knex"
import {
  camelCase,
  isArray,
  isObjectLike,
  isPlainObject,
  map,
  set,
  snakeCase,
  transform,
} from "lodash"

import { DATABASE_URL } from "./config.js"

// Credits: https://github.com/cape-io/lodash-humps
function createIteratee(converter, self) {
  return (result, value, key) =>
    set(result, converter(key), isObjectLike(value) ? self(value) : value)
}

function createHumps(keyConverter) {
  return function humps(node) {
    if (isArray(node)) {
      return map(node, humps)
    }
    if (isPlainObject(node)) {
      return transform(node, createIteratee(keyConverter, humps))
    }
    return node
  }
}

// const snake = createHumps(snakeCase)
const camel = createHumps(camelCase)

const db = knex({
  client: "pg",
  connection: DATABASE_URL,
  dateStrings: true,
  wrapIdentifier: (value, wrapIdentifier) =>
    value === "*" ? wrapIdentifier(value) : wrapIdentifier(snakeCase(value)),
  postProcessResponse: (result, queryContext) => {
    // TODO: add special case for raw results (depends on dialect)
    if (Array.isArray(result)) {
      return result.map(row => camel(row))
    } else {
      return camel(result)
    }
  },
})

export default db
