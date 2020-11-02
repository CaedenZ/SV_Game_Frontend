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
      <footer class="modal-card-foot">
        <button class="button" type="button" @click="cancel">Cancel</button>
        <button class="button is-danger" @click="confirm">Edit</button>
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
  },
  data() {
    return {
      isEditActive: false,
      editObject: null,
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
      if (this.dataType === 'User') {
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
      }
      console.log(updateUserInfo)
      const retData = await this.$axios.put(
        '/users/' + this.editObjectId,
        updateUserInfo
      )
      console.log('here')
      console.log(retData)
      this.$emit('confirm')
    },
  },
}
</script>
