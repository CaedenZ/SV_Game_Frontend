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
        <div
          v-if="this.$store.state.userInfo.type == 'admin'"
          class="navbar-start"
        >
          <div v-for="(item, key) of adminLink" :key="key" class="navbar-item">
            <nuxt-link :to="item.to" exact-active-class="is-active">
              <a class="navbar-item">{{ item.title }}</a>
            </nuxt-link>
          </div>
        </div>

        <div v-if="this.$store.state.userInfo.name" class="navbar-end">
          <a class="navbar-item" href="/profile">{{
            this.$store.state.userInfo.name
          }}</a>
          <a class="navbar-item" href="/">Logout</a>
        </div>

        <div v-else class="navbar-end">
          <a class="navbar-item" href="/login">Login</a>
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
      adminLink: [
        {
          title: 'user',
          to: '/admin/user',
        },
        {
          title: 'card',
          to: '/admin/card',
        },
        {
          title: 'team',
          to: '/admin/team',
        },
        {
          title: 'Game',
          to: '/admin/game',
        },
      ],
    }
  },
  mounted() {
    console.log(this.$store.state)
  },
}
</script>
