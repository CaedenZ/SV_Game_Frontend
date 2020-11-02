<template>
  <b-modal :active.sync="isEditActive" has-modal-card>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Confirm action</p>
      </header>
      <section class="modal-card-body" v-if="dataType === 'User'">
        <div v-for="field in Object.keys(editObject)" :key="field">
          <label for="email" class="label">{{ field }}</label>
          <p v-if="editObject" class="control">
            <input
              type="text"
              class="input"
              name="email"
              v-model="editObject[field]"
            />
          </p>
        </div>
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
      editObject: {},
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
      console.log(this.dataType)
      console.log(this.editObjectId)
      console.log(this.isAdd)
      if (this.dataType === 'User' && !this.isAdd) {
        const retData = await this.$axios.get('/users/' + this.editObjectId)
        console.log(retData.data)
        this.editObject = retData.data
        console.log(this.editObject)
      }
    },
  },
  methods: {
    cancel() {
      this.$emit('cancel')
    },
    async confirm() {
      const updateUserInfo = {
        email: this.editObject.email,
        name: this.editObject.name,
        score: this.editObject.score,
        password: this.editObject.password,
      }
      console.log(updateUserInfo)
      if (!this.isAdd) {
        const retData = await this.$axios.put(
          '/users/' + this.editObjectId,
          updateUserInfo
        )
        console.log('here')
        console.log(retData)
      } else {
        const retData = await this.$axios.post('/register', updateUserInfo)
        console.log(retData)
      }
      this.$emit('confirm')
    },
  },
}
</script>
