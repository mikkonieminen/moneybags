<template>
  <div class='stocks-component'>

    <form class="form-inline" v-on:submit.prevent>
      <div class="form-group">
        <input class="form-control" v-model="keyword" placeholder="Search...">
      </div>

      <div class="form-group">
        <button class="btn btn-primary"
        type="submit"
        @click="getData">
          Search
        </button>
        <button class="btn btn-default"
        @click="clearSearch"
        type="button">
          Clear
        </button>
      </div>
    </form>

    <hr>

    <div class="row">
      <div class="col-xs-12">
        <div class="table-responsive">
          <table class='table table-condensed table-striped table-bordered table-hover'>
            <thead>
              <tr>
                <th @click="sort('name')">
                  <a href="#">Stock 
                    <span v-if="order === 'name'" 
                      v-bind:class="[ direction === 'asc' ? 'fa fa-caret-up':'fa fa-caret-down' ]">
                    </span>
                  </a>
                </th>
                <th @click="sort('price')" class='condensed'>
                  <a href="#">Price 
                    <span v-if="order === 'price'" 
                      v-bind:class="[ direction === 'asc' ? 'fa fa-caret-up':'fa fa-caret-down' ]">
                    </span>
                  </a>
                </th>
              </tr>
            </thead>

            <tbody>
              <tr v-on:click='() => toStockPage(stock.id)' v-for='(stock, index) in stocks' 
                v-bind:index='index' 
                v-bind:stock='stock'
                v-bind:key='stock.id'>
                <td>{{ stock.name }}</td>
                <td>{{ getLatestStockPrice(stock) }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import Promise from 'bluebird';
import { mapGetters } from 'vuex';

export default {
  name: 'stocks',
  data() {
    return {
      keyword: null,
      order: 'name',
      direction: 'asc'
    };
  },
  mounted() {
    this.getData();
  },
  computed: {
    ...mapGetters({
      stocks: 'stocks',
    }),
  },
  methods: {
    sort(order) {
      if (order === this.order) {
        this.direction = this.direction === 'asc' ? 'desc' : 'asc';
      }
      else {
        this.direction = 'asc';
      }
      this.order = order;
      this.getData();
    },
    clearSearch() {
      this.keyword = null;
      this.getData();
    },
    getData() {
      this.$Progress.start();
      this.$http.get('stocks', {
        params: {
          keyword: this.keyword,
          order: `${this.order}_${this.direction}`
        },
      })
      .then((response) => {
        if (response.body && response.body.stocks) {
          this.$store.dispatch('setStocks', response.body.stocks);
          this.$Progress.finish();
        }
      })
      .catch(() => {
        this.$Progress.fail();
      });
    },
    getLatestStockPrice(stock) {
      return stock && stock.tickers && stock.tickers.length > 0 ?
        stock.tickers[0].price : 0;
    },
    toStockPage(id) {
      this.$router.push(`/stocks/${id}`);
    }
  },
};
</script>

<style lang='scss'>
  .nowrap,
  th {
    white-space: nowrap;
  }

  td,
  th {
    &:hover {
      cursor: pointer;
    }

    &.condensed {
      width: 1%;
    }
  }
</style>