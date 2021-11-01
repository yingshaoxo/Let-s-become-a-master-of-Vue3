<script lang="ts">
import {
  defineComponent,
  reactive,
  watch,
  unref,
  computed,
  ref,
  toRefs,
} from "vue";

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

    // const propsRef = toRefs(props);
    // watch(
    //   propsRef.message,
    //   (_newValue, _oldValue) => {
    //     // console.log(_newValue.tempMessage, _oldValue.tempMessage);
    //     console.log(_newValue, _oldValue);
    //   },
    //   {
    //     deep: true,
    //   }
    // );

    // const propsRef = toRefs(dict.data);
    // watch(
    //   propsRef.tempMessage,
    //   (_newValue, _oldValue) => {
    //     console.log(_newValue, _oldValue);
    //   },
    //   {
    //     deep: true,
    //   }
    // );

    watch(
      () => props.message,
      (_newValue, _oldValue) => {
        console.log(_newValue, _oldValue);
      },
      {
        deep: true,
      }
    );

    return {
      dict,
      functions,
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
    <button
      @click="
        () => {
          functions.theGlobalReactiveObject.functions.changeTheMood(
            'high high high'
          );
        }
      "
    >
      turnItUp
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
