<template>
  <b-modal :active="isActive" has-modal-card>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Select Your Favourite Team</p>
      </header>
      <section class="modal-card-body">
        <Team
          v-for="(team, key) in teams"
          :key="key"
          :title="'Group ' + (parseInt(key) + 1)"
        >
          <p>Company Name : {{ team.companyName }}</p>
          <p>Target User : {{ team.targetUser }}</p>
          <p>Industry : {{ team.industry }}</p>
          <p>Hot Trend : {{ team.hotTrend }}</p>
          <b-button rounded @click="vote(key)" :disabled="disableVote"
            >Vote</b-button
          >
        </Team>
      </section>
    </div>
    <!-- <b-button rounded @click="result">Review Result</b-button> -->
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
    vote: {
      type: Function,
    },
    result: {
      type: Function,
    },
    disableVote: {
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
