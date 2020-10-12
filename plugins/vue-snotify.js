import Vue from 'vue'
import Snotify, { SnotifyPosition } from 'vue-snotify'

const options = {
  global: {
    maxOnScreen: 1,
  },
  toast: {
    position: SnotifyPosition.rightBottom,
  },
}

Vue.use(Snotify, options)
