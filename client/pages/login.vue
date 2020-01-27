<template>
  <b-container class="customers-page">
    <b-row class="mt-5">
      <b-col cols="12">
        <b-alert variant="danger" :show="error" dismissible>{{
          error
        }}</b-alert>
        <b-form @submit.prevent="login">
          <label for="feedback-user">User ID</label>
          <b-input id="feedback-user" v-model="username" />
          <b-form-invalid-feedback>
            Your user ID must be 5-12 characters long.
          </b-form-invalid-feedback>
          <b-form-valid-feedback>
            Looks Good.
          </b-form-valid-feedback>

          <label for="text-password">Password</label>
          <b-input
            id="text-password"
            v-model="password"
            type="password"
            aria-describedby="password-help-block"
          />
          <b-form-text id="password-help-block">
            Your password must be 8-20 characters long, contain letters and
            numbers, and must not contain spaces, special characters, or emoji.
          </b-form-text>

          <b-button type="submit" variant="primary">Submit</b-button>
          <b-button type="reset" variant="danger">Reset</b-button>
        </b-form>
      </b-col>
    </b-row>
  </b-container>
</template>

<style lang="scss"></style>
<script>
import gql from "graphql-tag"
export default {
  data: () => ({
    error: null,
    username: null,
    password: null,
    me: undefined,
  }),
  apollo: {
    me: {
      query: gql`
        query me {
          me {
            id
            username
            role
          }
        }
      `,
    },
  },
  methods: {
    async login(e) {
      e.preventDefault()

      this.error = null

      console.log("login creds", this.username, this.password)

      try {
        const {
          data: {
            login: { role },
          },
        } = await this.$apollo.mutate({
          variables: {
            username: this.username,
            password: this.password,
          },
          mutation: gql`
            mutation login($username: String!, $password: String!) {
              login(username: $username, password: $password) {
                id
                email
                username
                role
              }
            }
          `,
        })

        console.log("role", role)

        const path = role === "foreman" ? "/editTimesheet" : "/"

        const client = this.$apolloProvider.defaultClient

        this.$router.push(path, () =>
          Promise.all([this.$apolloHelpers.onLogin(client)]),
        )
      } catch (e) {
        console.error("login error", e)
        this.error = e.message
      }
    },
  },
}
</script>
