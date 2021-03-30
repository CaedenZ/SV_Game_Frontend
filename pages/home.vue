<template>
  <section class="section">
    <select-team
      :isActive="status === 'vote'"
      :teams="voting"
      :vote="vote"
      :result="result"
      :disableVote="disableVote"
    />
    <select-team
      :isActive="status === 'exvote'"
      :teams="voting"
      :vote="vote"
      :result="result"
      :disableVote="disableVote"
    />
    <result
      :isActive="status === 'result'"
      :teams="finalResult"
      :startex="startex"
      :startexC="startexC"
      :endgame="endgame"
    />
    <div v-if="status === 'waiting'" class="columns">
      <div class="column is-2">
        <b-collapse class="card" animation="slide" aria-id="contentIdForA11y3">
          <template #trigger="props">
            <div
              class="card-header"
              role="button"
              aria-controls="contentIdForA11y3"
            >
              <p class="card-header-title">
                Online {{ String(number.length) }}
              </p>
              <a class="card-header-icon">
                <b-icon :icon="props.open ? 'menu-down' : 'menu-up'"> </b-icon>
              </a>
            </div>
          </template>
          <div class="card-content">
            <div class="content">
              <li v-for="num in number" :key="num">{{ num }}</li>
            </div>
          </div>
        </b-collapse>
      </div>
      <div class="column is-8">
        <Team
          v-for="(team, key, index) in teams"
          :key="key"
          :title="'Group ' + (index + 1)"
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
          <button @click="startGame">Start Game</button>
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
                Shuffle Users Into Teams
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
      v-else-if="
        (status === 'game' || status === 'extend') &&
        this.$store.state.userInfo.type == 'user'
      "
      :companycards="companycards"
      :targetcards="targetcards"
      :industrycards="industrycards"
      :selectedCards="selectedCards"
      :select="select"
      :reviewHotTrend="reviewHotTrend"
      :extention="status === 'extend'"
      :teamName="teamName"
      :setTeamName="setTeamName"
      :selectable="selectable"
      :bus="bus"
      :timeUp="timeUp"
    />
    <selection
      v-else-if="
        status === 'game' && this.$store.state.userInfo.type == 'admin'
      "
      :teams="teamSelecting"
    />
    <div v-if="this.$store.state.userInfo.type == 'admin'">
      <b-button type="is-warning" rounded @click="sendReview"
        >Show Hot Trend Card</b-button
      >
      <b-button type="is-danger" rounded @click="startvote">Vote</b-button>
      <b-button rounded @click="result">Show Results</b-button>
      <!-- <b-button rounded @click="downloadItem">download</b-button> -->
    </div>
  </section>
</template>

<style lang="scss"></style>

<script>
import Vue from 'vue'
import moment from 'moment-timezone'
import Team from '~/components/Team'
import Game from '~/components/Game'
import SelectTeam from '~/components/SelectTeam'
import Selection from '~/components/Selection'
moment.tz.setDefault('Asia/Singapore')
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
        extendHotTrend: '',
      },
      messages: [],
      input: '',
      noOfTeam: 2,
      reviewHotTrend: false,
      voting: {},
      finalResult: {},
      changeTeamtmp: '',
      teamSelecting: {},
      teamName: '',
      number: [],
      checkdraw: false,
      startexC: false,
      bus: new Vue(),
      selectable: true,
    }
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
  mounted() {
    const info = JSON.parse(localStorage.getItem('userInfo'))
    if (info) {
      this.$store.dispatch('setLoggedIn', info)
    } else {
      this.$router.push('/login')
    }
    this.$buefy.snackbar.open({
      message: 'Welcome back',
      queue: false,
    })
    console.log(this.messages)
  },
  created() {
    if (localStorage.getItem('userInfo')) {
      console.log('Starting Websocket Connection')
      this.connection = new WebSocket('ws://192.168.1.105:4000')
      this.connection.onopen = (event) => {
        console.log(event)
        console.log('Successful Connected')
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
        console.log(data)
        switch (data.type) {
          case 'message':
            this.messages.push(data.data)
            break
          case 'number':
            this.number = data.data
            break
          case 'team':
            this.teams = data.data
            break
          case 'start':
            this.checkLeader()
            this.status = 'game'
            break
          case 'card':
            this.cards = data.data
            this.selectedCards.hotTrend = this.cards.filter(
              (element) => element.type === 'Hot Trend'
            )[0].name
            this.selectedCards.extendHotTrend = this.cards.filter(
              (element) => element.type === 'Hot Trend'
            )[1].name
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
          case 'teamname':
            this.receiveName(data.data)
            break
          case 'review':
            this.review()
            break
          case 'startvote':
            this.voting = data.data
            this.status = 'vote'
            console.log(data.data)
            break
          case 'startexvote':
            this.disableVote = false
            this.voting = data.data
            this.status = 'exvote'
            console.log(data.data)
            break
          case 'result':
            this.finalResult = data.data
            this.status = 'result'
            break
          case 'startex':
            this.status = 'extend'
            break
          case 'endgame':
            this.status = 'endgame'
            break
          case 'draw':
            this.checkdraw = Boolean(data.data)
            this.startexCheck()
            break
          case 'teamselecting':
            this.teamSelecting = data.data
            console.log(this.teamSelecting)
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
    endgame() {
      const res = {
        type: 'end',
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
      this.bus.$emit('onReset')
    },
    timeUp() {
      if (this.selectedCards.companyName === '') {
        const res = {
          type: 'select',
          data: {
            type: 'Company Name',
            name: this.companycards[0].name,
          },
        }
        this.connection.send(JSON.stringify(res))
        this.bus.$emit('onReset')
      } else if (this.selectedCards.targetUser === '') {
        const res = {
          type: 'select',
          data: {
            type: 'Target User',
            name: this.targetcards[0].name,
          },
        }
        this.connection.send(JSON.stringify(res))
        this.bus.$emit('onReset')
      } else {
        const res = {
          type: 'select',
          data: {
            type: 'Industry',
            name: this.industrycards[0].name,
          },
        }
        this.connection.send(JSON.stringify(res))
        this.bus.$emit('onReset')
      }
    },
    receiveCard(type, name) {
      if (type === 'Company Name') this.selectedCards.companyName = name
      else if (type === 'Target User') this.selectedCards.targetUser = name
      else if (type === 'Industry') this.selectedCards.industry = name
    },
    receiveName(name) {
      this.teamName = name
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
      let VOTE
      if (this.status === 'extend') {
        VOTE = 'startexvote'
      } else {
        VOTE = 'startvote'
      }
      const res = {
        type: VOTE,
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
    startex() {
      const res = {
        type: 'startex',
      }
      this.connection.send(JSON.stringify(res))
    },
    endgame() {
      // to add backend code here
    },
    startexCheck() {
      if (this.$store.state.userInfo.type === 'admin' && this.checkdraw) {
        this.startexC = true
      } else {
        this.startexC = false
      }
    },
    setTeamName(data) {
      const res = {
        type: 'teamname',
        data,
      }
      this.connection.send(JSON.stringify(res))
    },
    selectModal(teams) {
      this.isSelectActive = true
      console.log(teams)
    },
    changeTeam(name) {
      if (this.$store.state.userInfo.type === 'admin') {
        if (this.changeTeamtmp === '') {
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
    checkLeader() {
      console.log(this.getTeam(this.$store.state.userInfo.name))
      if (
        this.$store.state.userInfo.name ===
        this.teams[this.getTeam(this.$store.state.userInfo.name)].members[0]
      ) {
        this.selectable = true
      } else {
        this.selectable = false
      }
    },
    removeA(arr) {
      const a = arguments

      let what
      let L = a.length
      let ax
      while (L > 1 && arr.length) {
        what = a[--L]
        while ((ax = arr.indexOf(what)) !== -1) {
          arr.splice(ax, 1)
        }
      }
      return arr
    },
  },
}
</script>
