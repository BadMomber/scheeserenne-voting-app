<template>
  <div>
    <b-container id="main-content">
      <b-row class="justify-content-center">
        <b-col cols="11">
          <div class="display-flex">
            <h4 class="heading-bg">
              ScheesePairs
            </h4>
            <h4 id="help" class="shadow">?</h4>
          </div>
        </b-col>
        <b-col cols="12 mt-2">
          <div v-if="scheesePairs === 0" class="p-2">
            <h5 class="center">Loading...</h5>
            <b-button
            class="bottom-absolute-left"
            variant="success"
            @click="log"
          >
            Neues Ranking speichern
          </b-button>

          </div>
          <div v-else>
            <h5 class="center red">
              ScheesePairs
            </h5>
            <b-button
            class="bottom-absolute-left"
            variant="success"
            @click="log"
          >
            </b-button>
            <div
              v-for="(item) in scheesePairs"
              :key="item.id"
              class="list-group-item shadow display-flex rated"
              :v-bind="item.id"
            >
            <span>{{item}}</span>
            </div>
          </div>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import gql from "graphql-tag"


export default {
  data: () => ({
    scheesePairs: [],
  }),
  apollo: {
    scheesePairs: {
      query: gql`
        query scheesePairs {
          scheesePairs {
            id
            scheeseOne
            scheeseTwo
            weight
            distance
            createdAt
            updatedAt
          }
        }
      `,
    },
  },
  methods: {

    async log() {
      this.error = null
      try {
        console.log("scheesePairs", this.scheesePairs)
      } catch (e) {
        console.log("error", e)
      }
    },
  },
}

</script>
