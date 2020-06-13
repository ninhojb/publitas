<template>
    <chart :options="pie"></chart>
</template>

<style>
</style>

<script>
import chart from '../../config/graficos'
export default {
  name: 'GraficoPorFornecedor',
  data: () => ({
    pie: {
      series: [
        {
          type: 'pie',
          radius: '70%',
          center: ['50%', '40%'],
          data: [
            {value: 235, name: 'norte'},
            {value: 810, name: 'sudeste'},
            {value: 334, name: 'sul'},
            {value: 358, name: 'nordeste'},
            {value: 548, name: 'centro-oeste'},
          ]
        }
      ]
    }
  })
    
}
</script>
<style scoped>

</style>