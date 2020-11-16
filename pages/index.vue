<template>
  <section class="section">
    <div v-if="status === 'waiting'" class="columns">
      <div class="column is-8">
        <Team
          v-for="(team, key, index) in teams"
          :key="key"
          :title="'Group ' + index"
        >
          <p v-for="(member, ckey) of team.members" :key="ckey">
            {{ member }}
          </p>
        </Team>
        <div v-if="this.$store.state.userInfo.name">
          <button @click="startGame">Start</button>
          <button @click="testCard">Test Card</button>
          <div class="field has-addons">
            <div class="control">
              <input
                class="input"
                v-model="noOfTeam"
                type="text"
                placeholder="input here"
              />
            </div>
            <div class="control">
              <a
                class="button is-info"
                @click="assignTeam"
                style="background: #6b63d8"
              >
                Shuffle
              </a>
            </div>
          </div>
        </div>
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
    <Game
      v-else
      :companycards="companycards"
      :targetcards="targetcards"
      :industrycards="industrycards"
      :selectedCards="selectedCards"
      :select="select"
      :reviewHotTrend="reviewHotTrend"
    />
    <button @click="review">Review</button>
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
import Game from '~/components/Game'
export default {
  name: 'HomePage',

  components: {
    Team,
    Game,
  },
  data() {
    return {
      status: 'waiting',
      connection: null,
      teams: {
        0: [
          'Maizie Morrow',
          'Woody Raymond',
          'Renesmae Sandoval',
          'Tamanna Greenwood',
          'Kierran Melia',
          'Sia Wood',
        ],
        1: [
          'Kaison Lugo',
          'Georga Ferrell',
          'Helen Kaiser',
          'Bobbie Lyons',
          'Tomos Gates',
        ],
        2: ['Caius Finch', 'Vlad Stevenson', 'Anil Correa'],
        3: ['Mac', 'Pablo', 'Keiren Fletcher', 'Safwan Cox'],
      },
      companycards: [],
      targetcards: [],
      industrycards: [],
      selectedCards: {
        companyName: '',
        targetUser: '',
        industry: '',
        hotTrend: '',
      },
      messages: [],
      input: '',
      noOfTeam: 4,
      reviewHotTrend: false,
    }
  },
  mounted() {
    this.$buefy.snackbar.open({
      message: 'Welcome back',
      queue: false,
    })
    console.log(this.messages)
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
        this.connection.send(this.$store.state.userInfo.name)
      }

      this.connection.onmessage = (event) => {
        const data = JSON.parse(event.data)
        console.log(data)
        if (data.type === 'message') {
          this.messages.push(data.data)
        } else if (data.type === 'team') {
          this.teams = data.data
          console.log(this.teams)
        } else if (data.type === 'start') {
          this.status = 'game'
        } else if (data.type === 'card') {
          this.cards = data.data
          this.selectedCards.hotTrend = this.cards.find(
            (element) => element.type === 'Hot Trend'
          ).name
          this.companycards = data.data.filter((e) => e.type === 'Company Name')
          this.industrycards = data.data.filter((e) => e.type === 'Industry')
          this.targetcards = data.data.filter((e) => e.type === 'Target User')
          console.log(this.companycards)
        }
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
      const res = {
        type: 'message',
        data: msg,
      }
      this.connection.send(JSON.stringify(res))
    },
    assignTeam() {
      const res = {
        type: 'team',
        data: this.noOfTeam,
      }
      this.connection.send(JSON.stringify(res))
    },
    startGame() {
      const res = {
        type: 'start',
      }
      this.connection.send(JSON.stringify(res))
      this.status = 'game'
    },
    testCard() {
      const res = {
        type: 'card',
      }
      this.connection.send(JSON.stringify(res))
    },
    select(type, name) {
      if (type === 'Company Name') this.selectedCards.companyName = name
      else if (type === 'Target User') this.selectedCards.targetUser = name
      else if (type === 'Industry') this.selectedCards.industry = name
    },
    review() {
      this.reviewHotTrend = true
    },
    vote() {
      this.status = 'vote'
    },
  },
}
</script>
