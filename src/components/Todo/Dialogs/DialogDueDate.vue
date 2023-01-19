<template>
  <v-dialog :value="true" persistent width="290px">
    <v-date-picker v-model="date" scrollable>
      <v-btn text color="primary" @click="date = null"> Remove </v-btn>
      <v-spacer></v-spacer>
      <v-btn text color="primary" @click="$emit('close')"> Cancel </v-btn>
      <v-btn text color="primary" @click="saveTask"> OK </v-btn>
    </v-date-picker>
  </v-dialog>
</template>

<script>
export default {
  props: ["task"],
  data() {
    return {
      date: null,
    };
  },
  methods: {
    saveTask() {
      this.$store.dispatch("updateTaskDueDate", {
        id: this.task.id,
        dueDate: this.date,
      });
      this.$emit("close");
    },
  },
  mounted() {
    if (this.task.dueDate) {
      this.date = this.task.dueDate;
    }
  },
};
</script>

<style></style>
