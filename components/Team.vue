<template>
  <div class="column">
    <div class="card">
      <header class="card-header">
        <p
          class="card-header-title has-text-white"
          style="background: #6b63d8; width: 200px; height: 40px"
        >
          {{ title }}
        </p>
      </header>
      <footer class="card-footer">
        <div class="card-footer-item">
          <span>
            <slot />
          </span>
        </div>
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
  },
}
</script>
