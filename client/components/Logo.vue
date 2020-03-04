<template>
  <b-container>
    <b-row>
      <b-col cols="12">
        <img id="logo" src="@/assets/images/svw-wappen.png" alt="" />
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  name: "Navigation",
  data: () => ({}),
  computed: {},
  methods: {},
  apollo: {},
}
</script>

<style>
#logo {
  animation: 2.5s appear;
  width: 400px;
  height: auto;
}

@keyframes appear {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>
