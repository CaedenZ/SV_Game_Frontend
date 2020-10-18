<template>
  <section class="section">
    <div class="container">
      <div class="columns is-center">
        <Card
          v-for="(card, key) of cards"
          :key="key"
          :title="card.title"
          :content="card.content"
        >
        </Card>
      </div>

      <div class="columns is-center">
        <CardSelect
          v-for="(card, key) of cards_selection"
          :key="key"
          :title="card.title"
          :content="card.content"
        >
        </CardSelect>
      </div>
    </div>
  </section>
</template>

<script>
import Card from '~/components/Card'

export default {
  name: 'HomePage',

  components: {
    Card,
  },
  data() {
    return {
      cards: [
        {
          title: 'Company Name',
          content: 'The sound a frisbee makes when it hits the side of a car',
        },
        {
          title: 'INDUSTRY',
          content: 'Restaurants',
        },
      ],
      cards_selection: [
        {
          title: 'TARGET USER',
          content: 'Restaurants',
        },
        {
          title: 'TARGET USER',
          content: 'Else',
        },
      ],
    }
  },
  mounted() {
    // this.getData()
  },
  methods: {
    getData() {
      // alert('fetch Data')
    },
  },
}
</script>
