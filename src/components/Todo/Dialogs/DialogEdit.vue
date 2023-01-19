<template>
  <v-dialog :value="true" persistent max-width="290">
    <v-card>
      <v-card-title class="text-h5"> Edit task </v-card-title>
      <v-card-text>
        Edit title of this task:
        <v-text-field
          v-model="taskTitle"
          @keyup.enter="saveTask"
          autofocus
        ></v-text-field>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text @click="$emit('close')"> Cancel </v-btn>
        <v-btn
          @click="saveTask"
          :disabled="taskTitleInvalid"
          color="red darken-1"
          text
        >
          Save
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: ["task"],
  data() {
    return {
      taskTitle: null,
    };
  },
  methods: {
    saveTask() {
      if (!this.taskTitleInvalid) {
        this.$store.dispatch("updateTaskTitle", {
          id: this.task.id,
          title: this.taskTitle,
        });
        this.$emit("close");
        this.$vuetify.goTo(0, { duration: 0});
      }
    },
  },
  computed: {
    taskTitleInvalid() {
      return !this.taskTitle || this.taskTitle == this.task.title;
    },
  },
  mounted() {
    this.taskTitle = this.task.title;
  },
};
</script>

<style></style>
