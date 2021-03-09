<template>
  <section>
    <br />
    <header>
      <p>FORGOT PASSWORD</p>
    </header>
    <br />
    <div class="is-half">
      <b-field style="color: white"
        >EMAIL
        <b-input
          v-model="email"
          v-validate="'required|email'"
          type="email"
          maxlength="30"
        >
        </b-input>
      </b-field>

      <b-button
        type="is-warning"
        rounded
        style="width: 300px"
        @click="forgotpassword"
        >Submit</b-button
      >
    </div>
  </section>
</template>

<script>
export default {
  name: 'Forgot',
  data() {
    return {
      email: '',
    }
  },
  mounted() {
    console.log('Mounter')
  },
  methods: {
    async forgotpassword() {
      try {
        const emailInfo = {
          email: this.email,
        }
        const retData = await this.$axios.$post('/forgot', emailInfo)
        // const response = await axios.post('forgot', {
        //   email: this.email,
        // })
        console.log(retData)
        this.$toast.open({
          message: 'Email has been sent!',
          type: 'success',
        })
      } catch (e) {
        this.$toast.open({
          message: 'This email has not been registered!',
          type: 'error',
        })
      }
      // note: await need to do try catch, if not will be stuck in infinite loop
    },
  },
}
</script>
