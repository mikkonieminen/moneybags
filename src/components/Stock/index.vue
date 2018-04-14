<template>
  <div class="stock container">
    <back-button />
    <div class="col-md-6 col-lg-4">
      <h1>Data</h1>
      <h2>Id: {{ $route.params.id }}</h2>
    </div>
    <div class="col-md-6 col-lg-8">
      <line-chart :data="chartData" :options="chartOptions"></line-chart>
    </div>
  </div>
</template>

<script>
  import LineChart from './LineChart';
  import BackButton from './BackButton';

  export default {
    name: 'stock',
    components: {
      LineChart,
      BackButton
    },
    data() {
      return {
        chartData: {
          labels: ['January', 'February', 'March', 'April', 'May', 'June'],
          datasets: [
            {
              label: 'Value',
              data: [10, 15, 23, 35, 60, 200],
              lineTension: 0,
              borderWidth: 5,
              borderColor: '#ff2299',
              pointRadius: 3,
              pointBorderWidth: 0,
              pointHitRadius: [30, 30],
              pointBackgroundColor: 'red',
              backgroundColor: 'transparent',
            }
          ],
        },
        chartOptions: {},
      };
    },
  };
</script>
