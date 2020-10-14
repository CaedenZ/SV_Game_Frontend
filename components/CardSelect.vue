<template>
  <div class="column is-offset-1">
    <div class="card" :class="title">
      <header class="card-header">
        <p class="card-header-title has-text-grey">
          {{ title }}
        </p>
      </header>
      <div class="card-content">
        <div class="content has-text-centered">
          <strong>{{ content }}</strong>
        </div>
      </div>
      <footer class="card-footer">
        <button>Select</button>
      </footer>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
  },
}
</script>

<style lang="scss">
.companyname {
  color: green;
}
.industry {
  color: palevioletred;
}
.targetuser {
  color: aqua;
}
</style>
