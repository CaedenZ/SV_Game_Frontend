<template>
  <div class="column is-3">
    <div class="card" :class="title">
      <header class="card-header">
        <p class="card-header-title has-text-grey" style="background: #292b2e">
          {{ title }}
        </p>
      </header>
      <div class="card-content">
        <div class="content has-text-centered" style="background: #292b2e">
          {{ content }}
        </div>
      </div>
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
  background: #3b3b98;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  width: 200px;
  height: 40px;
}
.industry {
  background: #fd7272;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  width: 200px;
  height: 40px;
}
.targetuser {
  background: #55e6c1;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  width: 200px;
  height: 40px;
}
</style>
