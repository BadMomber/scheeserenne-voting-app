<template>
  <b-container>
    <b-row>
      <b-col cols="3">
        <button class="btn btn-secondary button" @click="sort">
          Reihenfolge zurücksetzen
        </button>
      </b-col>
      <b-col cols="9">
        <h3>Reihenfolge (Absteigend)</h3>
        <draggable
          v-model="list"
          class="list-group"
          tag="ul"
          v-bind="dragOptions"
          @start="isDragging = true"
          @end="isDragging = false"
          @change="calculatePoints"
        >
          <transition-group type="transition" name="flip-list">
            <li
              v-for="element in list"
              :key="element.order"
              class="list-group-item"
            >
              <i
                :class="
                  element.fixed ? 'fa fa-anchor' : 'glyphicon glyphicon-pushpin'
                "
                aria-hidden="true"
                @click="element.fixed = !element.fixed"
              />
              {{ element.name }}
            </li>
          </transition-group>
        </draggable>
      </b-col>
    </b-row>
  </b-container>
</template>

<style lang="scss">
.row {
  width: 100%;
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

.list-group-item {
  cursor: move;
}

.list-group-item i {
  cursor: pointer;
}
</style>

<script>
import draggable from "vuedraggable"
const scheese = [
  "Scheese 001",
  "Scheese 002",
  "Scheese 003",
  "Scheese 004",
  "Scheese 005",
  "Scheese 006",
  "Scheese 007",
  "Scheese 008",
  "Scheese 009",
  "Scheese 010",
]

const maxPoints = scheese.length

export default {
  name: "TransitionExample",
  display: "Transition",
  order: 6,
  components: {
    draggable,
  },
  data() {
    return {
      list: scheese.map((name, index) => {
        return { name, order: index + 1 }
      }),
    }
  },
  computed: {
    dragOptions() {
      return {
        animation: 0,
        group: "description",
        disabled: false,
        ghostClass: "ghost",
      }
    },
  },
  methods: {
    sort() {
      this.list = this.list.sort((a, b) => a.order - b.order)
    },
    log(evt) {
      window.console.log(evt)
      console.log("maxPoints:", maxPoints)
    },
    pointMapper(index) {
      if (index === 0) {
        return 10
      } else if (index === 1) {
        return 9
      } else if (index === 2) {
        return 8
      } else if (index === 3) {
        return 7
      } else if (index === 4) {
        return 6
      } else if (index === 5) {
        return 5
      } else if (index === 6) {
        return 4
      } else if (index === 7) {
        return 3
      } else if (index === 8) {
        return 2
      } else if (index === 9) {
        return 1
      }
    },
    calculatePoints(evt) {
      console.log("calculate points:", evt.moved.element.name)
      console.log("calculate points:", this.pointMapper(evt.moved.newIndex))
    },
  },
}
</script>
