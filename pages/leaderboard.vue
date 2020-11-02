<template>
  <section class="section">
    <div class="box">
      <div class="content">
        <h2 class="title">Leader Board</h2>
      </div>
      <b-table :data="data" :columns="columns"></b-table>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      data: [],
      columns: [],
    }
  },
  mounted() {
    this.$axios.get('/userstop20').then((res) => {
      this.data = res.data
      Object.keys(this.data[0]).forEach((key) => {
        this.columns.push({
          field: key,
          label: key,
        })
      })
    })
  },
}
</script>
