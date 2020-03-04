<template class="navigation">
  <div>
    <b-navbar type="dark">
      <b-navbar-brand to="/">
        HOME
      </b-navbar-brand>

      <b-navbar-nav>
        <b-nav-item v-if="!me" to="/voting">Voting</b-nav-item>
        <b-nav-item-dropdown v-if="me" text="Adminbereich" right>
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

      <b-navbar-nav v-if="me" class="ml-auto">
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
