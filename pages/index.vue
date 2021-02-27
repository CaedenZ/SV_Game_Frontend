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
            >Seal the deal in 60 seconds!</span
          >
          <p>The game that makes pitching fun and exciting.</p>
          <br /><br /><br /><br /><br /><br />

          <p>Powered by NTUitive</p>

          <br /><br /><br />

          <b-button type="is-primary" size="is-large">Start The Game</b-button>
        </div>
        <div class="column is-6">
          <img src="../assets/img.webp" style="border-radius: 50%" />
        </div>
      </div>

      <div class="container">
        <p
          class="font_8"
          style="line-height: 1.5em; text-align: center; font-size: 29px"
        >
          <span style="font-size: 29px"
            ><span style="letter-spacing: 0.05em"
              >A pitching game platform inspired by Silicon Valley Startup
              Pitching Card Game.</span
            ></span
          >
        </p>
      </div>

      <!-- <div class="container">
        <hero-bar :has-right-visible="false">
          PARTICIPATE EARLY. PLAY MORE, EARN MORE!
        </hero-bar>
      </div> -->

      <div class="container">
        <h2 class="font_2" style="text-align: center; font-size: 40px">
          <span class="color_15">How to Play</span>
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
}
.nan {
  height: 50px;
  background-image: url(../assets/bg3.png);
  margin: 30px 0;
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
  methods: {},
}
</script>
