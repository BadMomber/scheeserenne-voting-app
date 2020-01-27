<template>
  <div>
    <b-navbar type="dark">
      <b-navbar-brand to="/">
        HOME
      </b-navbar-brand>

      <b-navbar-nav>
        <b-nav-item to="/voting">Voting</b-nav-item>
        <b-nav-item-dropdown text="Adminbereich" right>
          <b-dropdown-item to="/admin/newuser">Neuer User</b-dropdown-item>
          <b-dropdown-item to="/admin/newscheese">Neue Scheese</b-dropdown-item>
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
  methods: {},
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
