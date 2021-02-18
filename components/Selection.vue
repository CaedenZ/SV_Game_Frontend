<template>
  <div>
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
    </Team>
  </div>
</template>

<script>
export default {
  name: 'SelectTeam',
  props: {
    teams: {
      type: Object,
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
}
</script>
