<template>
  <div>
    <b-container>
      <b-row>

        <b-col v-if="votersVotedList.length === 0" cols="12 mt-5">
          <b-button>
            Noch hat niemand abgestimmt
          </b-button>
        </b-col>

        <b-col v-else cols="12 mt-5">
            <p>Es haben {{ votersVotedList.length }} Personen an der Abstimmung teilgenommen.</p>
        </b-col>

        <b-col cols="12 mt-5">
          <b-button>
            Generate pairs
          </b-button>
        </b-col>
        <b-col cols="12 mt-5">
          <b-button>
            Calculate Results
          </b-button>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>
<style scoped lang="scss"></style>

<script>
import gql from "graphql-tag"

export default {
  data: () => ({
    votersVotedList: [],
  }),
  computed: {},
  apollo: {
    votersVotedList: {
      query: gql`
        query votersVotedList {
          votersVotedList {
            id
            voterHash
            hasVoted
          }
        }
      `,
    },
  },
  methods: {

    async calcResult() {
      this.error = null
      try {
        await this.$apollo.mutate({
          variables: {
            id: scheese.id,
          },
          mutation: gql`
            mutation calcResult($id: String!) {
              calcResult(id: $id) {
                id
              }
            }
          `,
        })
      } catch (e) {
        console.log("error", e)
      }
    },

    async removeScheese(scheese) {
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

>
