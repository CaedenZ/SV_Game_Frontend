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

    <edit-box
      :is-active="isEditActive"
      :data-type="dataType"
      :is-add="isAdd"
      @confirm="editConfirm"
      @cancel="editCancel"
    />

    <button class="button" type="button" @click.prevent="editModal()">
      ADD
    </button>
    <br />

    <card-component title="Teams" class="has-table has-mobile-sort-spaced">
      <Table
        :user-data="teamData"
        :is-loading="isLoading"
        :data-type="dataType"
      />
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
      dataType: 'Team',
      isEditActive: false,
      isAdd: false,
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
  methods: {
    editModal() {
      this.isEditActive = true
      this.isAdd = true
    },
    editConfirm() {
      this.isEditActive = false
      this.$buefy.snackbar.open({
        message: 'Confirmed',
        queue: false,
      })
      this.$axios.get('/teams').then((res) => {
        this.teamData = res.data
        console.log(this.teamData)
      })
    },
    editCancel() {
      this.isEditActive = false
    },
    async onUpdate(id, payload) {
      const retData = await this.$axios.put('/teams/' + id, payload)
      console.log(retData)
    },
    async onCreate(payload) {
      const retData = await this.$axios.post('/teams/', payload)
      console.log(retData)
    },
    async onDelete(id) {
      const retData = await this.$axios.delete('/teams/' + id)
      console.log(retData)
    },
  },
}
</script>
