<template>
  <section>
    <div class="is-half">
      <b-field label="Email">
        <b-input
          v-model="email"
          v-validate="'required|email'"
          type="email"
          maxlength="30"
        >
        </b-input>
      </b-field>

      <b-field label="Username">
        <b-input v-model="username" maxlength="30"></b-input>
      </b-field>

      <b-field label="Password">
        <b-input v-model="password" type="password" password-reveal> </b-input>
      </b-field>

      <b-field label="Confirm Password">
        <b-input v-model="confirmPassword" type="password" password-reveal>
        </b-input>
      </b-field>

      <button @click="registration">submit</button>
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
        console.log(this.username)
        const retData = await this.$axios.$post('/register', regInfo)
        console.log(retData)
        if (!retData.error) {
          // retData.data.address = JSON.parse(retData.data.address)
          this.$store.dispatch('setLoggedIn', retData.data)
          Cookie.set('userInfo', retData.data, {
            expires: 7,
          })
          this.$router.push('/')
        }
      }
    },
  },
}
</script>
