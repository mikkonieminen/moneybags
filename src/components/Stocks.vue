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
                <th>Symbol</th>
                <th @click="sort('price')" class='condensed'>
                  <a href="#">Price 
                    <span v-if="order === 'price'" 
                      v-bind:class="[ direction === 'asc' ? 'fa fa-caret-up':'fa fa-caret-down' ]">
                    </span>
                  </a>
                </th>
                <th @click="sort('priceToEarnings')">
                  <a href="#">P/E 
                    <span v-if="order === 'priceToEarnings'" 
                      v-bind:class="[ direction === 'asc' ? 'fa fa-caret-up':'fa fa-caret-down' ]">
                    </span>
                  </a>
                </th>
                <th @click="sort('priceToBooking')">
                  <a href="#">P/B 
                    <span v-if="order === 'priceToBooking'" 
                      v-bind:class="[ direction === 'asc' ? 'fa fa-caret-up':'fa fa-caret-down' ]">
                    </span>
                  </a>
                </th>
                <th @click="sort('priceToSales')">
                  <a href="#">P/S 
                    <span v-if="order === 'priceToSales'" 
                      v-bind:class="[ direction === 'asc' ? 'fa fa-caret-up':'fa fa-caret-down' ]">
                    </span>
                  </a>
                </th>
                <th>
                  <a href="#">EPS 
                    <span v-if="order === 'earningsPerShare'" 
                      v-bind:class="[ direction === 'asc' ? 'fa fa-caret-up':'fa fa-caret-down' ]">
                    </span>
                  </a>
                </th>
              </tr>
            </thead>

            <tbody>
              <tr v-for='stock in orderedItems'
                v-bind:stock='stock'
                v-bind:key='stock.id'>
                <td>{{ stock.name }}</td>
                <td>{{ stock.tickers && stock.tickers.length > 0 ? stock.tickers[0].symbol : '-' }}</td>
                <td class="nowrap">{{ stock.price | currency }}</td>
                <td>{{ stock.priceToEarnings }}</td>
                <td>{{ stock.priceToBooking }}</td>
                <td>{{ stock.priceToSales }}</td>
                <td>{{ stock.earningsPerShare }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
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
    orderedItems() {
      return this.stocks.sort((a, b) => {
        if (this.isNumeric(a[this.order]) && this.isNumeric(b[this.order])) {
          a[this.order] = +a[this.order];
          b[this.order] = +b[this.order];
        }

        let modifier = 1;
        if (this.direction === 'desc') modifier = -1;
        if (a[this.order] < b[this.order]) return -1 * modifier;
        if (a[this.order] > b[this.order]) return 1 * modifier;
        return 0;
      });
    },
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
          year: '2017',
          order: `${this.order}_${this.direction}`
        },
      })
      .then((response) => {
        if (response.body && response.body.stocks) {
          const stocks = response.body.stocks;
          stocks.forEach((item, i) => {
            stocks[i].price = this.getLatestStockPrice(item);
            stocks[i].priceToEarnings = this.getPriceToFigureKey(item, 'Tulos/osake (EPS), euroa');
            stocks[i].priceToBooking = this.getPriceToFigureKey(item, 'Oma pääoma/osake, euroa');
            stocks[i].priceToSales = this.divideFigures(item, 'Markkina-arvo (P)', 'Liikevaihto');
            stocks[i].earningsPerShare = this.getFigure(item, 'Tulos/osake (EPS), euroa');
          });
          this.$store.dispatch('setStocks', stocks);
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
    getPriceToFigureKey(stock, figureKey) {
      const price = stock.tickers && stock.tickers.length > 0 ?
        stock.tickers[0].price : 0;
      const figure = stock.figures.find(item => item.name === figureKey);
      return figure && figure.value ? (parseFloat(price) / parseFloat(figure.value)).toFixed(2) : '-';
    },
    divideFigures(stock, figure1, figure2) {
      const numerator = stock.figures.find(item => item.name === figure1);
      const denominator = stock.figures.find(item => item.name === figure2);
      return numerator && denominator ? (numerator.value / denominator.value).toFixed(2) : '-';
    },
    getFigure(stock, figureKey) {
      const figure = stock.figures.find(item => item.name === figureKey);
      return figure ? figure.value : '-';
    },
    isNumeric(num) {
      return !isNaN(num);
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