<script lang="ts">
import { defineComponent, reactive } from "vue";
import HelloWorld from "./components/HelloWorld.vue";

import { theGlobalReactiveObject } from "./functions";
import { theGlobalReactiveObject as theGlobalReactiveObject2 } from "./functions";

export default defineComponent({
  name: "App",
  components: {
    HelloWorld,
  },
  setup(props, context) {
    const dict = reactive({
      data: {
        theMessage: "hi, there",
      },
      functions: {},
    });

    return {
      dict,
      theGlobalReactiveObject,
      theGlobalReactiveObject2,
    };
  },
});
</script>


<template>
  <button
    @click="
      () => {
        theGlobalReactiveObject2.functions.changeTheMood(
          'very very happy because Im doing something fun'
        );
      }
    "
  >
    change mood from another importing
  </button>
  <HelloWorld
    v-model:message="dict.data.theMessage"
    :theGlobalReactiveObject="theGlobalReactiveObject"
  />
</template>


<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
