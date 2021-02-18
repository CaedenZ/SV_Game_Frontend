<template>
  <section>
    <div class="is-half">
      <b-field style="width: 300px; color: white"
        >EMAIL
        <b-input
          v-model="email"
          v-validate="'required|email'"
          type="email"
          maxlength="30"
        >
        </b-input>
      </b-field>

      <b-field style="width: 300px; color: white"
        >USERNAME
        <b-input v-model="username" maxlength="30"></b-input>
      </b-field>

      <b-field style="width: 300px; color: white"
        >PASSWORD
        <b-input v-model="password" type="password" password-reveal> </b-input>
      </b-field>

      <b-field style="width: 300px; color: white"
        >CONFIRM PASSWORD
        <b-input v-model="confirmPassword" type="password" password-reveal>
        </b-input>
      </b-field>
      <b-button
        type="is-warning"
        rounded
        style="width: 300px"
        @click="registration"
        >Sign up</b-button
      >
    </div>
  </section>
</template>

<script>
import Cookie from 'js-cookie'
export default {
  data() {
    return {
      email: '',
      password: '',
      username: '',
      confirmPassword: '',
    }
  },
  mounted() {
    console.log('Mounter')
  },
  methods: {
    async registration() {
      const regInfo = {
        email: this.email,
        password: this.password,
        name: this.username,
      }

      if (this.password !== this.confirmPassword) {
        this.$toast.open({
          message: 'Please type the same password to confirm!',
          type: 'error',
        })
      } else {
        try {
          const retData = await this.$axios.$post('/register', regInfo)
          console.log('aa')
          this.$toast.open({
            message: 'Welcome!',
            type: 'success',
          })
          this.$store.dispatch('setLoggedIn', retData)
          Cookie.set('userInfo', retData, {
            expires: 7,
          })
          this.$router.push('/')
        } catch (e) {
          this.$toast.open({
            message: 'This email has already been registered!',
            type: 'error',
          })
        }
        // note: await need to do try catch, if not will be stuck in infinite loop
      }
    },
  },
}
</script>
