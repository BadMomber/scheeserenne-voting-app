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
  apollo: {},
}
</script>
