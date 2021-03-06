<template>
  <section class="section is-main-section">
    <hero-bar :has-right-visible="false"> Game </hero-bar>
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
        :number="gameData.length"
        label="Games"
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
      title="Games"
      class="has-table has-mobile-sort-spaced has-text-white"
      style="background: #292b2e; margin-top: 20px"
    >
      <Table
        :user-data="gameData"
        :is-loading="isLoading"
        :data-type="dataType"
      />
    </card-component>
  </section>
</template>

<script>
// @ is an alias to /src
import moment from 'moment-timezone'
import HeroBar from '@/components/HeroBar'
import Tiles from '@/components/Tiles'
import CardWidget from '@/components/CardWidget'
import CardComponent from '@/components/CardComponent'
import Table from '@/components/GameTable'
moment.tz.setDefault('Asia/Singapore')

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
      gameData: [],
      isLoading: true,
      allUsers: {},
      allTeams: [],
      dataType: 'Game',
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
    const users = await this.$axios.get('/users')
    const teams = await this.$axios.get('/teams')
    this.allTeams = teams.data
    this.allUsers = users.data
    const data = await this.$axios.get('/games')
    this.gameData = data.data

    for (const game in this.gameData) {
      const gameTeamsID = []
      const gameTeams = []
      for (const team in this.allTeams) {
        if (this.allTeams[team].gID === this.gameData[game].id) {
          gameTeamsID.push(this.allTeams[team].id)
          gameTeams.push(this.allTeams[team])
        }
      }
      gameTeams.sort(
        (a, b) => parseFloat(b.teamScore) - parseFloat(a.teamScore)
      )

      this.gameData[game].teams = gameTeamsID
      if (gameTeams[0] != null) {
        this.gameData[game].winner = gameTeams[0].id
        this.gameData[game].companyName = gameTeams[0].companyName
        this.gameData[game].teamScore = gameTeams[0].teamScore
      }
    }
    this.isLoading = false
  },
  methods: {
    downloadItem() {
      const myData = this.gameData

      const replacer = (key, value) => {
        return value === null ? '' : value
      }
      const header = ['id', 'date', 'status']
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
      a.download = 'game.csv'
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
