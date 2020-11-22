<template>
  <section class="section">
    <select-team
      :isActive="status === 'vote'"
      :teams="voting"
      :vote="vote"
      :result="result"
    />
    <result :isActive="status === 'result'" :teams="finalResult" />
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
      v-else-if="status === 'game'"
      :companycards="companycards"
      :targetcards="targetcards"
      :industrycards="industrycards"
      :selectedCards="selectedCards"
      :select="select"
      :reviewHotTrend="reviewHotTrend"
    />
    <b-button type="is-warning" rounded @click="sendReview">Review</b-button>
    <b-button type="is-danger" rounded @click="startvote">Vote</b-button>
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
import SelectTeam from '~/components/SelectTeam'
export default {
  name: 'HomePage',

  components: {
    Team,
    Game,
    SelectTeam,
  },
  data() {
    return {
      status: 'waiting',
      connection: null,
      teams: {},
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
      noOfTeam: 2,
      reviewHotTrend: false,
      voting: {},
      finalResult: {},
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
      this.connection = new WebSocket('ws://192.168.1.105:4000')
      this.connection.onopen = (event) => {
        console.log(event)
        console.log('Successful Connected')
        this.connection.send(this.$store.state.userInfo.name)
      }

      this.connection.onmessage = (event) => {
        const data = JSON.parse(event.data)
        console.log(data)
        switch (data.type) {
          case 'message':
            this.messages.push(data.data)
            break
          case 'team':
            this.teams = data.data
            break
          case 'start':
            this.status = 'game'
            break
          case 'card':
            this.cards = data.data
            this.selectedCards.hotTrend = this.cards.find(
              (element) => element.type === 'Hot Trend'
            ).name
            this.companycards = data.data.filter(
              (e) => e.type === 'Company Name'
            )
            this.industrycards = data.data.filter((e) => e.type === 'Industry')
            this.targetcards = data.data.filter((e) => e.type === 'Target User')
            console.log(this.companycards)
            break
          case 'select':
            this.receiveCard(data.data.type, data.data.name)
            break
          case 'review':
            this.review()
            break
          case 'startvote':
            this.voting = data.data
            this.status = 'vote'
            console.log(data.data)
            break
          case 'result':
            this.finalResult = data.data
            this.status = 'result'
            break
          default:
          // code block
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
      const res = {
        type: 'select',
        data: {
          type,
          name,
        },
      }
      this.connection.send(JSON.stringify(res))
    },
    receiveCard(type, name) {
      if (type === 'Company Name') this.selectedCards.companyName = name
      else if (type === 'Target User') this.selectedCards.targetUser = name
      else if (type === 'Industry') this.selectedCards.industry = name
    },
    sendReview() {
      const res = {
        type: 'review',
      }
      this.connection.send(JSON.stringify(res))
    },
    review() {
      this.reviewHotTrend = true
    },
    startvote() {
      const res = {
        type: 'startvote',
      }
      this.connection.send(JSON.stringify(res))
    },
    vote(team) {
      const data = {
        team,
      }
      const res = {
        type: 'vote',
        data,
      }
      this.connection.send(JSON.stringify(res))
    },
    result() {
      const res = {
        type: 'result',
      }
      this.connection.send(JSON.stringify(res))
    },

    selectModal(teams) {
      this.isSelectActive = true
      console.log(teams)
    },
  },
}
</script>
