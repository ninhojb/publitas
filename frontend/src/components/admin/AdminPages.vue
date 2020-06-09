<template>
    <div class="admin-pages">
        <PageTitle icon="fa fa-cogs" main="Administração do Sistema"
            sub="Cadastros & Cia" />
        <div class="admin-pages-tabs">
            <b-card no-body>
                <b-tabs card>
                    <b-tab title="Empresas" active>
                        <EmpresasAdmin />
                    </b-tab>
                    <b-tab title="Forma Pagamento" >
                        <FormaPagamentoAdmin />
                    </b-tab>
                    <b-tab title="Grupo Contas" >
                        <GrupoContasAdmin />
                    </b-tab>
                    <b-tab title="Fornecedor">
                        <FornecedorAdmin />
                    </b-tab>
                    <b-tab title="Usuários">
                        <UserAdmin />
                    </b-tab>
                </b-tabs>
            </b-card>
        </div>
    </div>
</template>

<script>
import PageTitle from '../template/PageTitle'
import FornecedorAdmin from './FornecedorAdmin'
import EmpresasAdmin from './EmpresasAdmin'
import GrupoContasAdmin from './GrupoContasAdmin'
import FormaPagamentoAdmin from './FormaPagamentoAdmin'
import UserAdmin from './UserAdmin'

export default {
    name: 'AdminPages',
    components: { PageTitle, 
                  FornecedorAdmin,
                  EmpresasAdmin, 
                  FormaPagamentoAdmin,
                  GrupoContasAdmin,
                  UserAdmin }
}
</script>

<style>

</style>