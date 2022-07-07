<template class="navigation">
  <div>
    <b-nav tabs fill>
      <b-nav-item id="index" href="/">Erwachsene</b-nav-item>
      <b-nav-item id="voting2"  href="/voting2">Bis 10 Jahre</b-nav-item>
      <b-nav-item id="voting3" href="/voting3">Bis 14 Jahre</b-nav-item>
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
