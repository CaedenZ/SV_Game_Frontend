<template>
  <section class="section">
    <form class="formSectionBox" @submit.prevent="validateBeforeSubmit">
      <div class="field">
        <p
          class="control is-expanded"
          :class="{ wrongInput: errors.has('email') }"
        >
          EMAIL
          <span
            class="has-text-danger is-pulled-right"
            v-if="errors.first('email')"
            >!</span
          >
          <input
            v-model="email"
            v-validate="'required|email'"
            name="email"
            class="input"
            type="email"
          />
        </p>
      </div>
      <div class="field">
        <p
          class="control is-expanded"
          :class="{ wrongInput: errors.has('password') }"
        >
          PASSWORD
          <span
            class="has-text-danger is-pulled-right"
            v-if="errors.first('password')"
            >!</span
          >
          <input
            v-model="password"
            v-validate="'required|alpha_num'"
            name="password"
            class="input"
            type="password"
          />
        </p>
      </div>
      <div class="has-text-right">
        <button :onClick="validateBeforeSubmit"></button>
      </div>
    </form>
    <p class="container" id="loginLinks">
      <nuxt-link :to="'signup'">Sign Up</nuxt-link>&nbsp;·
      <nuxt-link :to="'forgotpassword'">Forgot Password</nuxt-link>
    </p>
  </section>
</template>

<script>
import Cookie from 'js-cookie'
export default {
  head: {
    title: 'Login',
  },
  inject: ['$validator'],
  components: {},
  data() {
    return {
      email: '',
      password: '',
    }
  },
  mounted() {
    console.log('mounted')
    if (Cookie.get('userInfo')) {
      this.$router.push('/')
    }
  },
  methods: {
    async login() {
      const loginInfo = {
        session_key: this.$store.state.sKey,
        email: this.email,
        password: this.password,
      }
      const retData = await this.$axios.$post('/user/login', loginInfo)
      if (!retData.error) {
        retData.data.address = JSON.parse(retData.data.address)
        this.$store.commit('setLoggedIn', retData.data)
        Cookie.set('userInfo', retData.data, {
          expires: 7,
        })
        this.$router.push('/')
      } else {
        this.$toast.open({
          message: 'You have entered a wrong password or email!',
          type: 'error',
        })
      }
    },
    validateBeforeSubmit() {
      this.$validator.validateAll().then((result) => {
        if (result) {
          this.login()
          return
        }
        this.$toast.open({
          message: 'Something went wrong!',
          type: 'error',
        })
      })
    },
  },
}
</script>

<style scoped lang="scss">
#loginLinks {
  padding-top: 1rem;
  text-align: center;
  color: #bf9724;
  @media only screen and (min-width: 1024px) {
    width: 40% !important;
  }
  a {
    color: #bf9724 !important;
  }
}
</style>
