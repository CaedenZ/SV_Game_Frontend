<template>
  <section class="section is-main-section">
    <hero-bar :has-right-visible="false"> Card </hero-bar>
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
        :number="cardData.length"
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

    <b-button type="is-success" rounded @click.prevent="editModal()">
      ADD
    </b-button>
    <b-button type="is-info" rounded @click="downloadItem"
      >Download EXCEL</b-button
    >
    <br />

    <card-component
      title="Cards"
      class="has-table has-mobile-sort-spaced"
      style="background: #333333; margin-top: 20px"
    >
      <Table
        :user-data="cardData"
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
      cardData: [],
      isLoading: true,
      allUsers: {},
      dataType: 'Card',
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
    const info = JSON.parse(localStorage.getItem('userInfo'))
    if (info) {
      this.$store.dispatch('setLoggedIn', info)
    } else {
      this.$router.push('/login')
    }
    const data = await this.$axios.get('/cards')
    this.cardData = data.data
    this.isLoading = false
    const users = await this.$axios.get('/users')
    this.allUsers = users.data
  },
  methods: {
    downloadItem() {
      const myData = this.cardData

      const replacer = (key, value) => {
        return value === null ? '' : value
      }
      const header = ['id', 'type', 'name']
      const csv = myData.map((row) =>
        header
          .map((fieldName) => JSON.stringify(row[fieldName], replacer))
          .join(',')
      )
      csv.unshift(header.join(','))
      const csvArray = csv.join('\r\n')
      const a = document.createElement('a')
      const blob = new Blob([csvArray], { type: 'text/csv' })
      const url = window.URL.createObjectURL(blob)

      a.href = url
      a.download = 'card.csv'
      a.click()
      window.URL.revokeObjectURL(url)
      a.remove()
    },
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
