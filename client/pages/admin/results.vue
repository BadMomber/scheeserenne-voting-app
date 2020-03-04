<template>
  <div>
    <b-container>
      <b-row>
        <b-col cols="12">
          <b-table
            striped
            hover
            :items="scheeseArray"
            :fields="fields"
            head-variant="dark"
            responsive
          />
        </b-col>
        <b-col cols="12">
          {{ votingsArray }}
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>
<style scoped lang="scss" />

<script>
import gql from "graphql-tag"

export default {
  data: () => ({
    scheeseFields: [{ key: "name", label: "Name" }],
    votingsFields: [
      { key: "name", label: "Name" },
      { key: "voderId", label: "voderId" },
      { key: "scheeseId", label: "scheeseId" },
      { key: "points", label: "points" },
    ],
  }),
  computed: {
    scheeseArray(ctx, callback) {
      return this.scheese && this.scheese.edges
        ? this.scheese.edges.map(e => e.node)
        : []
    },
    votingsArray(ctx, callback) {
      return this.votings && this.votings.edges
        ? this.votings.edges.map(e => e.node)
        : []
    },
  },
  apollo: {
    scheese: {
      query: gql`
        query scheese {
          scheese {
            pageInfo {
              hasNextPage
              hasPreviousPage
            }
            totalCount
            edges {
              cursor
              node {
                id
                name
              }
            }
          }
        }
      `,
    },
    votings: {
      query: gql`
        query votings {
          votings {
            pageInfo {
              hasNextPage
              hasPreviousPage
            }
            totalCount
            edges {
              cursor
              node {
                id
                voterId
                scheeseId
                points
                createdAt
              }
            }
          }
        }
      `,
    },
  },
}
</script>

>
