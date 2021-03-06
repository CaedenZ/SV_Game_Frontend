<template>
  <div>
    <modal-box
      :is-active="isModalActive"
      :trash-object-id="trashObjectID"
      :data-type="tabledataType"
      @confirm="trashConfirm"
      @cancel="trashCancel"
    />
    <team-in-game
      :is-active="isTeamActive"
      :teamData="teamData"
      @cancel="Cancel"
    />
    <edit-box
      :is-active="isEditActive"
      :edit-object-id="editObjectID"
      :data-type="tabledataType"
      @confirm="editConfirm"
      @cancel="editCancel"
    />
    <b-table
      class="table-dark"
      :dark="true"
      :checked-rows.sync="checkedRows"
      :checkable="checkable"
      :loading="isLoading"
      :paginated="paginated"
      :per-page="perPage"
      :striped="true"
      :hoverable="true"
      :background="black"
      :default-sort="defaultsort"
      :default-sort-direction="sortdirection"
      :data="userData"
      :data-type="dataType"
      v-on:click="showTeam"
    >
      <b-table-column
        v-slot="props"
        cell-class="has-no-head-mobile is-image-cell"
      >
        <div class="image">
          <img :src="props.row.avatar" class="is-rounded" />
        </div>
      </b-table-column>
      <b-table-column
        v-for="field in Object.keys(userData[0])"
        v-slot="props"
        :key="field"
        :label="field"
        :field="field"
        sortable
      >
        {{ props.row[field] }}
      </b-table-column>
      <b-table-column
        v-slot="props"
        custom-key="actions"
        cell-class="is-actions-cell"
      >
        <div class="buttons is-right">
          <button
            class="button is-small is-danger"
            type="button"
            @click.prevent="trashModal(props.row)"
          >
            <b-icon icon="trash-can" size="is-small" />
          </button>
        </div>
      </b-table-column>

      <section slot="empty" class="section">
        <div class="content has-text-grey has-text-centered">
          <template v-if="isLoading">
            <p>
              <b-icon icon="dots-horizontal" size="is-large" />
            </p>
            <p>Fetching data...</p>
          </template>
          <template v-else>
            <p>
              <b-icon icon="emoticon-sad" size="is-large" />
            </p>
            <p>Nothing's here&hellip;</p>
          </template>
        </div>
      </section>
    </b-table>
  </div>
</template>

<script>
import ModalBox from '@/components/ModalBox'
import EditBox from '@/components/EditBox'
import TeamInGame from './TeamInGame.vue'

export default {
  name: 'Table',
  components: { ModalBox, EditBox, TeamInGame },
  props: {
    userData: {
      type: Array,
      default: null,
    },
    checkable: {
      type: Boolean,
      default: false,
    },
    isLoading: {
      type: Boolean,
      default: false,
    },
    dataType: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      isModalActive: false,
      isTeamActive: false,
      isEditActive: false,
      editObject: null,
      trashObject: null,
      teamID: null,
      paginated: false,
      perPage: 10,
      checkedRows: [],
      tabledataType: this.dataType,
      defaultsort: 'name',
      sortdirection: 'asc',
      teamData: null,
      dark: true,
    }
  },
  computed: {
    trashObjectID() {
      if (this.trashObject) {
        console.log(this.trashObject.id)
        return this.trashObject.id
      }
      return null
    },
    editObjectID() {
      if (this.editObject) {
        console.log(this.editObject.id)
        return this.editObject.id
      }
      return null
    },
    selectTeam() {
      if (this.teams) {
        console.log(this.teams)
        return this.teams
      }
      return null
    },
  },
  mounted() {
    console.log(this.dataType)
    if (this.dataType === 'Leaderboard') {
      this.defaultsort = 'score'
      this.sortdirection = 'desc'
    }
  },
  methods: {
    async showTeam(row) {
      const data = await this.$axios.get('/teams/' + row.id)
      this.teamData = data.data
      console.log(this.teamData)
      this.isTeamActive = true
    },
    editModal(editObject) {
      this.editObject = editObject
      this.isEditActive = true
      console.log(editObject)
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
    trashModal(trashObject) {
      this.trashObject = trashObject
      this.isModalActive = true
    },
    trashConfirm() {
      this.isModalActive = false
      this.$buefy.snackbar.open({
        message: 'Confirmed',
        queue: false,
      })
    },
    trashCancel() {
      this.isModalActive = false
    },
    Cancel() {
      this.isTeamActive = false
    },
  },
}
</script>
