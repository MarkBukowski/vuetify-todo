<template>
  <v-text-field
    v-model="newTaskTitle"
    @keyup.enter="addTask"
    outlined
    class="field-add-task pa-3"
    placeholder="Add task"
    hide-details
    clearable
  >
    <template v-slot:append>
      <v-icon @click="addTask" :disabled="!isTaskTitleInvalid">
        mdi-plus
      </v-icon>
    </template>
  </v-text-field>
</template>

<script>
export default {
  data: () => ({
    newTaskTitle: "",
  }),
  methods: {
    addTask() {
      if (this.isTaskTitleInvalid) {
        this.$store.dispatch("addTask", this.newTaskTitle);
        this.newTaskTitle = "";
      }
    },
  },
  computed: {
    isTaskTitleInvalid() {
      return this.newTaskTitle ? true : "";
    },
  },
};
</script>

<style lang="sass">
  .field-add-task.v-input--is-focused
    .v-input__slot
      background-color: rgba(31,94,129, 0.5) !important
</style>