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
        <b-input xv-model="confirm_password" type="password" password-reveal>
        </b-input>
      </b-field>

      <button @click="registration">submit</button>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
      username: '',
      confirm_password: '',
    }
  },
  mounted() {
    console.log('Mounter')
  },
  methods: {
    registration() {
      console.log(this.name)
      this.$toast.open({
        message: this.name,
        type: 'info',
      })
    },
  },
}
</script>
