<template>
  <div class="pagamento-admin">
    <b-form>
      <input id="pagamento-id" type="hidden" v-model="pagamento.id" />
      <b-form-group label="Descrição:" label-for="pagamento-descricao">
        <b-form-input
          id="pagamento-descricao"
          type="text"
          v-model="pagamento.descricao"
          required
          :readonly="mode === 'remove'"
          placeholder="Informe a Descrição..."
        />
      </b-form-group>

      <b-button variant="primary" v-if="mode === 'save'" @click="save">Salvar</b-button>
      <b-button variant="danger" v-if="mode === 'remove'" @click="remove">Excluir</b-button>
      <b-button class="ml-2" @click="reset">Cancelar</b-button>
    </b-form>

    <hr />
    <b-table hover striped :items="pagamentos" :fields="fields">
      <!-- <template slot="ations" slot-scope="data"> -->
      <template slot="cell(actions)" slot-scope="data">
        <b-button variant="warning" @click="loadPagamento(data.item)" class="mr-2">
          <i class="fa fa-pencil"></i>
        </b-button>
        <b-button variant="danger" @click="loadPagamento(data.item, 'remove')">
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
  name: "FormaPagamentoAdmin",
  data: function() {
    return {
      mode: "save",
      pagamento: {},
      pagamentos: [],
      fields: [
        {key: "id", label: "Código", sortable: true},
        {key: "descricao", label: "Descrição", sortable: true},
        { key: "actions", label: "Ações" }
      ]
    };
  },

  methods: {
    loadPagamentos() {
      const url = `${baseApiUrl}/formapagamento`
      axios.get(url).then( res => {
        this.pagamentos = res.data;
      });
    },

    reset() {
      this.mode = "save";
      this.pagamento = {};
      this.loadPagamentos();
    },

    save() {
      const method = this.pagamento.id ? "put" : "post";
      const id = this.pagamento.id ? `/${this.pagamento.id}` : "";
      axios[method](`${baseApiUrl}/formapagamento${id}`, this.pagamento)
        .then(() => {
          this.$toasted.global.defaultSuccess();
          this.reset();
        })
        .catch(showError);
    },

    remove() {
      const id = this.pagamento.id;
      axios
        .delete(`${baseApiUrl}/formapagamento/${id}`)
        .then(() => {
          this.$toasted.global.defaultSuccess();
          this.reset();
        })
        .catch(showError);
    },

    loadPagamento(pagamento, mode = "save") {
      this.mode = mode;
      this.pagamento = { ...pagamento };
    }
  },

  mounted() {
    this.loadPagamentos();
  }

};
</script>

<style>
</style>