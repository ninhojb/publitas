<template>
  <div class="menu" v-show="isMenuVisible">
      <br>
      <h1 class="menu-titulo">
      Grupo Publitas
    </h1>
   <hr>
    <h1 class="menu-despesa">
      <i class="fa fa-home"></i>
      <router-link to="/">Dashboard</router-link>
    </h1>
    <h1 class="menu-despesa">
      <i class="fa fa-credit-card-alt"></i>
      <router-link to="/despesa">Despesas</router-link>
    </h1>
    <h1 class="menu-despesa">
      <i class="fa fa-area-chart" aria-hidden="true"></i>
      <router-link to="/graficos">Gráficos</router-link>
    </h1>
    <h1 class="menu-despesa">
      <i class="fa fa-book" aria-hidden="true"></i>
      <router-link to="/relatorios">Relatório</router-link>
    </h1>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "Menu",
  computed: mapState(["isMenuVisible"])
};
</script>
<style>
.menu {
  grid-area: menu;
  background: linear-gradient(to right, #232526, #414345);

  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
}

.menu .menu-despesa {
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  padding-bottom: 1rem;
  font-size: 1.5rem;
}
.menu .menu-despesa a {
  color: #fff;
  text-decoration: none;
}
.menu .menu-titulo {
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    padding-bottom: 1rem;
    font-size: 2rem;
}
</style>