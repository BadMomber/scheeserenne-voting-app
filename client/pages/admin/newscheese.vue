<template>
  <b-container>
    <b-row>
      <b-col cols="12 mt-5">
        <b-form @submit.prevent="newScheese">
          <label class="mt-5" for="new-scheese-name"
            >Name für neue Scheese</label
          >
          <b-form-input id="new-scheese-name" v-model="name" />
          <b-form-file
            v-model="file"
            :state="Boolean(file)"
            placeholder="Choose a file or drop it here..."
            drop-placeholder="Drop file here..."
            class="mt-5"
          />
          <div class="mt-3">Selected file: {{ file ? file.name : "" }}</div>

          <b-button class="mt-5" type="submit" variant="success"
            >Speichern</b-button
          >
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
    file: null,
  }),
  methods: {
    async newScheese(e) {
      e.preventDefault()

      this.error = null
      try {
        const {
          data: {
            newScheese: { id },
          },
        } = await this.$apollo.mutate({
          variables: {
            name: this.name,
          },
          mutation: gql`
            mutation newScheese($name: String!) {
              newScheese(name: $name) {
                id
              }
            }
          `,
        })

        const path = "/scheese/" + id

        const client = this.$apolloProvider.defaultClient

        this.$router.push(path, () =>
          Promise.all([this.$apolloHelpers.onLogin(client)]),
        )
      } catch (e) {
        console.log("error", e)
      }
    },
  },
}
</script>
