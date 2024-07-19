<template>
  <view class="my-button" :class="isPressed?'my-button--pressed':''" @mousedown="onMouseDown()" @mouseup="onMouseUp()"
    @mousemove="onMouseUp()">
    <view class="button-text">
      {{text}}
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        text: 'click me',
        isPressed: false
      }
    },
    methods: {
      omMouseDown() {
        console.log("mouse clicked");
        this.isPressed = true;
      },
      onMouseUp() {
        concole.log("mouse released")
        this.isPressed = false;
      }
    }
  }
</script>


<style>
  .my-button {
    width: 161px;
    height: 100px;
    border-radius: 50px;
    background-color: #ffcccb;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #cc0000;
    font-size: 20px;
    font-weight: bold;
    box-shadow: inset 0px 4px 10px rgba(255, 255, 255, 0.1);
  }

  .my-button--pressed {
    background-color: rgba(255, 204, 203, 0.8745098039);
    color: rgba(204, 0, 0, 0.7960784314);
    box-shadow: inset 0px 4px 10px rgba(0, 0, 0, 0.1);
  }
</style>