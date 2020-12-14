<template>
  <section>
    <div class="is-half">
      <b-field label="Email" style="width: 300px">
        <b-input
          v-model="email"
          v-validate="'required|email'"
          type="email"
          maxlength="30"
        >
        </b-input>
      </b-field>

      <b-field label="Username" style="width: 300px">
        <b-input v-model="username" maxlength="30"></b-input>
      </b-field>

      <b-field label="Password" style="width: 300px">
        <b-input v-model="password" type="password" password-reveal> </b-input>
      </b-field>

      <b-field label="Confirm Password" style="width: 300px">
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
        const retData = await this.$axios.$post('/register', regInfo)
        if (!retData.error) {
          console.log('aa')
          this.$store.dispatch('setLoggedIn', retData)
          Cookie.set('userInfo', retData, {
            expires: 7,
          })
          this.$router.push('/')
        }
      }
    },
  },
}
</script>
