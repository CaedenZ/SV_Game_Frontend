<template>
  <section class="section">
    <div class="container">
      <div v-if="teamName" class="content">
        <h2 class="title has-text-white">{{ teamName }}</h2>
      </div>
      <div class="columns is-center">
        <Card title="Company Name" :content="selectedCards.companyName"> </Card>
        <Card title="Target User" :content="selectedCards.targetUser"> </Card>
        <Card title="Industry" :content="selectedCards.industry"> </Card>
        <Card
          v-if="reviewHotTrend && !extention"
          title="Hot Trend"
          :content="selectedCards.hotTrend"
        >
        </Card>
        <Card
          v-if="extention"
          title="Hot Trend 2"
          :content="selectedCards.extend"
        >
        </Card>
      </div>
      <div v-if="companycards.length > 1">
        <div v-if="selectedCards.companyName === ''" class="columns is-center">
          <CardSelect
            v-for="(card, key) of companycards"
            :key="key"
            :title="card.type"
            :content="card.name"
            :select="select"
            :selectable="selectable"
          >
          </CardSelect>
        </div>
        <div
          v-else-if="selectedCards.targetUser === ''"
          class="columns is-center"
        >
          <CardSelect
            v-for="(card, key) of targetcards"
            :key="key"
            :title="card.type"
            :content="card.name"
            :select="select"
            :selectable="selectable"
          >
          </CardSelect>
        </div>
        <div
          v-else-if="selectedCards.industry === ''"
          class="columns is-center"
        >
          <CardSelect
            v-for="(card, key) of industrycards"
            :key="key"
            :title="card.type"
            :content="card.name"
            :select="select"
            :selectable="selectable"
          >
          </CardSelect>
        </div>
        <div
          v-else-if="teamName === '' && selectable"
          class="columns is-center"
        >
          <b-field>
            <b-input placeholder="CompanyName" size="is-large" v-model="name">
            </b-input>
            <b-button rounded @click="setTeamName(name)">Set</b-button>
          </b-field>
        </div>
      </div>

      <base-timer
        :bus="bus"
        :timeUp="timeUp"
        v-if="selectedCards.industry === ''"
      />
    </div>
  </section>
</template>

<script>
import BaseTimer from './BaseTimer.vue'
export default {
  components: { BaseTimer },
  props: {
    companycards: {
      type: Array,
      required: false,
    },
    targetcards: {
      type: Array,
      required: false,
    },
    industrycards: {
      type: Array,
      required: false,
    },
    selectedCards: {
      type: Object,
      required: false,
    },
    select: {
      type: Function,
      required: false,
    },
    setTeamName: {
      type: Function,
      required: false,
    },
    timeUp: {
      type: Function,
      required: false,
    },
    reviewHotTrend: {
      type: Boolean,
      required: true,
    },
    extention: {
      type: Boolean,
      required: true,
    },
    teamName: {
      type: String,
      required: false,
    },
    selectable: {
      type: Boolean,
      required: false,
    },
    bus: {
      required: true,
    },
  },
  data() {
    return {
      name: '',
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
}
</script>
