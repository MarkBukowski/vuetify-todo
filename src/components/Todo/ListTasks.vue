<template>
  <v-list v-if="$store.state.tasks.length" class="pt-0" flat>
    <draggable v-model="tasks" handle=".handle">
      <task v-for="task in tasks" :key="task.id" :task="task"></task>
    </draggable>
  </v-list>
</template>

<script>
import { mapGetters } from "vuex";
import draggable from "vuedraggable";

export default {
  components: {
    task: require("@/components/Todo/Task.vue").default,
    draggable,
  },
  computed: {
    ...mapGetters(["tasksFiltered"]),
    tasks: {
      get() {
        return this.tasksFiltered;
      },
      set(value) {
        this.$store.dispatch("setTasks", value);
      },
    },
  },
};
</script>
