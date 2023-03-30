<template>
  <v-app>
    <NavBar style="z-index: 100"/>
    <router-view/>
    <ChatComponent/>
  </v-app>
</template>

<script>

import NavBar from "@/components/NavBar.vue";
import ChatComponent from "@/components/ChatComponent.vue";

export default {
  name: 'App',
  components: {ChatComponent, NavBar},

  data: () => ({
    //
  }),
};
</script>

<style>
@import './assets/timetablejs.css';
@import './assets/demo.css';
</style>
