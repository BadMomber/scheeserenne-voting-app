<template>
  <div>
    <b-container id="main-content">
      <b-row class="justify-content-center">
        <b-col v-if="allVotes" cols="12 mt-5">
          <h2>Result</h2>
          <div
              v-for="(v) in allVotes"
              :key="v.scheeseId"
              class="list-group-item shadow display-flex rated"
              :v-bind="v.scheeseId"
            >
              <span>
                <span class="rem2">{{ v.scheeseId }}</span
                ><br />
                <span class="rem2">{{ v.points }}</span
                ><br />
              </span>
            </div>
        </b-col>
        <b-col v-else cols="12 mt-2">
          <h2>Please provide admin pw to get the current results</h2>
        </b-col>
        <b-col cols="12 mt-2">
          <b-form>
          <label class="mt-5" for="admin-password"
            >Passwort</label
          >
          <b-form-input id="admin_password" v-model="admin_password" />

          <b-button @click="getPoints" class="mt-5" type="button" variant="success"
            >Punkte anzeigen</b-button
          >

           <b-button @click="calcResult" class="mt-5" type="button" variant="success"
            >Ergebnis berechnen</b-button
          >
        </b-form>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import gql from "graphql-tag"


export default {
  data: () => ({
    allVotes: [],
    admin_password: undefined,
  }),
  apollo: {
    allVotes: {
      query: gql`
        query allVotes {
          allVotes {
            scheeseId
            points
          }
        }
      `,
    },
  },
  methods: {
    onlyUnique(value, index, self) {
      return self.indexOf(value) === index;
    },
    async getPoints() {
      console.log("getPoints:", this.admin_password)
      this.$apollo.queries.allVotes.refetch()
    },

    async calcResult() {
      const scheeseIds = this.allVotes.map(v => {
        return v.scheeseId
      })
      const uniqueIds = [...new Set(scheeseIds)]
      console.log("scheeseIds", scheeseIds)
      console.log("uniqueIds", uniqueIds)
    },
  },
}

</script>
