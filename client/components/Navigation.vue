<template class="navigation">
  <div>
    <b-nav tabs fill>
      <b-nav-item id="index" exact exact-active-class="active" href="/">Spieler des Spiels</b-nav-item>
      <b-nav-item id="voting2" exact exact-active-class="active" href="/voting2">Spieler der Saison</b-nav-item>
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
