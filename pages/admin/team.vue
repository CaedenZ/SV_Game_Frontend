<template>
  <section class="section is-main-section">
    <hero-bar :has-right-visible="false"> Team </hero-bar>
    <tiles>
      <card-widget
        class="tile is-child"
        type="is-primary"
        icon="account-multiple"
        :number="allUsers.length"
        label="Users"
      />
      <card-widget
        class="tile is-child"
        type="is-success"
        icon="chart-timeline-variant"
        :number="teamData.length"
        label="Cards"
      />
    </tiles>

    <card-component title="Teams" class="has-table has-mobile-sort-spaced">
      <Table :user-data="teamData" :is-loading="isLoading" />
    </card-component>
  </section>
</template>

<script>
// @ is an alias to /src
import HeroBar from '@/components/HeroBar'
import Tiles from '@/components/Tiles'
import CardWidget from '@/components/CardWidget'
import CardComponent from '@/components/CardComponent'
import Table from '@/components/Table'
export default {
  name: 'Admin',
  components: {
    Table,
    CardComponent,
    CardWidget,
    Tiles,
    HeroBar,
  },
  data() {
    return {
      teamData: [],
      isLoading: true,
      allUsers: {},
    }
  },
  computed: {
    titleStack() {
      return ['Admin', 'Dashboard']
    },
  },
  async mounted() {
    const data = await this.$axios.get('/teams')
    this.teamData = data.data
    this.isLoading = false
    const users = await this.$axios.get('/users')
    this.allUsers = users.data
  },
  methods: {},
}
</script>
