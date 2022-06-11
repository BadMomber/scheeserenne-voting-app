<template class="navigation">
  <div>
    <b-nav tabs fill>
      <b-nav-item exact exact-active-class="active" to="/">Spieler des Spiels</b-nav-item>
      <b-nav-item exact exact-active-class="active" to="/voting2">Spieler der Saison</b-nav-item>
    </b-nav>
  </div>
</template>

<style lang="scss">
.navbar,
.bg-dark {
  display: block;
  background-color: black;
}
</style>

<script>
import gql from "graphql-tag"

export default {
  name: "Navigation",
  data: () => ({}),
}
</script>
