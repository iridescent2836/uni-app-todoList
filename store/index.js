// 页面路径：store/index.js 
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex); //vue的插件机制

//Vuex.Store 构造器选项
const store = new Vuex.Store({
  state: {
    test: 'Hello vuex',
    isAllChecked: false, // whether all the items are checked
    hideChecked: false, // when true, only show the unchecked items, otherwise show all items
    todoList: [
      // the format of the item in todoList
      // {
      //   id:'1',
      //   isCheck: false,
      //   content: 'test',
      //   time:dayjs(new Date).format('YY-MM-DD HH:mm'),
      // },
    ]
  },
  mutations: {
    loadJson(state) {

      uni.getStorage({
        key: 'todoList',
        success: (res) => {
          console.log("succesfully load from storage");
          const todoList = JSON.parse(res.data);
          if (todoList) {
            state.todoList = todoList;
          }
        }
      })
    },
    addTodo(state, id) {
      state.todoList.unshift({
        id: id,
        content: '',
        isCheck: false,
        time: "now",
        // time: dayjs(new Date).format('YYYY-MM-DD HH:mm')
      })
      console.log(state.todoList[0]);
    },
    removeTodo(state, id) {
      const index = state.todoList.findIndex(item => item.id === id);
      state.todoList.splice(index, 1);
    },
    checkTodo(state, id) {
      const index = state.todoList.findIndex(item => item.id === id);
      state.todoList[index].isCheck = !state.todoList[index].isCheck;
      state.isAllChecked = state.todoList.every(item => item.isCheck);
    },
    checkAll(state) {
      state.isAllChecked = !state.isAllChecked;
      state.todoList.forEach(item => {
        item.isCheck = state.isAllChecked
      })
    },
    hideChecked(state) {
      state.hideChecked = !state.hideChecked;
    },
  },
  getters: {
    toJson: state => {
      return JSON.stringify(state.todoList);
    },
    allTodoList: state => {
      return state.todoList;
    },
    uncheckedTodoList: state => {
      return state.todoList.filter(item => !item.isCheck);
    },
  }
})
export default store