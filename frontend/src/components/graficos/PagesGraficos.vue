<template>
    <div class="admin-pages">
        <PageTitle icon="fa fa-area-chart" main="Graficos"
            sub="Linhas / Colunas " />
        <div class="admin-pages-tabs">
            <b-card no-body>
                <b-tabs card>
                    <b-tab title="Grupo Contas" active>
                        <h3>Grupo de contas</h3>
                        <GraficoLinha />
                        
                    </b-tab>
                    <b-tab title="Forma Pagamento" >
                       <!-- <GraficosPagamento /> -->
                    </b-tab>
                  
                    <b-tab title="Fornecedor">
                         <GraficoFornecedor />
                    </b-tab>
                    
                </b-tabs>
            </b-card>
        </div>
    </div>
</template>

<script>
import PageTitle from '../template/PageTitle'
import GraficoLinha from './GraficosGrupoContas'
import GraficoFornecedor from './GraficoFornecedor'
// import GraficosPagamento from './GraficosPagamento'
// import FormaPagamentoAdmin from './FormaPagamentoAdmin'
// import UserAdmin from './UserAdmin'

export default {
    name: 'AdminPages',
    components: { PageTitle, 
                  GraficoLinha,
                  GraficoFornecedor
                //   GraficosPagamento
                   }
}
</script>

<style>

</style>