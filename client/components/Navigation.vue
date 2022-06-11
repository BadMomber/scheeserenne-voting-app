<template class="navigation">
  <div>
    <b-nav tabs fill>
      <b-nav-item id="index" href="/">Spieler des<br /> Spiels SVW</b-nav-item>
      <b-nav-item id="voting2"  href="/voting2">Spieler der<br /> Saison</b-nav-item>
      <b-nav-item id="voting3" href="/voting3">Spieler des<br /> Spiels FC </b-nav-item>
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
