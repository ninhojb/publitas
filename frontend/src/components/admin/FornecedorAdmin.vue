<template>
  <div class="fornecedor-admin">
    <b-form>
      <input id="forcenedor-id" type="hidden" v-model="fornecedor.id" />
      <b-row>
        <b-col md="6" sm="12">
          <b-form-group label="CPF/CNPJ:" label-for="fornecedor-cpf_cnpj">
            <b-form-input
              id="fornecedor-cpf_cnpj"
              type="text"
              v-model="fornecedor.cpf_cnpj"
              required
              :readonly="mode === 'remove'"
              placeholder="Informe o CPF ou CNPJ do Fornecedor..."
            />
          </b-form-group>
        </b-col>
        <b-col md="6" sm="12">
          <b-form-group label="Nome:" label-for="fornecedor-nome">
            <b-form-input
              id="forcenedor-nome"
              type="text"
              v-model="fornecedor.nome"
              required
              :readonly="mode === 'remove'"
              placeholder="Informe o Nome do Fornecedor..."
            />
          </b-form-group>
        </b-col>
      </b-row>

      <b-row>
        <b-col md="6" sm="12">
          <b-form-group label="Ins. Estadual:" label-for="fornecedor-estadual">
            <b-form-input
              id="fornecedor-estadual"
              type="text"
              v-model="fornecedor.inscricao_estadual"
              required
              :readonly="mode === 'remove'"
              placeholder="Informe Inscricao estadual do Fornecedor..."
            />
          </b-form-group>
        </b-col>
        <b-col md="6" sm="12">
          <b-form-group label="Ins. Municipal:" label-for="fornecedor-municipal">
            <b-form-input
              id="fornecedor-municipal"
              type="text"
              v-model="fornecedor.inscricao_municipal"
              required
              :readonly="mode === 'remove'"
              placeholder="Informe a Inscricao municipal do Fornecedor..."
            />
          </b-form-group>
        </b-col>
      </b-row>

       <b-row>
        <b-col md="6" sm="12">
          <b-form-group label="Endereco:" label-for="fornecedor-endereco">
            <b-form-input
              id="fornecedor-endereco"
              type="text"
              v-model="fornecedor.endereco"
              required
              :readonly="mode === 'remove'"
              placeholder="Informe o Endereço do Fornecedor..."
            />
          </b-form-group>
        </b-col>
        <b-col md="6" sm="12">
          <b-form-group label="Numero:" label-for="fornecedor-numero">
            <b-form-input
              id="fornecedor-numero"
              type="text"
              v-model="fornecedor.numero"
              required
              :readonly="mode === 'remove'"
              placeholder="Informe o numero do Fornecedor..."
            />
          </b-form-group>
        </b-col>
      </b-row>

       <b-row>
        <b-col md="6" sm="12">
          <b-form-group label="Telefone:" label-for="fornecedor-telefone">
            <b-form-input
              id="fornecedor-telefone"
              type="text"
              v-model="fornecedor.telefone"
              required
              :readonly="mode === 'remove'"
              placeholder="Informe telefone do Fornecedor..."
            />
          </b-form-group>
        </b-col>
        <b-col md="6" sm="12">
          <b-form-group label="E-mail:" label-for="fornecedor-email">
            <b-form-input
              id="fornecedor-email"
              type="text"
              v-model="fornecedor.email"
              required
              :readonly="mode === 'remove'"
              placeholder="Informe o Email do Fornecedor..."
            />
          </b-form-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col xs="12">
          <b-button variant="primary" v-if="mode === 'save'" @click="save">Salvar</b-button>
          <b-button variant="danger" v-if="mode === 'remove'" @click="remove">Excluir</b-button>
          <b-button class="ml-2" @click="reset">Cancelar</b-button>
        </b-col>
      </b-row>
    </b-form>
    <hr />


    <b-table hover striped :items="fornecedores" :fields="fields">
      <!-- <template slot="ations" slot-scope="data"> -->
      <template slot="cell(actions)" slot-scope="data">
        <b-button variant="warning" @click="loadFornecedor(data.item)" class="mr-2">
          <i class="fa fa-pencil"></i>
        </b-button>
        <b-button variant="danger" @click="loadFornecedor(data.item, 'remove')">
          <i class="fa fa-trash"></i>
        </b-button>
      </template>
    </b-table>
    <!-- <b-pagination size="md" v-model="page" :total-rows="count" :per-page="limit" /> -->
  </div>
</template>

<script>
import { baseApiUrl, showError} from "@/global"
import axios from 'axios';
export default {
  name: "FornecedorAdmin",
  data: function() {
    return {
      mode: "save",
      fornecedor: {},
      fornecedores: [],
      fields: [
        { key: "id", label: "Código", sortable: true },
        { key: "cpf_cnpj", label: "CPF/CNPJ", sortable: true },
        { key: "nome", label: "Nome", sortable: true },
        { key: "telefone", label: "Telefone", sortable: true },
        { key: "email", label: "E-mail", sortable: true },
        { key: "actions", label: "Ações" }
      ]
    };
  },
  methods: {
    loadFornecedores() {
      const url = `${baseApiUrl}/fornecedor`;
      axios.get(url).then(res => {
        this.fornecedores = res.data;
      })
    },

    reset() {
      this.mode = "save";
      this.fornecedor = {};
      this.loadFornecedores();
    },

    save() {
      const method = this.fornecedor.id ? "put" : "post";
      const id = this.fornecedor.id ? `/${this.fornecedor.id}` : "";
      axios[method](`${baseApiUrl}/fornecedor${id}`, this.fornecedor)
        .then(() => {
          this.$toasted.global.defaultSuccess();
          this.reset();
        })
        .catch(showError);
    },

    loadFornecedor(fornecedor, mode = "save") {
        this.mode = mode;
        this.fornecedor = { ...fornecedor };
    },

    remove() {
        const id = this.fornecedor.id;
        axios
          .delete(`${baseApiUrl}/fornecedor/${id}`)
          .then(() => {
            this.$toasted.global.defaultSuccess();
            this.reset();
          })
          .catch(showError);
    }
  },
  mounted() {
  this.loadFornecedores();
  }
};
</script>

<style>
</style>