<template>
  <div>
    <b-container id="main-content">
      <b-row class="justify-content-center">
        <b-col v-if="allVotes" cols="4 mt-5">
        <h2>Ranking 1</h2>
          <h2>Result</h2>
          <div
              v-for="(v) in allVotes"
              :key="v.scheeseId"
              class="list-group-item shadow display-flex rated"
              :v-bind="v.scheeseId"
            >
              <span>
                <span class="rem2">Scheese Name:{{ v.name }}</span
                ><br />
                <span class="rem2">Scheese Id:{{ v.scheeseId }}</span
                ><br />
                <span class="rem2">Punkte: {{ v.points }}</span
                ><br />
              </span>
            </div>
        </b-col>
        <b-col v-if="allVotesVoting2" cols="4 mt-5">
        <h2>Ranking 2</h2>
          <h2>Result</h2>
          <div
              v-for="(v) in allVotesVoting2"
              :key="v.scheeseId"
              class="list-group-item shadow display-flex rated"
              :v-bind="v.scheeseId"
            >
              <span>
                <span class="rem2">Scheese Name:{{ v.name }}</span
                ><br />
                <span class="rem2">Scheese Id:{{ v.scheeseId }}</span
                ><br />
                <span class="rem2">Punkte: {{ v.points }}</span
                ><br />
              </span>
            </div>
        </b-col>
        <b-col v-if="allVotesVoting3" cols="4 mt-5">
        <h2>Ranking 3</h2>
          <h2>Result</h2>
          <div
              v-for="(v) in allVotesVoting3"
              :key="v.scheeseId"
              class="list-group-item shadow display-flex rated"
              :v-bind="v.scheeseId"
            >
              <span>
                <span class="rem2">Scheese Name:{{ v.name }}</span
                ><br />
                <span class="rem2">Scheese Id:{{ v.scheeseId }}</span
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
            >Punkte anzeigen Voting 1</b-button
          >

          <b-button @click="getPoints2" class="mt-5" type="button" variant="success"
            >Punkte anzeigen Voting 2</b-button
          >

          <b-button @click="getPoints3" class="mt-5" type="button" variant="success"
            >Punkte anzeigen Voting 3</b-button
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
    allVotesVoting2: [],
    allVotesVoting3: [],
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
    allVotesVoting2: {
      query: gql`
        query allVotesVoting2 {
          allVotesVoting2 {
            scheeseId
            points
          }
        }
      `,
    },
    allVotesVoting3: {
      query: gql`
        query allVotesVoting3 {
          allVotesVoting3 {
            scheeseId
            points
          }
        }
      `,
    },
    password: {
      query: gql`
        query password {
          password {
            id
            password
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

      for (const num of this.allVotesVoting2) {
        counts[num] = counts[num] ? counts[num] + 1 : 1;
      }

      for (const num of this.allVotesVoting3) {
        counts[num] = counts[num] ? counts[num] + 1 : 1;
      }

    },
    async getPoints() {
      console.log("getPoints:", this.admin_password)
      this.$apollo.queries.allVotes.refetch()

      console.log("this.password", this.password)
      this.allVotes = this.allVotes.sort(this.comparePoints);
    },
    async getPoints2() {
      console.log("getPoints:", this.admin_password)
      this.$apollo.queries.allVotesVoting2.refetch()

      console.log("this.password", this.password)
      this.allVotesVoting2 = this.allVotesVoting2.sort(this.comparePoints);
    },
    async getPoints3() {
      console.log("getPoints:", this.admin_password)
      this.$apollo.queries.allVotesVoting3.refetch()

      console.log("this.password", this.password)
      this.allVotesVoting3 = this.allVotesVoting3.sort(this.comparePoints);
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
