<template>
  <div class="column is-3">
    <div class="card" :class="title">
      <header class="card-header">
        <p
          class="card-header-title has-text-white"
          style="
            background: #ffd32a;
            border-top-left-radius: 8px;
            border-top-right-radius: 8px;
            width: 200px;
            height: 40px;
          "
        >
          {{ title }}
        </p>
      </header>
      <div class="card-content">
        <div class="content has-text-centered">
          {{ content }}
        </div>
      </div>
      <footer class="card-footer">
        <a
          @click="select(title, content)"
          class="card-footer-item"
          style="color: #f97f51"
          >SELECT</a
        >
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
    select: {
      type: Function,
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
