<template>
  <b-modal :active="isActive" has-modal-card>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Final Result</p>
      </header>
      <section class="modal-card-body">
        <Team v-for="(team, key) in teams" :key="key" :title="'Group ' + key">
          <p>Company Name : {{ team.companyName }}</p>
          <p>Target User : {{ team.targetUser }}</p>
          <p>Industry : {{ team.industry }}</p>
          <p>Hot Trend : {{ team.hotTrend }}</p>
          <p>Score : {{ team.score }}</p>
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
      type: Object,
    },
  },
  methods: {},
}
</script>
