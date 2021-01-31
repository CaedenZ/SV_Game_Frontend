<template>
  <section class="section is-main-section">
    <hero-bar :has-right-visible="false"> User </hero-bar>
    <tiles>
      <card-widget
        class="tile is-child"
        type="is-primary"
        icon="account-multiple"
        :number="userData.length"
        label="Users"
      />
    </tiles>

    <edit-box
      :is-active="isEditActive"
      :data-type="dataType"
      :is-add="isAdd"
      @confirm="editConfirm"
      @cancel="editCancel"
    />
    <div>
      <b-button type="is-success" rounded @click.prevent="editModal()">
        ADD
      </b-button>
      <b-button type="is-info" rounded @click="downloadItem"
        >Download EXCEL</b-button
      >
    </div>

    <div>
      <card-component
        title="Users"
        class="has-table has-mobile-sort-spaced"
        style="background: #292b2e; margin-top: 20px"
      >
        <Table
          :user-data="userData"
          :is-loading="isLoading"
          :data-type="dataType"
        />
      </card-component>
    </div>
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
      isEditActive: false,
      isAdd: false,
      userData: {},
      isLoading: true,
      dataType: 'User',
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
    this.isLoading = false
  },
  methods: {
    downloadItem() {
      const myData = this.userData

      const replacer = (key, value) => {
        return value === null ? '' : value
      }
      const header = ['id', 'email', 'name', 'score', 'type']
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
      a.download = 'user.csv'
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
      this.$axios.get('/users').then((res) => {
        this.userData = res.data
        console.log(this.userData)
      })
    },
    editCancel() {
      this.isEditActive = false
    },
    async onUpdate(id, payload) {
      const retData = await this.$axios.put('/users/' + id, payload)
      console.log(retData)
    },
    async onCreate(payload) {
      const retData = await this.$axios.post('/register', payload)
      console.log(retData)
    },
    async onDelete(id) {
      const retData = await this.$axios.delete('/users/' + id)
      console.log(retData)
    },
  },
}
</script>
