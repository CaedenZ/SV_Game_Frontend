<template>
  <section class="section">
    <div class="columns">
      <div class="column is-8">
        <Team v-for="(team, key) of teams" :key="key" :title="'Group ' + key">
          <p v-for="(member, ckey) of team.members" :key="ckey">{{ member }}</p>
        </Team>
      </div>

      <div
        v-if="this.$store.state.userInfo.name"
        class="column is-2 box"
        title="Chat"
        style="
          height: 500px;
          width: 300px;
          position: absolute;
          bottom: 80px;
          right: 50px;
          padding: 0px;
        "
      >
        <header class="window__header__container">
          <slot name="header"> Chat </slot>
        </header>
        <p v-for="(message, key) of messages" :key="key" style="padding: 8px">
          {{ message.user + ' : ' + message.text }}
        </p>
        <div
          class="field has-addons"
          style="position: absolute; width: 280px; bottom: 5px; right: 8px"
        >
          <div class="control">
            <input
              class="input"
              v-model="input"
              type="text"
              placeholder="input here"
            />
          </div>
          <div class="control">
            <a
              class="button is-info"
              @click="sendMessage"
              style="background: #6b63d8"
            >
              Send
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss">
.window {
  &__header {
    &__container {
      background: linear-gradient(90deg, #6b63d8, #b284ed);
      padding: 10px;
      border-top-left-radius: 5px;
      border-top-right-radius: 5px;
      color: #faf9ff;
      font-weight: 600;
      z-index: 1;
    }
  }
}
</style>

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
      this.connection = new WebSocket(
        'ws://ec2-18-191-146-196.us-east-2.compute.amazonaws.com:4000'
      )
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
