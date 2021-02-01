<template>
  <div>
    <nav
      class="navbar header has-shadow is-black"
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
          <a class="navbar-item" @click="gogame">Start</a>
          <a class="navbar-item" @click="goleaderboard">leaderboard</a>
          <a class="navbar-item">how it work</a>
          <a class="navbar-item" @click="goprofile">{{
            this.$store.state.userInfo.name
          }}</a>
          <a class="navbar-item" @click="logout" href="/">Logout</a>
        </div>

        <div v-else class="navbar-end">
          <a class="navbar-item" href="/login">Login</a>
        </div>
      </div>
    </nav>

    <section class="main-content columns">
      <aside
        class="column is-2 section"
        v-if="this.$store.state.userInfo.type == 'dev'"
      >
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

<style lang="scss">
html {
  background: linear-gradient(90deg, #000000, #292b2e);
  padding: 10px;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  color: #ffffff;
  font-weight: 600;
  z-index: 1;
}
.table {
  margin: 25px 0;
  font-size: 0.9em;
  font-family: sans-serif;
  min-width: 400px;
  border: 1px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
}
.table thead tr {
  background-color: #0a0a0a;
  color: #ffffff;
  text-align: left;
}
.table th {
  color: #ffffff;
  text-align: left;
}
.table td {
  padding: 12px 15px;
}
.table tbody tr {
  border-bottom: 1px solid #dddddd;
}

.table tbody tr:nth-of-type(even) {
  background-color: #141414;
}

.table tbody tr:last-of-type {
  border-bottom: 2px solid #1d1f1e;
}
.title {
  color: #ffffff;
}
.navbar-item {
  color: #ffffff;
}
body {
  color: #ffffff;
}
</style>

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
    const info = JSON.parse(localStorage.getItem('userInfo'))
    if (info) {
      this.$store.dispatch('setLoggedIn', info)
    } else {
      this.$router.push('/login')
    }
  },
  methods: {
    logout() {
      this.$store.dispatch('logout')
    },
    goleaderboard() {
      this.$router.push('/leaderboard')
    },
    goprofile() {
      this.$router.push('/profile')
    },
    gogame() {
      this.$router.push('/home')
    },
  },
}
</script>
