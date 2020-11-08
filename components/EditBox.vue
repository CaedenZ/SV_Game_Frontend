<template>
  <b-modal :active.sync="isEditActive" has-modal-card>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Confirm action</p>
      </header>
      <section class="modal-card-body" v-if="dataType === 'User'">
        <label for="email" class="label">Email</label>
        <p v-if="editObject" class="control">
          <input
            type="text"
            class="input"
            name="email"
            v-model="editObject.email"
          />
        </p>
        <label for="name" class="label">Name</label>
        <p v-if="editObject" class="control">
          <input
            type="text"
            class="input"
            name="name"
            v-model="editObject.name"
          />
        </p>
        <label for="name" class="label">Password</label>
        <p v-if="editObject" class="control">
          <b-input
            v-model="editObject.password"
            type="password"
            password-reveal
          >
          </b-input>
        </p>
        <label for="name" class="label">Score</label>
        <p v-if="editObject" class="control">
          <input
            type="text"
            class="input"
            name="name"
            v-model="editObject.score"
          />
        </p>
      </section>

      <section class="modal-card-body" v-if="dataType === 'Card'">
        <label for="type" class="label">Type</label>
        <p v-if="editObject" class="control">
          <input
            type="text"
            class="input"
            name="type"
            v-model="editObject.type"
          />
        </p>
        <label for="name" class="label">Name</label>
        <p v-if="editObject" class="control">
          <input
            type="text"
            class="input"
            name="name"
            v-model="editObject.name"
          />
        </p>
      </section>

      <section class="modal-card-body" v-if="dataType === 'Team'">
        <label for="teamScore" class="label">Team Score</label>
        <p v-if="editObject" class="control">
          <input
            type="text"
            class="input"
            name="teamScore"
            v-model="editObject.teamScore"
          />
        </p>
        <label for="companyName" class="label">Company Name</label>
        <p v-if="editObject" class="control">
          <input
            type="text"
            class="input"
            name="companyName"
            v-model="editObject.companyName"
          />
        </p>
        <label for="targetUser" class="label">Target User</label>
        <p v-if="editObject" class="control">
          <input
            type="text"
            class="input"
            name="targetUser"
            v-model="editObject.targetUser"
          />
        </p>
        <label for="industry" class="label">Industry</label>
        <p v-if="editObject" class="control">
          <input
            type="text"
            class="input"
            name="industry"
            v-model="editObject.industry"
          />
        </p>
        <label for="hotTrend" class="label">Hot Trend</label>
        <p v-if="editObject" class="control">
          <input
            type="text"
            class="input"
            name="hotTrend"
            v-model="editObject.hotTrend"
          />
        </p>
        <label for="gID" class="label">Game ID</label>
        <p v-if="editObject" class="control">
          <input
            type="text"
            class="input"
            name="gID"
            v-model="editObject.gID"
          />
        </p>
      </section>

      <footer class="modal-card-foot">
        <button class="button" type="button" @click="cancel">Cancel</button>
        <button v-if="!isAdd" class="button is-danger" @click="confirm">
          Edit
        </button>
        <button v-if="isAdd" class="button is-danger" @click="confirm">
          Add
        </button>
      </footer>
    </div>
  </b-modal>
</template>

<script>
export default {
  name: 'EditBox',
  props: {
    isActive: {
      type: Boolean,
      default: false,
    },
    dataType: {
      type: String,
      default: '',
    },
    editObjectId: {
      type: Number,
      default: 0,
    },
    isAdd: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      isEditActive: false,
      editObject: {
        email: '',
        name: '',
        score: '',
        password: '',
        // card
        type: '',
        // team
        teamScore: '',
        companyName: '',
        targetUser: '',
        industry: '',
        hotTrend: '',
        gID: '',
        // game
        date: new Date(),
        status: 'end',
      },
    }
  },
  watch: {
    isActive(newValue) {
      this.isEditActive = newValue
    },
    async isEditActive(newValue) {
      if (!newValue) {
        this.cancel()
      }
      // console.log(this.dataType)
      // console.log(this.editObjectId)
      // console.log(this.isAdd)
      if (this.dataType === 'User' && !this.isAdd) {
        const retData = await this.$axios.get('/users/' + this.editObjectId)
        // console.log(retData.data)
        this.editObject = retData.data
        // console.log(this.editObject)
      }
      if (this.dataType === 'Team' && !this.isAdd) {
        const retData = await this.$axios.get('/teams/' + this.editObjectId)
        this.editObject = retData.data
      }
      if (this.dataType === 'Card' && !this.isAdd) {
        const retData = await this.$axios.get('/cards/' + this.editObjectId)
        this.editObject = retData.data
      }
    },
  },
  methods: {
    cancel() {
      this.$emit('cancel')
    },
    async confirm() {
      const updateUserInfo = this.editObject
      console.log('here' + this.editObject)
      if (this.dataType === 'User') {
        if (!this.isAdd) {
          const retData = await this.$axios.put(
            '/users/' + this.editObjectId,
            updateUserInfo
          )
          // console.log('here')
          console.log(retData)
        } else {
          await this.$axios.post('/register', updateUserInfo)
          // console.log(retData)
        }
      }
      if (this.dataType === 'Team') {
        if (!this.isAdd) {
          const retData = await this.$axios.put(
            '/teams/' + this.editObjectId,
            updateUserInfo
          )
          console.log('here')
          console.log(retData)
        } else {
          const retData = await this.$axios.post('/teams', updateUserInfo)
          console.log(retData)
        }
      }
      if (this.dataType === 'Card') {
        if (!this.isAdd) {
          const retData = await this.$axios.put(
            '/cards/' + this.editObjectId,
            updateUserInfo
          )
          console.log('here')
          console.log(retData)
        } else {
          const retData = await this.$axios.post('/cards', updateUserInfo)
          console.log(retData)
        }
      }
      if (this.dataType === 'Game') {
        const retData = await this.$axios.post('/games', updateUserInfo)
        console.log(retData)
      }
      this.$emit('confirm')
    },
  },
}
</script>
