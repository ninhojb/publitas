<template>
  <div class="despesa-admin">

    <b-form>
        <input id="despesa-id" type="hidden" v-model="despesa.id" />
        <b-row>
             <b-col md="6" sm="12">
                <b-form-group label="Data Entrada:" label-for="despesa-data_lancamento">
                    <b-form-input
                    id="despesa-data_lancamento"
                    type="text"
                    v-model="despesa.data_lancamento"
                    required
                    :readonly="mode === 'remove'"
                    placeholder="Informe a Data da Nota..."
                    />
                </b-form-group>
            </b-col>
            <b-col md="6" sm="12">
                <b-form-group label="Vencimento:" label-for="despesa-vencimento">
                    <b-form-input
                    id="despesa-vencimento"
                    type="text"
                    v-model="despesa.vencimento"
                    required
                    :readonly="mode === 'remove'"
                    placeholder="Informe o vencimento da Nota..."
                    />
                </b-form-group>
            </b-col>
        </b-row>
        <b-row>
            <b-col md="6" sm="12">
                <b-form-group label="N. Nota:" label-for="despesa-numero_nota">
                    <b-form-input
                    id="despesa-numero_nota"
                    type="text"
                    v-model="despesa.numero_nota"
                    required
                    :readonly="mode === 'remove'"
                    placeholder="Informe o numero_nota da Nota..."
                    />
                </b-form-group>
            </b-col>
             <b-col md="6" sm="12">
                <b-form-group label="Complemento:" label-for="despesa-complemento">
                    <b-form-input
                    id="despesa-complemento"
                    type="text"
                    v-model="despesa.complemento"
                    required
                    :readonly="mode === 'remove'"
                    placeholder="Informe o complemento da Nota..."
                    />
                </b-form-group>
            </b-col>
        </b-row>

        <b-row>
            <b-col md="6" sm="12">
                <b-form-group label="Valor:" label-for="despesa-valor">
                    <b-form-input
                    id="despesa-valor"
                    type="text"
                    v-model="despesa.valor"
                    required
                    :readonly="mode === 'remove'"
                    placeholder="Informe o valor da Nota..."
                    />
                </b-form-group>
            </b-col>
             <b-col md="6" sm="12">
                <b-form-group label="Data Pago:" label-for="despesa-data_pagamento">
                    <b-form-input
                    id="despesa-data_pagamento"
                    type="text"
                    v-model="despesa.data_pagamento"
                    required
                    :readonly="mode === 'remove'"
                    placeholder="Informe o Data do Pagamento da Nota..."
                    />
                </b-form-group>
            </b-col>
        </b-row>
        <b-row>
             <b-col md="6" sm="12">
                <b-form-group v-if="mode === 'save'" label="Fornecedor:" label-for="despesa-id_fornecedor">
                <b-form-select id="despesa-id_fornecedor" :options="fornecedores" v-model="despesa.id_fornecedor" />
                </b-form-group>
             </b-col>
             <b-col md="6" sm="12">
                <b-form-group v-if="mode === 'save'" label="Forma Pagamento:" label-for="despesa-id_form_pag">
                <b-form-select id="despesa-id_form_pag" :options="formapagamentos" v-model="despesa.id_form_pag" />
                </b-form-group>
             </b-col>
        </b-row>

         <b-row>
             <b-col md="6" sm="12">
                <b-form-group v-if="mode === 'save'" label="Grupo Contas:" label-for="despesa-id_grupo_contas">
                <b-form-select id="despesa-id_grupo_contas" :options="grupoContas" v-model="despesa.id_grupo_contas" />
                </b-form-group>
             </b-col>
             <b-col md="6" sm="12">
                <b-form-group v-if="mode === 'save'" label="Empresa:" label-for="despesa-id_empresa">
                <b-form-select id="despesa-id_empresa" :options="empresas" v-model="despesa.id_empresa" />
                </b-form-group>
             </b-col>
        </b-row>
       
      <b-button variant="primary" v-if="mode === 'save'" @click="save">Salvar</b-button>
      <b-button variant="danger" v-if="mode === 'remove'" @click="remove">Excluir</b-button>

      <b-button class="ml-2" @click="reset">Cancelar</b-button>
    </b-form>
    <hr />

    <b-table hover striped :items="despesas" :fields="fields">
      <!-- <template slot="actions" slot-scope="data"> -->
      <template slot="cell(actions)" slot-scope="data">
        <b-button variant="warning" @click="loadDespesa(data.item)" class="mr-2">
          <i class="fa fa-pencil"></i>
        </b-button>
        <b-button variant="danger" @click="loadDespesa(data.item, 'remove')">
          <i class="fa fa-trash"></i>
        </b-button>
      </template>
    </b-table>
    <b-pagination size="md" v-model="page" :total-rows="count" :per-page="limit" />
  </div>
</template>

<script>
import { baseApiUrl, showError } from "@/global";
import axios from "axios";

export default {
    name: "Despesa",
    data: function() {
        return {
            mode: "save",
            despesa: {},
            despesas: [],
            fornecedores: [],
            formapagamentos: [],
            grupoContas: [],
            empresas: [],
            page: 1,
            limit: 0,
            count: 0,
            fields: [
                { key: "id", label: "Código", sortable: true },
                { key: "data_lancamento", label: "Lançamento", sortable: true },
                { key: "vencimento", label: "Vencimento", sortable: true },
                { key: "numero_nota", label: "Nota", sortable: true },
                { key: "id_fornecedor", label: "Fornecedor", sortable: true },
                { key: "data_pagamento", label: "DataPagamento", sortable: true },
                { key: "valor", label: "Valor", sortable: true },
                { key: "actions", label: "Ações" }
            ]
        }
    },
    methods: {
        loadDespesas() {
            const url = `${baseApiUrl}/despesas?page=${this.page}`;
            axios.get(url).then(res => {
                this.despesas =res.data.data;
                this.count =res.data.count;
                this.limit = res.data.count;
            })
        },
        reset() {
        this.mode = "save";
        this.despesa = {};
        this.loadDespesas();
        },

        loadDespesa(despesa, mode= "save") {
            this.mode = mode;
            this.despesa = { ...despesa}
        },

        save() {
            const method = this.despesa.id ? "put" : "post";
            const id = this.despesa.id ? `/${this.despesa.id}` : "";
            axios[method](`${baseApiUrl}/despesas${id}`, this.despesa)
                .then(() => {
                this.$toasted.global.defaultSuccess();
                this.reset();
                })
                .catch(showError);
        },
        remove() {
            const id = this.despesa.id;
            axios
                .delete(`${baseApiUrl}/despesas/${id}`)
                .then(() => {
                this.$toasted.global.defaultSuccess();
                this.reset();
                })
                .catch(showError);
        },

        loadFronecedores() {
            const url = `${baseApiUrl}/fornecedor`;
            axios.get(url).then(res => {
                this.fornecedores = res.data.map(fornecedor => {
                    return { value: fornecedor.id, text: `${fornecedor.nome}`}
                });
            });
        },

        loadFormaPagamentos() {
            const url = `${baseApiUrl}/formapagamento`;
            axios.get(url).then(res => {
                this.formapagamentos = res.data.map(formapagamento => {
                    return { value: formapagamento.id, text: `${formapagamento.descricao}`}
                });
            });
        },

        loadGrupoContas() {
            const url = `${baseApiUrl}/grupocontas`;
            axios.get(url).then(res => {
                this.grupoContas = res.data.map(grupoConta => {
                    return { value: grupoConta.id, text: `${grupoConta.descricao}`}
                });
            });
        },

         loadEmpresas() {
            const url = `${baseApiUrl}/empresa`;
            axios.get(url).then(res => {
                this.empresas = res.data.map(empresa => {
                    return { value: empresa.id, text: `${empresa.nome}`}
                });
            });
        }
    },
    mounted() {
        this.loadDespesas();
        this.loadFronecedores();
        this.loadFormaPagamentos();
        this.loadGrupoContas();
        this.loadEmpresas();
    }
};
</script>

<style>
</style>