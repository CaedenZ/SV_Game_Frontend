<template>
  <section class="section">
    <div class="container">
      <div class="columns is-center">
        <Card title="Company Name" :content="selectedCards.companyName"> </Card>
        <Card title="Target User" :content="selectedCards.targetUser"> </Card>
        <Card title="Industry" :content="selectedCards.industry"> </Card>
        <Card
          v-if="reviewHotTrend"
          title="Hot Trend"
          :content="selectedCards.hotTrend"
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
          >
          </CardSelect>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
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
    reviewHotTrend: {
      type: Boolean,
      required: true,
    },
  },
}
</script>
