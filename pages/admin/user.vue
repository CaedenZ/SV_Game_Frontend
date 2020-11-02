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
      :data-type="tabledataType"
      :is-add="isAdd"
      @confirm="editConfirm"
      @cancel="editCancel"
    />

    <button class="button" type="button" @click.prevent="editModal()">
      ADD
    </button>
    <br />

    <card-component title="Users" class="has-table has-mobile-sort-spaced">
      <Table
        :user-data="userData"
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
      tabledataType: 'User',
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
    console.log(this.userData)
    console.log(Object.keys(this.userData[0]))
    this.isLoading = false
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
    },
    editCancel() {
      this.isEditActive = false
    },
  },
}
</script>
