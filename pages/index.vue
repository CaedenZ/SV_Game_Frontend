<template>
  <section class="section">
    <div class="container">
      <div class="columns intro">
        <div class="column is-6">
          <span
            style="
              font-family: poppins-semibold, poppins, sans-serif;
              font-size: 55px;
              font-weight: bold;
            "
            >Seal the deal in <br />60 seconds!</span
          ><br />
          <span
            style="
              font-family: poppins-semibold, poppins, sans-serif;
              font-size: 23px;
            "
            >The game that makes pitching fun and exciting.</span
          >

          <br /><br /><br /><br />

          <b-button
            type="is-primary"
            size="is-large"
            @click="goGame"
            style="
              font-family: poppins-bold, poppins, sans-serif;
              font-size: 25px;
              font-weight: bold;
            "
            >START NOW</b-button
          >

          <br /><br /><br /><br /><br />

          <p>
            Powered by
            <a href="https://www.ntuitive.sg/">
              <img
                src="../assets/NTUitive.png"
                style="height: 120px; width: 120px"
            /></a>
          </p>
        </div>
        <div class="column is-6">
          <img src="../assets/img.webp" style="border-radius: 50%" />
        </div>
      </div>

      <!-- <div class="container">
        <hero-bar :has-right-visible="false">
          PARTICIPATE EARLY. PLAY MORE, EARN MORE!
        </hero-bar>
      </div> -->

      <div class="container">
        <h2 class="font_2" style="text-align: center; font-size: 40px">
          <br />
        </h2>
      </div>
      <img src="../assets/short.png" />
    </div>
  </section>
</template>

<style lang="scss">
.window {
  &__header {
    &__container {
      background: linear-gradient(90deg, #dbdbe4, #b284ed);
      padding: 10px;
      border-top-left-radius: 5px;
      border-top-right-radius: 5px;
      color: #ffffff;
      font-weight: 600;
      z-index: 1;
    }
  }
}
img {
  width: 100%;
  height: 100%;
}
.howtoplay {
  --bg-overlay-color: transparent;
  border-width: 6px 6px 6px 6px;
  border-style: solid solid solid solid;
  border-color: rgba(255, 145, 48, 1) rgba(255, 145, 48, 1)
    rgba(255, 145, 48, 1) rgba(255, 145, 48, 1);
  border-radius: 10px 10px 10px 10px;
  box-shadow: 0 7px 12px 12px rgba(254, 97, 97, 0.73);
  overflow: hidden;
  transform: translateZ(0);
  margin: -6px;
}
.intro {
  background-image: url(../assets/bg1.png);
  background-size: cover;
  border-radius: 5px;
}
.nan {
  height: 50px;
  background-image: url(../assets/bg3.png);
  margin: 30px 0;
  background-size: cover;
  border-radius: 5px;
}
</style>

<script>
export default {
  name: 'HomePage',

  components: {},
  data() {
    return {}
  },
  mounted() {},
  created() {},
  methods: {
    goGame() {
      console.log('here')
      this.$router.push('/home')
    },
  },
}
</script>
