<template>
  <section class="section is-main-section">
    <hero-bar :has-right-visible="false"> User </hero-bar>
    <tiles>
      <card-widget
        class="tile is-child"
        type="is-primary"
        icon="account-multiple"
        :number="512"
        label="Clients"
      />
      <card-widget
        class="tile is-child"
        type="is-info"
        icon="cart-outline"
        :number="7770"
        prefix="$"
        label="Sales"
      />
      <card-widget
        class="tile is-child"
        type="is-success"
        icon="chart-timeline-variant"
        :number="256"
        suffix="%"
        label="Performance"
      />
    </tiles>

    <card-component title="Users" class="has-table has-mobile-sort-spaced">
      <Table :user-data="userData" :is-loading="isLoading" />
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
      userData: [],
      isLoading: true,
    }
  },
  computed: {
    titleStack() {
      return ['Admin', 'Dashboard']
    },
  },
  async mounted() {
    const data = await this.$axios.get('/users')
    this.userData = data.data
    console.log(this.userData)
    console.log(Object.keys(this.userData[0]))
    this.isLoading = false
  },
  methods: {},
}
</script>
