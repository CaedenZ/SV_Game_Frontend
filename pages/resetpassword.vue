<template>
  <section>
    <br />
    <header>
      <p>RESET PASSWORD</p>
    </header>
    <br />
    <div class="is-half">
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
        @click="resetpassword"
        >Submit</b-button
      >
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      password: '',
      confirmPassword: '',
    }
  },
  mounted() {
    console.log('Mounter')
    console.log('token' + this.$route.query.token)
  },
  methods: {
    async resetpassword() {
      const resetInfo = {
        password: this.password,
        id: this.$route.query.id,
        token: this.$route.query.token,
      }

      if (this.password !== this.confirmPassword) {
        this.$toast.open({
          message: 'Please type the same password to confirm!',
          type: 'error',
        })
      } else {
        try {
          const retData = await this.$axios.$post('/reset', resetInfo)
          console.log(retData)
          this.$toast.open({
            message: 'Successfully reset!',
            type: 'success',
          })
          this.$router.push('/login')
        } catch (e) {
          this.$toast.open({
            message: 'Something went wrong!',
            type: 'error',
          })
        }
        // note: await need to do try catch, if not will be stuck in infinite loop
      }
    },
  },
}
</script>
