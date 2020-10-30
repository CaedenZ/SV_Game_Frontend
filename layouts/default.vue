<template>
  <div>
    <nav
      class="navbar header has-shadow is-primary"
      role="navigation"
      aria-label="main navigation"
    >
      <div class="navbar-brand">
        <a class="navbar-item" href="/"> SV Game </a>

        <div class="navbar-burger">
          <span />
          <span />
          <span />
        </div>
      </div>

      <div class="navbar-menu">
        <div class="navbar-start">
          <!-- navbar items -->
        </div>

        <div class="navbar-end">
          <a class="navbar-item" href="/profile">{{ currentUser.userName }}</a>
        </div>
      </div>
    </nav>

    <section class="main-content columns">
      <aside class="column is-2 section">
        <p class="menu-label is-hidden-touch">User View</p>
        <ul class="menu-list">
          <li v-for="(item, key) of items" :key="key">
            <nuxt-link :to="item.to" exact-active-class="is-active">
              <b-icon :icon="item.icon" /> {{ item.title }}
            </nuxt-link>
          </li>
        </ul>
      </aside>

      <div class="container column is-10">
        <nuxt />
      </div>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [
        {
          title: 'Home_TEST',
          icon: 'home',
          to: { name: 'index' },
        },
        {
          title: 'Login_TEST',
          icon: 'lightbulb',
          to: { name: 'login' },
        },
        {
          title: 'Register_TEST',
          icon: 'lightbulb',
          to: { name: 'register' },
        },
        {
          title: 'Game_TEST',
          icon: 'lightbulb',
          to: { name: 'game' },
        },
        {
          title: 'Leaderboard_TEST',
          icon: 'lightbulb',
          to: { name: 'leaderboard' },
        },
        {
          title: 'Admin_USER_TEST',
          icon: 'lightbulb',
          to: '/admin/user',
        },
        {
          title: 'Admin_CARD_TEST',
          icon: 'lightbulb',
          to: '/admin/card',
        },
        {
          title: 'Admin_TEAM_TEST',
          icon: 'lightbulb',
          to: '/admin/team',
        },
        {
          title: 'Admin_GAME_TEST',
          icon: 'lightbulb',
          to: '/admin/game',
        },
      ],
    }
  },
  computed: {
    currentUser() {
      return this.$store.state.userInfo
    },
  },
  mounted() {},
}
</script>
