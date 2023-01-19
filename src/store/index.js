import Vue from "vue";
import Vuex from "vuex";
import Localbase from "localbase";

let db = new Localbase("db");
db.config.debug = false;

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    appTitle: process.env.VUE_APP_TITLE,
    search: null,
    tasks: [
      // {
      //   id: 1,
      //   title: "Wake up",
      //   done: false,
      //   dueDate: "2023-02-15",
      // },
      // {
      //   id: 2,
      //   title: "(wake up)",
      //   done: false,
      //   dueDate: "2023-01-29",
      // },
      // {
      //   id: 3,
      //   title: "GrabAChildAndPutALittleMakeup",
      //   done: false,
      //   dueDate: null,
      // },
    ],
    snackbar: {
      show: false,
      text: "",
    },
    sorting: false,
  },
  mutations: {
    setSearch(state, value) {
      state.search = value;
    },
    addTask(state, newTask) {
      state.tasks.unshift(newTask);
    },
    doneTask(state, taskId) {
      let task = state.tasks.filter((task) => task.id === taskId)[0];
      task.done = !task.done;
    },
    deleteTask(state, taskId) {
      state.tasks = state.tasks.filter((task) => task.id !== taskId);
    },
    updateTaskTitle(state, payload) {
      let task = state.tasks.filter((task) => task.id === payload.id)[0];
      task.title = payload.title;
    },
    updateTaskDueDate(state, payload) {
      let task = state.tasks.filter((task) => task.id === payload.id)[0];
      task.dueDate = payload.dueDate;
    },
    setTasks(state, tasks) {
      state.tasks = tasks;
    },
    showSnackbar(state, text) {
      let timeout = 0;
      if (state.snackbar.show) {
        state.snackbar.show = false;
        timeout = 300;
      }
      setTimeout(() => {
        state.snackbar.show = true;
        state.snackbar.text = text;
      }, timeout);
    },
    toggleSorting(state) {
      state.sorting = !state.sorting;
    },
  },
  actions: {
    addTask({ commit }, newTaskTitle) {
      let newTask = {
        id: Date.now(),
        title: newTaskTitle,
        done: false,
        dueDate: null,
      };
      db.collection("tasks")
        .add(newTask)
        .then(() => {
          commit("addTask", newTask);
          commit("showSnackbar", "Task added!");
        });
    },
    doneTask({ state, commit }, id) {
      let task = state.tasks.filter(task => task.id === id)[0];
      db.collection('tasks').doc({ id: id }).update({
        done: !task.done
      }).then(() => {
        commit('doneTask', id);
      })
    },
    deleteTask({ commit }, taskId) {
      db.collection('tasks').doc({ id: taskId}).delete().then(() => {
        commit("deleteTask", taskId);
        commit("showSnackbar", "Task deleted!");
      })
    },
    updateTaskTitle({ commit }, payload) {
      db.collection('tasks').doc({ id: payload.id }).update({
        title: payload.title
      }).then(() => {
        commit("updateTaskTitle", payload);
        commit("showSnackbar", "Task updated!");
      })
    },
    updateTaskDueDate({ commit }, payload) {
      db.collection('tasks').doc({ id: payload.id}).update({
        dueDate: payload.dueDate
      }).then(() => {
        commit("updateTaskDueDate", payload);
        commit("showSnackbar", "Task date updated!");
      })
    },
    setTasks({ commit }, tasks) {
      db.collection('tasks').set(tasks);
      commit('setTasks', tasks);
    },
    getTasks({ commit }) {
      db.collection('tasks').get().then(tasks => {
        commit('setTasks', tasks);
      })
    },
  },
  getters: {
    tasksFiltered(state) {
      if (!state.search) {
        return state.tasks;
      } else {
        return state.tasks.filter((task) =>
          task.title.toLowerCase().includes(state.search.toLowerCase())
        );
      }
    },
  },
});
