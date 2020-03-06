<template class="navigation">
  <div v-if="me">
    <b-navbar type="dark">
      <b-navbar-nav>
        <b-nav-item-dropdown text="Adminbereich" right>
          <b-dropdown-item to="/admin/newuser">Neuer User</b-dropdown-item>
          <b-dropdown-item to="/admin/newscheese">Neue Scheese</b-dropdown-item>
          <b-dropdown-item to="/admin/results"
            >Ergebnisse & Statistik</b-dropdown-item
          >
          <b-dropdown-item to="/admin/results"
            >Scheesen verwalten</b-dropdown-item
          >
          <b-dropdown-item to="/admin/results"
            >Abstimmung verwalten</b-dropdown-item
          >
        </b-nav-item-dropdown>
      </b-navbar-nav>

      <b-button @click="logMe" />

      <b-navbar-nav class="ml-auto">
        <b-nav-item-dropdown :text="me.username" right>
          <b-dropdown-item @click="logout">Logout</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-navbar>
  </div>
</template>

<style lang="scss">
.navbar,
.bg-dark {
  background-color: black;
}
</style>

<script>
import gql from "graphql-tag"

export default {
  name: "Navigation",
  data: () => ({
    me: {
      id: undefined,
      role: undefined,
    },
  }),
  methods: {
    logMe() {
      console.log("me: ", this.me)
    },
    async logout(e) {
      e.preventDefault()

      await this.$apollo.mutate({
        mutation: gql`
          mutation logout {
            logout {
              message
            }
          }
        `,
      })

      // redirect back to login
      const client = this.$apolloProvider.defaultClient

      this.$router.push("/login", () =>
        Promise.all([this.$apolloHelpers.onLogout(client)]),
      )
    },
  },
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
}
</script>
