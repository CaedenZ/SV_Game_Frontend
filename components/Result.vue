<template>
  <b-modal :active="isActive" has-modal-card>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Final Result</p>
      </header>
      <section class="modal-card-body">
        <Team
          v-for="(team, key, index) in teams"
          :key="key"
          :title="'Group ' + (index + 1)"
        >
          <p>Company Name : {{ team.companyName }}</p>
          <p>Target User : {{ team.targetUser }}</p>
          <p>Industry : {{ team.industry }}</p>
          <p>Hot Trend : {{ team.hotTrend }}</p>
          <p>Score : {{ team.score }}</p>
          <p>Name : {{ team.name }}</p>
        </Team>
        <b-button v-if="startexC" type="is-warning" rounded @click="startex"
          >Start Extention Round</b-button
        >
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
      type: Object,
    },
    startex: {
      type: Function,
    },
    startexC: {
      type: Boolean,
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
  methods: {},
}
</script>
