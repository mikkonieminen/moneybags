<template>
  <div class='stock-component'>

    <div class="row">
      <div class="col-xs-12">
        <h1 class="text-center">{{ loading ? 'Loading...' : stock.name }}</h1>
        <div class="table-responsive" v-if='!loading'>
          <table class='table table-condensed table-striped table-bordered table-hover'>
            <thead>
              <tr>
                <th>Figure</th>
                <th v-for='year in years' v-bind:key='year'>{{ year }}</th>
                <th>Average</th>
              </tr>
            </thead>

            <tbody>
              <tr v-for='(figures, key) in stock.figures'
                v-bind:key='key'>
                <td>{{ key }}</td>
                <td v-for='year in years'
                  v-bind:key='year'>
                  {{ figures[year] ? figures[year].value : '-' }}
                </td>
                <td>{{ getAverage(figures) || '-' }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

  </div>
</template>

<script>

export default {
  name: 'stock',
  data() {
    return {
      loading: false,
      stock: {},
      years: []
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      this.loading = true;
      this.$http.get(`stocks/${this.$route.params.stockId}`, {
        params: { groupBy: 'name' },
      })
      .then((response) => {
        if (response.body && response.body.stock && response.body.years) {
          this.years = response.body.years;
          this.stock = response.body.stock;
        }
        this.loading = false;
      })
      .catch(() => {
        this.loading = false;
      });
    },
    getAverage(figures) {
      const sum = Object.keys(figures).reduce((acc, key) => {
        return acc + parseFloat(figures[key].value);
      }, 0);
      return (sum / Object.keys(figures).length).toFixed(2);
    }
  },
};
</script>
