<template>
  <div>

    <b-container id="main-content">
      <b-row class="justify-content-center">
        <b-col cols="12">
            <h5 class="mt-5">Alle Scheese</h5>

          </b-col>
          <ul
            class="list-group not-rated-list"
            :list="scheeseList"
            tag="ul"
            group="scheese"
          >
            <li
              v-for="(item, index) in scheeseList"
              :id="'item' + index"
              :key="item.id"
              class="list-group-item shadow display-flex not-rated"
              :v-bind="item.id"
            >
            <span
                class="left"
              >
              <b-button
            class="bottom-absolute-left"
            variant="warning"
            @click="removeScheese(item)"
          >
          Scheese löschen</b-button>
            </span>
              <span class="right">
                <span class="rem2">{{ item.name }}</span
                ><br />
                <span class="rem2 align-left rank">Rang: {{ index + 1 }}</span>
              </span>
            </li>
          </ul>
      </b-row>
    </b-container>
  </div>
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
    picture: null,
    selectedFile: undefined,
  }),
  apollo: {
    scheeseList: {
      query: gql`
        query scheeseList {
          scheeseList {
            id
            name
            finished
          }
        }
      `,
    },
  },
  methods: {

    async removeScheese(scheese) {
      console.log("scheese", scheese)
      this.error = null
      try {
        await this.$apollo.mutate({
          variables: {
            id: scheese.id,
          },
          mutation: gql`
            mutation removeScheese($id: String!) {
              removeScheese(id: $id) {
                id
              }
            }
          `,
        })
      } catch (e) {
        console.log("error", e)
      }
    },
  },
}
</script>
