<template>
  <button class="btn btn-primary" v-on:click="goBack">Go back</button>
</template>

<script>
  export default {
    name: 'back-button',
    methods: {
      goBack() {
        this.$router.go(-1);
      }
    }
  };
</script>