<template>
  <b-container>
    <b-row>
      <b-col cols="12 mt-5">
        <b-form @submit.prevent="addScheese">
          <label class="mt-5" for="new-scheese-name"
            >Name für neue Scheese</label
          >
          <b-form-input id="new-scheese-name" v-model="name" />

          <b-form-file
            v-model="picture"
            placeholder="Choose a file or drop it here..."
            class="mt-5"
            accept="image/*"
            @change="setSelectedFile"
          />

          <div class="mt-3">
            Selected file: {{ picture ? picture.name : "" }}
          </div>

          <b-button class="mt-5" variant="success" @click="addScheese"
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
import UPLOAD_PHOTO from "../../graphql/uploadPhoto"

export default {
  data: () => ({
    error: null,
    name: null,
    picture: null,
    selectedFile: undefined,
  }),
  methods: {
    async uploadPhoto(event) {
      await this.$apollo.mutate({
        mutation: UPLOAD_PHOTO,
        variables: {
          photo: target.files[0],
        },
      })
      console.log("target: ", event.target)
      console.log("event: ", event)
    },
    setSelectedFile(event) {
      this.selectedFile = event.target.files[0]
      console.log("file changed: ", this.selectedFile)
    },
    onUpload() {
      console.log("file: ", this.selectedFile)
      // upload file
    },
    async addScheese(e) {
      e.preventDefault()

      console.log("picture: ", this.selectedFile)

      this.error = null
      try {
        const {
          data: {
            addScheese: { id },
          },
        } = await this.$apollo.mutate({
          variables: {
            name: this.name,
            picture: this.selectedFile,
          },
          mutation: gql`
            mutation addScheese($name: String!, $picture: Upload!) {
              addScheese(name: $name, picture: $picture) {
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
