<template>
  <div id="app">
    <navigation></navigation>
    <router-view class="wrapper container-fluid"></router-view>
    <vue-progress-bar></vue-progress-bar>
  </div>
</template>

<script>
import Navigation from './components/Navigation';
import Auth from './auth';

export default {
  name: 'app',
  components: {
    Navigation,
  },
  mounted() {
    Auth.restoreLogin(this, '/', '/');
  },
};
</script>

<style lang="scss">
  @import 'main';

  .wrapper {
    margin-top: $navbar-height + $padding-vertical;
  }
</style>
