<template>
  <section>
    <div class="is-half">
      <b-field label="Name">
        <b-input v-model="name"></b-input>
      </b-field>

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
        <b-input type="password" v-model="password" password-reveal> </b-input>
      </b-field>

      <button @click="registration">submit</button>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      name: '',
      email: '',
      password: '',
      username: '',
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
