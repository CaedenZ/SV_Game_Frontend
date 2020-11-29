<template>
  <div>
    <Team v-for="(team, key) in teams" :key="key" :title="'Group ' + key">
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
  mounted() {
    console.log(this.teams)
  },
}
</script>
