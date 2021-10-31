<script lang="ts">
import { defineComponent, reactive, watch, unref, computed } from "vue";

import * as functions from "../functions";

export default defineComponent({
  name: "HelloWorld",
  props: {
    message: String,
    theGlobalReactiveObject: Object,
  },
  setup(props, context) {
    const dict = reactive({
      data: {
        value: "aaa",
        tempMessage: computed({
          get: () => props.message,
          set: (newVal) => {
            if (!functions.doesTheyTwoEqual(newVal, dict.data.tempMessage)) {
              console.log(newVal);
            }
            context.emit("update:message", newVal);
          },
        }),
      },
      functions: {
        changeTheMessage: () => {
          dict.data.tempMessage = String(Math.floor(Math.random() * 100));
        },
      },
    });

    // watch(dict.data, (_newValue, _oldValue) => {
    //   console.log(_newValue)
    // }, {
    //   deep: true
    // })

    return {
      dict,
    };
  },
});
</script>


<template>
  <div class="hello">
    <h1>{{ theGlobalReactiveObject.data.mood }}</h1>
    <button
      @click="
        () => {
          theGlobalReactiveObject.functions.changeTheMood('happy');
        }
      "
    >
      happy
    </button>
    <button
      @click="
        () => {
          theGlobalReactiveObject.functions.changeTheMood('sad');
        }
      "
    >
      sad
    </button>

    <br />
    <br />

    <h1>{{ message }}</h1>
    <button @click="dict.functions.changeTheMessage">change it</button>

    <br />
    <br />

    <h1>{{ dict.data.value }}</h1>
    <button
      @click="
        () => {
          dict.data.value = 'hello again';
        }
      "
    >
      change valueObj
    </button>
  </div>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
