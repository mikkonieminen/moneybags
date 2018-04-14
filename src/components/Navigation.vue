<template>
  <div class="navigation">
    <nav id="navbar" class="navbar navbar-default navbar-fixed-top">
      <div class="container-fluid">
        <div class="navbar-header">
          <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <router-link class="navbar-brand" :to="{ path: '/' }"><span class="fa fa-money"></span></router-link>
        </div>

        <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
          <ul class="nav navbar-nav navbar-right">
            <li><router-link :to="{ path: '/' }">Stocks</router-link></li>
            <li v-if="userAuthenticated === true"><a href="" @click="logout()">Logout</a></li>
            <li v-if="userAuthenticated === false"><router-link :to="{ path: '/login' }">Login</router-link></li>
          </ul>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Auth from '../auth';

export default {
  name: 'navigation',
  data() {
    return {};
  },
  methods: {
    logout() {
      Auth.logout(this);
    }
  },
  computed: {
    ...mapGetters({
      user: 'user',
      userAuthenticated: 'userAuthenticated'
    }),
  }
};
</script>
