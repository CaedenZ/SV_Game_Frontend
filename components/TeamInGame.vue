<template>
  <b-modal :active.sync="isModalActive">
    <div class="card">
      <div class="card-content">
        <team-table :user-data="teamData" :is-loading="isLoading" />
      </div>
    </div>
  </b-modal>
</template>

<script>
import TeamTable from './TeamTable.vue'
export default {
  components: { TeamTable },
  name: 'ModalBox',
  props: {
    isActive: {
      type: Boolean,
      default: false,
    },
    dataType: {
      type: String,
      default: '',
    },
    teamData: {
      type: Array,
    },
  },
  data() {
    return {
      isModalActive: false,
      isLoading: false,
    }
  },
  watch: {
    isActive(newValue) {
      this.isModalActive = newValue
    },
    isModalActive(newValue) {
      if (!newValue) {
        this.cancel()
      }
    },
  },
  beforeRouteLeave(to, from, next) {
    const answer = window.confirm(
      'Do you really want to leave? You cannot return to the game after this!'
    )
    if (answer) {
      next()
    } else {
      next(false)
    }
  },
  methods: {
    cancel() {
      this.$emit('cancel')
    },
  },
}
</script>
