<template>
  <section class="section">
    <div class="box">
      <div class="content">
        <h2 class="title">Leader Board</h2>
      </div>
      <Table :user-data="data" :is-loading="isLoading" :data-type="dataType" />
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      userData: {},
      isLoading: true,
      dataType: 'Leaderboard',
    }
  },
  mounted() {
    this.$axios.get('/userstop20').then((res) => {
      this.data = res.data
      this.isLoading = false
    })
  },
}
</script>
