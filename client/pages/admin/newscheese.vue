<template>
  <b-container>
    <b-row>
      <b-col cols="12 mt-5">
        <b-form @submit.prevent="addScheese">
          <label class="mt-5" for="new-scheese-name"
            >Name für neue Scheese</label
          >
          <b-form-input id="new-scheese-name" v-model="name" />

          <b-button class="mt-5" type="reset" variant="danger"
            >Zurücksetzen</b-button
          >
        </b-form>
      </b-col>
    </b-row>
  </b-container>
</template>

<style lang="scss">
.role-form-group label {
  font-weight: 400;
}
label {
  font-weight: 700;
}
</style>

<script>
import gql from "graphql-tag"

export default {
  data: () => ({
    error: null,
    name: null,
    selectedFile: undefined,
  }),
  methods: {
    async addScheese(e) {
      e.preventDefault()

      this.error = null
      try {
        const {
          data: {
            addScheese: { id },
          },
        } = await this.$apollo.mutate({
          variables: {
            name: this.name,
          },
          mutation: gql`
            mutation addScheese($name: String!) {
              addScheese(name: $name) {
                id
              }
            }
          `,
        })

        const path = "/scheese/" + id

        // const client = this.$apolloProvider.defaultClient

        // this.$router.push(path)
      } catch (e) {
        console.log("error", e)
      }
    },
  },
}
</script>
