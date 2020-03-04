<template>
  <div class="container">
    <div>
      <logo />
    </div>
  </div>
</template>

<script>
import Logo from "~/components/Logo.vue"

export default {
  components: {
    Logo,
  },
}
</script>

<style lang="scss" scoped>
// .container {
//   margin: 0 auto;
//   min-height: 100vh;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   text-align: center;
// }

// .links {
//   padding-top: 15px;
// }

body {
  background-color: #fff;
}

.container {
  background-color: #fff;
}
</style>
