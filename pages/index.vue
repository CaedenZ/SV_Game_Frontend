<template>
  <section class="section">
    <div class="columns is-mobile">
      <Team v-for="(team, key) of teams" :key="key" :title="'Group ' + key">
        <p v-for="(member, ckey) of team.members" :key="ckey">{{ member }}</p>
      </Team>
    </div>
    <button @click="sendMessage('hello')">Send</button>
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
      connection: null,
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
  created() {
    console.log('Starting Websocket Connection')
    this.connection = new WebSocket(
      'ws://ec2-18-191-146-196.us-east-2.compute.amazonaws.com:4000'
    )
    this.connection.onopen = (event) => {
      console.log(event)
      console.log('Successful Connected')
    }

    this.connection.onmessage = (event) => {
      console.log(event)
    }
  },
  methods: {
    sendMessage(message) {
      console.log(message)
      this.connection.send(message)
    },
  },
}
</script>
