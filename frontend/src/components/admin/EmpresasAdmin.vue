<template>
  <div class="empresas-admin">
    <b-form>
      <input id="empresa-id" type="hidden" v-model="empresa.id" />
      <b-form-group label="Nome:" label-for="empresa-name">
        <b-form-input
          id="empresa-name"
          type="text"
          v-model="empresa.nome"
          required
          :readonly="mode === 'remove'"
          placeholder="Informe o Nome da Empresa..."
        />
      </b-form-group>

      <b-button variant="primary" v-if="mode === 'save'" @click="save">Salvar</b-button>
      <b-button variant="danger" v-if="mode === 'remove'" @click="remove">Excluir</b-button>
      <b-button class="ml-2" @click="reset">Cancelar</b-button>
    </b-form>

    <hr />
    <b-table hover striped :items="empresas" :fields="fields">
      <!-- <template slot="ations" slot-scope="data"> -->
      <template slot="cell(actions)" slot-scope="data">
        <b-button variant="warning" @click="loadEmpresa(data.item)" class="mr-2">
          <i class="fa fa-pencil"></i>
        </b-button>
        <b-button variant="danger" @click="loadEmpresa(data.item, 'remove')">
          <i class="fa fa-trash"></i>
        </b-button>
      </template>
    </b-table>
  </div>
</template>

<script>
import { baseApiUrl, showError } from "@/global";
import axios from "axios";

export default {
  name: "EmpresasAdmin",
  data: function() {
    return {
      mode: "save",
      empresa: {},
      empresas: [],
      fields: [
        {key: "id", label: "Código", sortable: true},
        {key: "nome", label: "Nome", sortable: true},
        { key: "actions", label: "Ações" }
      ]
    };
  },

  methods: {
    loadEmpresas() {
      const url = `${baseApiUrl}/empresa`
      axios.get(url).then( res => {
        this.empresas = res.data;
      });
    },

    reset() {
      this.mode = "save";
      this.empresa = {};
      this.loadEmpresas();
    },

    save() {
      const method = this.empresa.id ? "put" : "post";
      const id = this.empresa.id ? `/${this.empresa.id}` : "";
      axios[method](`${baseApiUrl}/empresa${id}`, this.empresa)
        .then(() => {
          this.$toasted.global.defaultSuccess();
          this.reset();
        })
        .catch(showError);
    },

    remove() {
      const id = this.empresa.id;
      axios
        .delete(`${baseApiUrl}/empresa/${id}`)
        .then(() => {
          this.$toasted.global.defaultSuccess();
          this.reset();
        })
        .catch(showError);
    },

    loadEmpresa(empresa, mode = "save") {
      this.mode = mode;
      this.empresa = { ...empresa };
    }
  },

  mounted() {
    this.loadEmpresas();
  }

};
</script>

<style>
</style>