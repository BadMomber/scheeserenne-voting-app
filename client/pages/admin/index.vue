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
                <span class="rem2">Spieler Id:{{ v.scheeseId }}</span
                ><br />
                <span class="rem2">Punkte: {{ v.points }}</span
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

          <b-button @click="getCounts" class="mt-5" type="button" variant="success"
            >Votings zählen</b-button
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
    comparePoints(a, b) {
      if (a.points > b.points) {
        return -1;
      }
      if (a.points < b.points) {
        return 1;
      }
      return 0;
    },
    onlyUnique(value, index, self) {
      return self.indexOf(value) === index;
    },
    getCounts() {
      const counts = {};

      for (const num of this.allVotes) {
        counts[num] = counts[num] ? counts[num] + 1 : 1;
      }

      console.log(counts[{'scheeseId': 1}], counts[{'scheeseId': 2}], counts[{'scheeseId': 3}], counts[{'scheeseId': 4}]);
    },
    async getPoints() {
      console.log("getPoints:", this.admin_password)
      this.$apollo.queries.allVotes.refetch()

      this.allVotes = this.allVotes.sort(this.comparePoints);
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
