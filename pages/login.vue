<template>
  <section class="section">
    <v-layout justify-center>
      <form class="formSectionBox" @submit.prevent="validateBeforeSubmit">
        <div class="field">
          <p
            class="control is-expanded"
            :class="{ wrongInput: errors.has('email') }"
          >
            EMAIL
          </p>
          <span v-if="errors.first('email')" class="has-text-danger">!</span>

          <input
            v-model="email"
            v-validate="'required|email'"
            name="email"
            class="input"
            type="email"
            style="width: 300px"
          />
        </div>
        <div class="field">
          <p
            class="control is-expanded"
            :class="{ wrongInput: errors.has('password') }"
          >
            PASSWORD
          </p>
          <span v-if="errors.first('password')" class="has-text-danger">!</span>
          <input
            v-model="password"
            v-validate="'required|alpha_num'"
            name="password"
            class="input"
            type="password"
            style="width: 300px"
          />
        </div>
        <b-button
          type="is-warning"
          rounded
          style="width: 300px"
          @click="validateBeforeSubmit"
          >Login</b-button
        >
      </form>
    </v-layout>
    <p class="container" id="loginLinks">
      <nuxt-link :to="'register'">Sign Up</nuxt-link>&nbsp;·
      <nuxt-link :to="'forgotpassword'">Forgot Password</nuxt-link>
    </p>
  </section>
</template>

<script>
import Cookie from 'js-cookie'
// import { getUserList } from '../api/userAPI'
export default {
  components: {},
  data() {
    return {
      email: '',
      password: '',
    }
  },
  inject: ['$validator'],
  mounted() {
    console.log('mounted')
  },
  methods: {
    async login() {
      const loginInfo = {
        email: this.email,
        password: this.password,
      }
      const retData = await this.$axios.$post('/login', loginInfo)
      if (!retData.error) {
        // retData.data.address = JSON.parse(retData.data.address)
        this.$store.dispatch('setLoggedIn', retData)
        console.log(this.$store.state.login)
        Cookie.set('userInfo', retData, {
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

  head: {
    title: 'Login',
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
