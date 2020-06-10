<template>
    <div class="admin-pages">
        <PageTitle icon="fa fa-area-chart" main="Graficos"
            sub="Linhas / Colunas " />
        <div class="admin-pages-tabs">
            <b-card no-body>
                <b-tabs card>
                    <b-tab title="Grupo Contas" active>
                        <GraficoLinha />
                    </b-tab>
                    <b-tab title="Forma Pagamento" >
                        <!-- <FormaPagamentoAdmin /> -->
                    </b-tab>
                  
                    <b-tab title="Fornecedor">
                        <!-- <FornecedorAdmin /> -->
                    </b-tab>
                    
                </b-tabs>
            </b-card>
        </div>
    </div>
</template>

<script>
import PageTitle from '../template/PageTitle'
import GraficoLinha from './graficos'
// import EmpresasAdmin from './EmpresasAdmin'
// import GrupoContasAdmin from './GrupoContasAdmin'
// import FormaPagamentoAdmin from './FormaPagamentoAdmin'
// import UserAdmin from './UserAdmin'

export default {
    name: 'AdminPages',
    components: { PageTitle, 
                  GraficoLinha
                   }
}
</script>

<style>

</style>