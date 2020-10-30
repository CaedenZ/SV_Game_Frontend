<template>
  <section class="section">
    <div class="columns is-mobile">
      <Team v-for="(team, key) of teams" :key="key" :title="'Group ' + key">
        <p v-for="(member, ckey) of team.members" :key="ckey">{{ member }}</p>
      </Team>
    </div>
  </section>
</template>

<script>
import Team from '~/components/Team'

export default {
  name: 'HomePage',

  components: {
    Team,
  },
  data() {
    return {
      teams: [
        { members: ['Mac', 'Pablo', 'Keiren Fletcher', 'Safwan Cox'] },
        { members: ['Caius Finch', 'Vlad Stevenson', 'Anil Correa'] },
        {
          members: [
            'Maizie Morrow',
            'Woody Raymond',
            'Renesmae Sandoval',
            'Tamanna Greenwood',
            'Kierran Melia',
            'Sia Wood',
          ],
        },
        {
          members: [
            'Kaison Lugo',
            'Georga Ferrell',
            'Helen Kaiser',
            'Bobbie Lyons',
            'Tomos Gates',
          ],
        },
      ],
    }
  },
  mounted() {
    this.$buefy.snackbar.open({
      message: 'Welcome back',
      queue: false,
    })
  },
  methods: {
    getData() {
      // alert('fetch Data')
    },
  },
}
</script>
