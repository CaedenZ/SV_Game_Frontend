<template>
  <b-modal :active.sync="isSelectActive" has-modal-card>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Select Your Favourite Team</p>
      </header>
      <section class="modal-card-body">
        <Team
          v-for="(team, key, index) in teams"
          :key="key"
          :title="'Group ' + index"
        >
          <p>
            {{ team.companyName }}
          </p>
          <p>
            {{ team.targetUser }}
          </p>
          <p>
            {{ team.industry }}
          </p>
          <p>
            {{ team.hotTrend }}
          </p>
        </Team>
      </section>
    </div>
  </b-modal>
</template>

<script>
export default {
  name: 'SelectTeam',
  props: {
    isActive: {
      type: Boolean,
      default: false,
    },
    teams: {
      type: Array,
    },
    isAdd: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      isSelectActive: false,
    }
  },
  watch: {
    isActive(newValue) {
      this.isSelectActive = newValue
    },
    async isSelectActive(newValue) {
      // console.log(this.dataType)
      // console.log(this.editObjectId)
      // console.log(this.isAdd)
      const retData = await this.$axios.get('/teams')
      this.teams = retData.data
    },
  },
  methods: {},
}
</script>
