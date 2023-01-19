<template>
  <div>
    <list-tasks v-if="$store.state.tasks.length"></list-tasks>
    <no-tasks v-else></no-tasks>
    <button-done-sorting v-if="$store.state.sorting"></button-done-sorting>
  </div>
</template>

<script>
export default {
  components: {
    "list-tasks": require("@/components/Todo/ListTasks.vue").default,
    "no-tasks": require("@/components/Todo/NoTasks.vue").default,
    "button-done-sorting": require("@/components/Todo/ButtonDoneSorting.vue").default,
  },
};
</script>
