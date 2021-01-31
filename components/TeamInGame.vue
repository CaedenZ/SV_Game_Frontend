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
  methods: {
    cancel() {
      this.$emit('cancel')
    },
  },
}
</script>
