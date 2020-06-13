<template> 
  <div class="small">
    <chart :options="chartOptionsBar"></chart>
  </div>
</template>

<style>
</style>

<script>
import Chart from '../../config/graficos'
export default {
  
  name: 'GraficoPorGrupo',
 
  data: () => ({
    chartOptionsBar: {
        dataset: {
        source: [
          ['Leite', 43.3, 85.8, 93.7],
          ['Chá', 83.1, 73.4, 55.1],
          ['Chocolate', 86.4, 65.2, 82.5],
          ['Brownie', 72.4, 53.9, 39.1],
        ]
      },
      xAxis: {type: 'category'},
      yAxis: {},
      series: [
        {type: 'bar'},
        {type: 'bar'},
        {type: 'bar'}
      ]
    }

  })
    
}
</script>

<style>
  .small {
    max-width: 600px;
    margin:  0px auto;
  }
</style>

