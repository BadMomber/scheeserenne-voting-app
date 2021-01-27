<template>
  <div>
    <b-container>
      <b-row>
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
  data: () => ({}),
  computed: {},
  apollo: {
    // scheesePairs: {
    //   query: gql`
    //     query scheesePairs {
    //       scheesePairs {
    //         pageInfo {
    //           hasNextPage
    //           hasPreviousPage
    //         }
    //         totalCount
    //         edges {
    //           cursor
    //           node {
    //             id
    //             scheeseA
    //             scheeseB
    //             weight
    //             distance
    //           }
    //         }
    //       }
    //     }
    //   `,
    // },
  },
}
</script>

>
