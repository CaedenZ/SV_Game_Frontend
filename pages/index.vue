<template>
  <section class="section">
    <select-team
      :is-active="status === 'vote'"
      :teams="voting"
      :vote="vote"
      :result="result"
      :disable-vote="disableVote"
    />
    <result :isActive="status === 'result'" :teams="finalResult" />
    <div v-if="status === 'waiting'" class="columns">
      <div class="column is-8">
        <Team
          v-for="(team, key, index) in teams"
          :key="key"
          :title="'Group ' + index"
        >
          <div
            class="columns"
            v-for="(member, ckey) of team.members"
            :key="ckey"
          >
            <p class="column">
              {{ member }}
            </p>
            <br />
            <a @click="changeTeam(member)" class="column">
              <b-icon icon="account-convert"></b-icon>
            </a>
          </div>
        </Team>
        <div v-if="this.$store.state.userInfo.type == 'admin'">
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
        v-if="false"
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
      v-else-if="status === 'game' && this.$store.state.userInfo.type == 'user'"
      :companycards="companycards"
      :targetcards="targetcards"
      :industrycards="industrycards"
      :selected-cards="selectedCards"
      :select="select"
      :review-hot-trend="reviewHotTrend"
    />
    <selection
      v-else-if="
        status === 'game' && this.$store.state.userInfo.type == 'admin'
      "
      :teams="teamSelecting"
    />
    <div v-if="this.$store.state.userInfo.type == 'admin'">
      <b-button type="is-warning" rounded @click="sendReview">Review</b-button>
      <b-button type="is-danger" rounded @click="startvote">Vote</b-button>
      <b-button rounded @click="result">Review Result</b-button>
      <!-- <b-button rounded @click="downloadItem">download</b-button> -->
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
import Game from '~/components/Game'
import SelectTeam from '~/components/SelectTeam'
import Selection from '~/components/Selection'
export default {
  name: 'HomePage',

  components: {
    Team,
    Game,
    SelectTeam,
    Selection,
  },
  data() {
    return {
      status: 'waiting',
      disableVote: false,
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
      changeTeamtmp: '',
      teamSelecting: {},
    }
  },
  mounted() {
    this.$buefy.snackbar.open({
      message: 'Welcome back',
      queue: false,
    })
  },
  created() {
    if (localStorage.getItem('userInfo')) {
      this.connection = new WebSocket(
        'ws://ec2-18-191-146-196.us-east-2.compute.amazonaws.com:4000'
      )
      this.connection.onopen = (event) => {
        this.connection.send(this.$store.state.userInfo.name)
        if (this.$store.state.userInfo.type === 'user') {
          const res = {
            type: 'user',
            data: this.$store.state.userInfo.name,
          }
          this.connection.send(JSON.stringify(res))
        } else {
          const res = {
            type: 'admin',
            data: this.$store.state.userInfo.name,
          }
          this.connection.send(JSON.stringify(res))
        }
      }

      this.connection.onmessage = (event) => {
        const data = JSON.parse(event.data)
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
            break
          case 'result':
            this.finalResult = data.data
            this.status = 'result'
            break
          case 'teamselecting':
            this.teamSelecting = data.data
            break
          default:
          // code block
        }
      }
    }
  },
  methods: {
    sendMessage() {
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
      this.disableVote = true
    },
    result() {
      const res = {
        type: 'result',
      }
      this.connection.send(JSON.stringify(res))
    },

    selectModal(teams) {
      this.isSelectActive = true
    },
    changeTeam(name) {
      if (this.$store.state.userInfo.type === 'admin') {
        if (this.changeTeamtmp === '' || this.changeTeamtmp === name) {
          this.changeTeamtmp = name
        } else {
          this.swapmember(this.changeTeamtmp, name)
          this.changeTeamtmp = ''
        }
      }
    },
    swapmember(nameA, nameB) {
      const data = {
        nameA,
        nameB,
      }
      const res = {
        type: 'swap',
        data,
      }
      this.connection.send(JSON.stringify(res))
    },
    getTeam(name) {
      const result = Object.keys(this.teams).find((key) =>
        this.teams[key].members.includes(name)
      )
      return result
    },
  },
}
</script>
