<template>
  <b-modal :active.sync="isModalActive" has-modal-card>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Confirm action</p>
      </header>
      <section class="modal-card-body">
        <p>
          This will permanently delete <b>ID {{ trashObjectId }}</b>
        </p>
        <p>Action can not be undone.</p>
      </section>
      <footer class="modal-card-foot">
        <button class="button" type="button" @click="cancel">Cancel</button>
        <button class="button is-danger" @click="confirm">Delete</button>
      </footer>
    </div>
  </b-modal>
</template>

<script>
export default {
  name: 'ModalBox',
  props: {
    isActive: {
      type: Boolean,
      default: false,
    },
    trashObjectId: {
      type: Number,
      default: null,
    },
    dataType: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      isModalActive: false,
    }
  },
  watch: {
    isActive(newValue) {
      this.isModalActive = newValue
    },
    isModalActive(newValue) {
      if (!newValue) {
        this.cancel()
      }
    },
  },
  methods: {
    cancel() {
      this.$emit('cancel')
    },
    async confirm() {
      if (this.dataType === 'User') {
        const retData = await this.$axios.delete('/users/' + this.trashObjectId)
        console.log(retData)
      }
      if (this.dataType === 'Card') {
        await this.$axios.delete('/cards/' + this.trashObjectId)
      }
      if (this.dataType === 'Game') {
        const retData = await this.$axios.delete('/games/' + this.trashObjectId)
        console.log(retData)
      }
      if (this.dataType === 'Team') {
        await this.$axios.delete('/teams/' + this.trashObjectId)
      }
      this.$emit('confirm')
    },
  },
}
</script>
