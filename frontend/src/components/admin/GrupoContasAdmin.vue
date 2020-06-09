<template>
  <div class="grupo_contas-admin">
    <b-form>
      <input id="grupo_contas-id" type="hidden" v-model="grupo_conta.id" />
      <b-form-group label="Descrição:" label-for="grupo_contas-descricao">
        <b-form-input
          id="grupo_conta-descricao"
          type="text"
          v-model="grupo_conta.descricao"
          required
          :readonly="mode === 'remove'"
          placeholder="Informe o Nome do Grupo..."
        />
      </b-form-group>

      <b-button variant="primary" v-if="mode === 'save'" @click="save">Salvar</b-button>
      <b-button variant="danger" v-if="mode === 'remove'" @click="remove">Excluir</b-button>
      <b-button class="ml-2" @click="reset">Cancelar</b-button>
    </b-form>

    <hr />
    <b-table hover striped :items="grupo_contas" :fields="fields">
      <!-- <template slot="ations" slot-scope="data"> -->
      <template slot="cell(actions)" slot-scope="data">
        <b-button variant="warning" @click="loadGrupo(data.item)" class="mr-2">
          <i class="fa fa-pencil"></i>
        </b-button>
        <b-button variant="danger" @click="loadGrupo(data.item, 'remove')">
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
  name: "GrupoContasAdmin",
  data: function() {
    return {
      mode: "save",
      grupo_conta: {},
      grupo_contas: [],
      fields: [
        {key: "id", label: "Código", sortable: true},
        {key: "descricao", label: "Descrição", sortable: true},
        { key: "actions", label: "Ações" }
      ]
    };
  },

  methods: {
    loadGrupos() {
      const url = `${baseApiUrl}/grupocontas`
      axios.get(url).then( res => {
        this.grupo_contas = res.data;
      });
    },

    reset() {
      this.mode = "save";
      this.grupo_conta = {};
      this.loadGrupos();
    },

    save() {
      const method = this.grupo_conta.id ? "put" : "post";
      const id = this.grupo_conta.id ? `/${this.grupo_conta.id}` : "";
      axios[method](`${baseApiUrl}/grupocontas${id}`, this.grupo_conta)
        .then(() => {
          this.$toasted.global.defaultSuccess();
          this.reset();
        })
        .catch(showError);
    },

    remove() {
      const id = this.grupo_conta.id;
      axios
        .delete(`${baseApiUrl}/grupocontas/${id}`)
        .then(() => {
          this.$toasted.global.defaultSuccess();
          this.reset();
        })
        .catch(showError);
    },

    loadGrupo(grupo_conta, mode = "save") {
      this.mode = mode;
      this.grupo_conta = { ...grupo_conta };
    }
  },

  mounted() {
    this.loadGrupos();
  }

};
</script>

<style>
</style>