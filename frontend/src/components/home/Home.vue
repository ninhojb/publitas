<template>
    <div class="home">
        <PageTitle icon="fa fa-home" main="Dashboard"
            sub="Base de Conhecimento" />
        <div class="stats">
            <b-row>
                <Stat title="Despesas" :value="stat.despesas"
                    icon="fa fa-file" color="#3bc480" />
                <Stat title="Empresas" :value="stat.empresa"
                    icon="fa fa-file" color="#3282cd" />
                <Stat title="Fornecedor" :value="stat.fornecedor"
                    icon="fa fa-file" color="#000" />
            </b-row>
            <b-row>
                <Stat title="Grupo Contas" :value="stat.grupo_contas"
                    icon="fa fa-file" color="#d54d50" />
                <Stat title="Usuários" :value="stat.users"
                    icon="fa fa-user" color="#3282cd" />
            </b-row>
        </div>
    </div>
</template>

<script>
import PageTitle from '../template/PageTitle'
import Stat from './Stat'
import axios from 'axios'
import { baseApiUrl } from '@/global'

export default {
    name: 'Home',
    components: { PageTitle, Stat},
    data: function() {
        return {
            stat: {}
        }
    },
    methods: {
        getStats() {
            axios.get(`${baseApiUrl}/stats`).then(res => this.stat = res.data)
        }
    },
    mounted() {
        this.getStats()
    }
}
</script>

<style>
    .stats {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
    }
</style>