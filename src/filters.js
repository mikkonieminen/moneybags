import Vue from 'vue';

const filter = (text, stop, clamp) => text.slice(0, stop) + (stop < text.length ? clamp || '...' : '');

Vue.filter('truncate', filter);
