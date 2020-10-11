<template>
  <section>
    <b-field label="Name">
      <b-input v-model="name"></b-input>
    </b-field>

    <b-field label="Email">
      <b-input
        type="email"
        v-model="email"
        v-validate="'required|email'"
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

    <button :onClick="reg">submit</button>
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
  methods: {
    reg() {
      console.log(this)
    },
  },
}
</script>
