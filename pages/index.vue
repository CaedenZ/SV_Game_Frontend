<template>
  <section class="section">
    <div class="columns">
      <div class="column is-2 box main-content"></div>
      <div class="column is-8">
        <Team v-for="(team, key) of teams" :key="key" :title="'Group ' + key">
          <p v-for="(member, ckey) of team.members" :key="ckey">{{ member }}</p>
        </Team>
      </div>

      <div v-if="this.$store.state.userInfo.name" class="column is-2 box">
        <li v-for="(message, key) of messages" :key="key">
          {{ message.user + ' : ' + message.text }}
        </li>
        <div class="field has-addons">
          <div class="control">
            <input
              class="input"
              v-model="input"
              type="text"
              placeholder="input here"
            />
          </div>
          <div class="control">
            <a class="button is-info" @click="sendMessage"> Send </a>
          </div>
        </div>
      </div>
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
      messages: [],
      input: '',
    }
  },
  mounted() {
    this.$buefy.snackbar.open({
      message: 'Welcome back',
      queue: false,
    })
  },
  created() {
    if (this.$store.state.userInfo.name) {
      console.log('Starting Websocket Connection')
      this.connection = new WebSocket('ws://localhost:4000')
      this.connection.onopen = (event) => {
        console.log(event)
        console.log('Successful Connected')
      }

      this.connection.onmessage = (event) => {
        console.log(event)
        this.messages.push(JSON.parse(event.data))
      }
    }
  },
  methods: {
    sendMessage() {
      console.log(this.input)
      const msg = {
        user: this.$store.state.userInfo.name,
        text: this.input,
      }
      this.connection.send(JSON.stringify(msg))
    },
  },
}
</script>
