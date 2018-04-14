<template>
  <div class="stock container">
    <div class="col-md-5 col-lg-4">
      <back-button />
      <h1>{{ title }}</h1>
      <p>ID: <strong>{{ $route.params.id }}</strong></p>
      <br>
      <div v-for="name in names">
        <button class="btn btn-info" v-bind:key="name" v-on:click="() => changeName(name)">{{ name }}</button>
      </div>
    </div>
    <div class="col-md-7 col-lg-8">
      <line-chart v-if="selectedData" :chart-data="selectedData" :options="chartOptions" />
    </div>
  </div>
</template>

<script>
  import LineChart from './LineChart';
  import BackButton from './BackButton';

  const testdata = {
    figures: [
      {
        name: 'Liikevaihto',
        value: 23223.00,
        timespan: 'year',
        timespanValue: '2017',
        multiplier: 1,
      },
      {
        name: 'Liikevaihto',
        value: 23972.00,
        timespan: 'year',
        timespanValue: '2016',
        multiplier: 1,
      },
      {
        name: 'Liikevaihto',
        value: 12499.00,
        timespan: 'year',
        timespanValue: '2015',
        multiplier: 1,
      },
      {
        name: 'Liikevaihto',
        value: 11763.00,
        timespan: 'year',
        timespanValue: '2014',
        multiplier: 1,
      },
      {
        name: 'Liikevaihto',
        value: 12709.00,
        timespan: 'year',
        timespanValue: '2013',
        multiplier: 1,
      },
      {
        name: 'Liikevaihdon muutos, %',
        value: -3.1,
        timespan: 'year',
        timespanValue: '2017',
        multiplier: 1,
      },
      {
        name: 'Liikevaihdon muutos, %',
        value: 91.8,
        timespan: 'year',
        timespanValue: '2016',
        multiplier: 1,
      },
      {
        name: 'Liikevaihdon muutos, %',
        value: 6.3,
        timespan: 'year',
        timespanValue: '2015',
        multiplier: 1,
      },
      {
        name: 'Liikevaihdon muutos, %',
        value: -7.4,
        timespan: 'year',
        timespanValue: '2014',
        multiplier: 1,
      },
      {
        name: 'Liikevaihdon muutos, %',
        value: -17.5,
        timespan: 'year',
        timespanValue: '2013',
        multiplier: 1,
      },
    ]
  };

  // object what contains different names
  // map names to buttons

  // on button click display chart of button

  export default {
    name: 'stock',
    components: {
      LineChart,
      BackButton
    },

    beforeMount() {
      const stockData = this.$store.state.stocks.find(single => single.id === this.$route.params.id);
      console.log(stockData)
      // this.allData = stockData;
      // currently uses test data
      this.allData = testdata;
      this.title = stockData.name;

      // create array of names
      const uniquenames = [];
      for (let i = 0; i < testdata.figures.length; i += 1) {
        if (uniquenames.indexOf(testdata.figures[i].name) === -1) {
          uniquenames.push(testdata.figures[i].name);
        }
      }
      this.names = uniquenames;
      this.selectedName = uniquenames[0];
    },

    data() {
      return {
        allData: [],
        chartDataOptions: {
          datasets: [
            {
              label: 'Value',
              lineTension: 0,
              borderWidth: 2,
              borderColor: '#93A5CF',
              pointRadius: 3,
              pointBorderWidth: 0,
              pointHitRadius: [30, 30],
              pointBackgroundColor: '#666',
              backgroundColor: 'transparent',
            }
          ]
        },
        chartOptions: {
        },
        selectedName: false,
        selectedData: null,
      };
    },
    mounted() {
      this.createData();
    },
    methods: {
      changeName(name) {
        this.selectedName = name;
        this.createData();
      },
      createData() {
        const chartData = Object.create(this.chartDataOptions);
        const selectedData = this.allData.figures.filter(single => single.name === this.selectedName);
        const labels = [];
        const values = [];
        for (let i = 0; i < selectedData.length; i += 1) {
          labels.push(selectedData[i].timespanValue);
          values.push(selectedData[i].value);
        }
        labels.reverse();
        values.reverse();
        chartData.labels = labels;
        chartData.datasets[0].data = values;
        this.selectedData = chartData;
      }
    }
  };
</script>