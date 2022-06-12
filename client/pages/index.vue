<template>
  <div>
    <b-container id="main-content">
      <b-row class="justify-content-center">

        <b-col cols="12">
          <b-form>
            <label class="mt-1" for="new-scheese-name"
              >Abstimmungscode hier eingeben: </label
            >
            <b-form-input placeholder="Code..." id="new-scheese-name" v-model="voter_hash" />
          </b-form>
        </b-col>

        <b-col cols="10 mt-2">
          <!-- https://sortablejs.github.io/Vue.Draggable/#/transition-example-2 -->
          <div v-if="ratedScheese.length === 0" class="p-2">
            <h6 class="center red">
              Ziehen sie die Spieler zum bewerten hier hin.

              <!-- <div class="popup" @click="togglePopup">
                <b-button>Hilfe</b-button>
                <span class="popuptext" id="myPopup">
                  In der unteren Liste sehen Sie alle Scheese,
                  die ihren Lauf beendet haben.
                  <br>
                  <br>
                  Um eine Scheese zu bewerten,
                  ziehen Sie die Scheese aus der unteren Liste in die
                  obere Liste.
                  <br>
                  <br>
                  Ordnen Sie die Scheese entsprechend
                  Ihrer Wertung (Oben = meiste Punkte, unten = wenigste
                  Punkte).
                  <b-button id="close">X</b-button>
                </span>
              </div> -->
            </h6>
            <!-- <p class="warning">
              Um eine Scheese zu bewerten, ziehen Sie die Scheese bitte in
              dieses Feld.
            </p> -->
            <h5 class="center">&#8595;</h5>
          </div>
          <div v-else>
            <h5 class="center">Ihr Ranking (mind. 2 Spieler)</h5>
          </div>
          <draggable
            class="list-group rated-list"
            :list="ratedScheese"
            tag="ul"
            group="scheese"
            @change="calculatePoints"
          >
            <div
              v-for="(item, index) in ratedScheese"
              :key="item.id"
              class="list-group-item shadow display-flex rated"
              :v-bind="item.id"
            >
              <span
                class="platzhalter left"
                :style="{
                  backgroundImage:
                    'url(' + item.image + ')',
                }"
              ></span>
              <span class="right">
                <span class="rem2">{{ item.name }}</span
                >
                <b-badge variant="success" class="rem2 align-left rank"
                  >Rang: {{ index + 1 }}</b-badge
                >
              </span>
            </div>
          </draggable>
          <b-col v-if="scheeseListOne.length !== 0" cols="12">
            <h5 class="mt-5">Noch nicht gewertete Spieler</h5>
            <h5 class="center">&#8595;</h5>
          </b-col>
          <b-col v-else cols="12">
            <h5 class="done mt-5">Es gibt keine Spieler zu bewerten.</h5>
          </b-col>
          <draggable
            class="list-group not-rated-list"
            :list="scheeseListOne"
            tag="ul"
            group="scheese"
            @change="log"
          >
            <li
              v-for="(item, index) in scheeseListOne"
              :id="'item' + index"
              :key="item.id"
              class="list-group-item shadow display-flex not-rated"
              :v-bind="item.id"
            >
              <img class ="platzhalter left" id="scheeseImg" :src="item.image">
              <span class="right">
                <span class="rem2">{{ item.name }}</span
                >
                <span class="rem2 align-left rank">Rang: {{ index + 1 }}</span>
              </span>
            </li>
          </draggable>
        </b-col>
        <b-col cols="10 mt-5">
          <b-button
            class="bottom-absolute-left mb-5"
            variant="success"
            @click="addVotes"
          >
            Ranking speichern
          </b-button>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<style lang="scss">
#main-content {
  width: 100%;
  height: auto;
  // position: absolute;
  top: 0;
  right: 0;
  left: 0;
  // background-color: #4a4545;
}

#pre-content {
  animation: 1.5s appear;
  max-width: 400px;
  height: auto;
}

#help {
  padding: 5px 13px;
  background-color: var(--warning);
  border-radius: 50%;
  color: #000;
}

#scheeseImg {
  width: 100px;
}

.red {
  color: var(--danger);
}

.warning {
  color: var(--warning);
}

@keyframes appear {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@keyframes disappear {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}

.heading-bg {
  color: #000;
  background-color: var(--blue);
  padding: 5px;
}

.done {
  color: var(--success);
}

.display-flex {
  display: flex;
  justify-content: space-between;
  padding: 1rem;

  .platzhalter {
    background-position: center center;
    background-repeat: no-repeat;
    background-size: cover;
    display: block;
    width: 25%;
    height: 85px;
    background-color: none;
    align-self: center;
  }

  .right {
    width: 70%;
    text-align: right;
    overflow-x: hidden;
    align-self: center;
  }
}

.btn {
  font-size: 1.4rem;
}

.col-12,
.col-10 {
  padding-right: 0;
  padding-left: 0;
  text-align: center;
}

.button {
  margin-top: 35px;
}

.flip-list-move {
  transition: transform 0.5s;
}

.no-move {
  transition: transform 0s;
}

.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}

.list-group {
  min-height: 20px;
}

body {
  background-color: #4a4545;
  color: #fff;
}

.list-group-item {
  color: #000;
  background-color: #fff;
  cursor: move;
  margin: 5px;
  border-radius: 5px;
  height: 100px;
}

.list-group-item i {
  cursor: pointer;
}

.rem2 {
  font-size: 1.4rem;
}

.align-left {
  text-align: left;
  width: 100%;
  display: inline-block;
}

.rated-list {
  width: auto;
  min-height: 150px;
  border: 3px dashed #fff;
  border-radius: 5px;
  padding: 10px;
  margin: 0 10px;
}

.not-rated-list {
  .rang {
    display: none;
  }
}

.not-rated {
  opacity: 0.75;
  .rank {
    display: none;
  }
}

.navbar-expand .navbar-collapse {
    justify-content: space-evenly;
}

.active {
  background-color: white;
}
</style>

<script>
import gql from "graphql-tag"
import draggable from "vuedraggable"


export default {
  name: "TransitionExample",
  display: "Transition",
  order: 6,
  components: {
    draggable,
  },
  apollo: {
    scheeseListOne: {
      query: gql`
        query scheeseListOne {
          scheeseListOne {
            id
            name
            image
            finished
          }
        }
      `,
    },
    votingStati: {
      query: gql`
        query votingStati {
          votingStati {
            id
            votingIsActive
            votingMessage
          }
        }
      `,
    },
    voterList: {
      query: gql`
        query voterList {
          voterList {
            id
            voterHash
            hasVoted
          }
        }
      `,
    },
  },
  data: () => ({
    scheeseListOne: [],
    ratedScheese: [],
    voter_hash: undefined,
    voterByHash: undefined,
    // voterById: undefined,
    voterList: undefined,
    votingStati: [],
    ratedScheeseLengthPointStep: undefined,
    id: 1,
  }),
  computed: {
    maxPoints() {
      return this.scheeseListOne.length
    },
    voterHashList() {
      return this.voterList.map((e) => (
        e.voterHash
      ))
    },
    votingStatus() {
      return this.votingStati.map((e) => ({
        voting_status: e.voting_status,
        voting_message: e.voting_message
      }))
    }
  },
  variables() {
    return {
      id: this.id,
    }
  },
  methods: {
    setActive() {
      console.log("setActive")
      console.log("this.scheeseListOne.length", this.scheeseListOne.length)
      if(this.scheeseListOne.length !== 0) {
        document.getElementById("index").classList.add('active');
      }
    },
    togglePopup() {
      var popup = document.getElementById("myPopup");
      popup.classList.toggle("show");
    },
    log(evt) {
      window.console.log(evt)
      console.log("rataedScheese length:", this.ratedScheese)
      // console.log("ratedScheese length: ", this.ratedScheese.length)
      // console.log("notRatedScheese length: ", this.scheeseListOne.length)
    },
    logRated() {
      console.log("rataedScheese length:", this.ratedScheese)
    },
    addHash() {
      this.validateHash()
      // const result = await this.$apollo.queries.voterById.refetch( { id: 1 } )
    },
    validateHash() {
      console.log("addHash")
      console.log("this.voterList", this.voterList)
      console.log("this.voter_hash", this.voter_hash)
      // const voterHashList = this.voterList.map((e) => (
      //   e.voterHash
      // ))
      console.log("voterHashList", this.voterHashList)
      const validHash = this.voterHashList.indexOf(this.voter_hash.toLowerCase())
      console.log("validHash", validHash)
      console.log("votingStatus", this.votingStati)

      return validHash
    },
    sort() {
      this.scheeseListOne = this.scheeseListOne.sort((a, b) => a.order - b.order)
    },
    pointMapper(index) {
      // console.log("index:", index)
      return this.maxPoints - index
    },
    calculatePoints(evt) {
      // console.log(this.ratedScheese)
    },
    async addVotes(e) {
      e.preventDefault()
      this.error = null

      try {
        if(this.validateHash() != -1) {

          let divisor = 1
            if (this.ratedScheese.length > 1) {
            divisor = this.ratedScheese.length - 1
          }
          console.log("divisor", divisor)
          const votes = []

          this.ratedScheese.forEach(async(scheese, index) => {
            const p = (this.ratedScheese.length - index - 1) / divisor

            const v = {
              scheeseId: scheese.id,
              voter_hash: this.voter_hash,
              rank: index + 1,
              points: p
            }

            votes.push(v)
          })

          await this.$apollo.mutate({
            variables: {
              votes: votes
            },
            mutation: gql`
              mutation addVotes($votes: [VoteInput]!) {
                addVotes(votes: $votes) {
                  id
                }
              }
            `,
          })

          this.$toasted.show("Erfolgreich abgestimmt", {
              type: "success",
              duration: 2500,
              action: {
                text: "OK",
                onClick: (e, toastObject) => {
                  toastObject.goAway(0)
                },
              },
            })

        } else {
            this.$toasted.show("Kein gültiger Abstimmungscode", {
              type: "error",
              duration: 2500,
              action: {
                text: "OK",
                onClick: (e, toastObject) => {
                  toastObject.goAway(0)
                },
              },
            })

            throw new Error("invalid voter code")
          }

        // console.log("this", this.scheeseListOne)
        this.setHasVoted(e)
      } catch(e) {
        console.log("Error adding votes:", e)
      }
    },
    async setHasVoted(e) {
      e.preventDefault()

      this.error = null
      try {
        await this.$apollo.mutate({
          variables: {
            voter_hash: this.voter_hash,
            voted: true,
          },
          mutation: gql`
            mutation setHasVoted($voter_hash: String!, $voted: Boolean!) {
              setHasVoted(voter_hash: $voter_hash, voted: $voted)
            }
          `,
        })
      } catch (e) {
        console.log("error", e)
      }
    },
  },
  updated(){
    this.setActive()
  },
}
</script>
