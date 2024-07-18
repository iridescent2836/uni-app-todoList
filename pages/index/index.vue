<template>
  <view class="todolist">
    <view class="todolist__header">
      <view class="todolist__header-left">
        Todo List
      </view>
      <view class="todolist__header-right">
        <label>
          <checkbox :value="isHideChecked" @click="hideChecked()" /><text>隐藏已完成</text>
        </label>
        <view class="myButton select-all" @click="selectAll()">
          <view class="btn-text">
            全选
          </view>
        </view>
        <view class="myButton add-btn" @click="addTodo()">
          <view class="btn-text">
            添加
          </view>
        </view>

        <!-- <button class="select-all" @click="selectAll()">全选 </button>
        <button class="add-btn" @click="addTodo()">添加</button> -->
      </view>
    </view>
    <view class="todolist__content">
      <view class="todolist__item" v-for="(item,index) in todoList" :key="item.id">
        <label>
          <checkbox :value="test" :checked="item.isCheck" @click="selectOne(item.id)" /><text></text>
        </label>
        <input class="uni-input" focus placeholder="自动获得焦点" v-model="item.content" @blur="checkInput(item.id)" />
        <!-- <button class="delete-btn" @click="deleteTodo(item.id)">删除</button> -->
        <view class="myButton delete-btn" @click="deleteTodo(item.id)">
          <view class="btn-text">
            删除
          </view>
        </view>
      </view>
    </view>
  </view>

</template>

<script>
  import store from '@/store/index.js'
  export default {
    data() {
      return {
        title: 'Hello'
      }
    },
    onLoad() {
      console.log("create");
      this.$store.commit('loadJson');
    },
    computed: {
      todoList() {
        if (this.$store.state.hideChecked) {
          return this.$store.getters.uncheckedTodoList;
        } else {
          return this.$store.getters.allTodoList;
        }
      },
    },
    methods: {
      //生成id
      generateId() {
        let num = Number(Date.now().toString() + Math.floor(Math.random() * 1000)).toString(10);
        return num;
      },
      // 存储
      storage() {
        console.log('storage ');
        // window.localStorage.setItem('todoList', this.$store.getters.toJson);
        uni.setStorage({
          key: "todoList",
          data: this.$store.getters.toJson,
          success: () => {
            console.log("successfully stored");
          }
        })
      },
      //取消焦点
      removeFocus(index) {
        console.log('removeFocus');
        this.$refs['inputBox' + index][0].blur();
      },
      //检查输入，若为空则删除
      checkInput(id) {

        const index = this.$store.state.todoList.findIndex(item => item.id === id);
        console.log('checkInput ' + index);
        console.log(id)
        if (this.$store.state.todoList[index].content === '') {
          this.$store.commit('removeTodo', id);
        }
        this.storage();
      },
      //隐藏已完成
      hideChecked() {
        console.log('hideTodo');
        this.$store.commit('hideChecked');
      },
      //添加todo
      addTodo() {
        console.log('addTodo');
        this.$store.commit('addTodo', this.generateId());

        // 默认焦点为新建的input
        // this.$nextTick(() => {
        //   this.$refs['inputBox' + 0][0].focus();
        // })
      },
      // 删除todo
      deleteTodo(id) {
        console.log('deleteTodo');
        this.$store.commit('removeTodo', id);
        this.storage();

      },
      // 选一个
      selectOne(id) {

        this.$store.commit('checkTodo', id);
        this.storage();
        console.log('selectOne');
      },
      // 全选
      selectAll() {
        console.log('selectAll');
        this.$store.commit('checkAll');
        this.storage();
      }
    }
  }
</script>

<style lang="scss">
  .todolist {
    background-color: #3C3E4F;
    //the size of iPhone12/13 pro
    height: 844px;
    width: 390px;
    box-sizing: border-box;
    color: white;
  }

  .myButton {
    border: #ccc 1px solid;
    width: 45px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
    margin: 4px;

    .btn-text {
      position: relative;
      left: 0rpx;
      top: -1rpx;
      color: white;
    }
  }

  .todolist__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .todolist__header-left {
    padding-left: 8px;
    font-size: 24px;
    font-weight: bold;
  }

  .todolist__header-right {
    display: flex;
    align-items: center;

    .select-all {
      // border: #ccc 
      background-color: #C43F38;
    }

    .add-btn {
      background-color: #70B870;
    }

  }

  .todolist__content {
    .todolist__item {
      .delete-btn {
        background-color: #C43F38;
      }
    }
  }
</style>