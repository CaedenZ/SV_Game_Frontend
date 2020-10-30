<template>
  <div>
    <modal-box
      :is-active="isModalActive"
      :trash-object-name="trashObjectName"
      @confirm="trashConfirm"
      @cancel="trashCancel"
    />
    <b-table
      :checked-rows.sync="checkedRows"
      :checkable="checkable"
      :loading="isLoading"
      :paginated="paginated"
      :per-page="perPage"
      :striped="true"
      :hoverable="true"
      default-sort="name"
      :data="userData"
    >
      <b-table-column
        cell-class="has-no-head-mobile is-image-cell"
        v-slot="props"
      >
        <div class="image">
          <img :src="props.row.avatar" class="is-rounded" />
        </div>
      </b-table-column>
      <b-table-column
        v-for="field in Object.keys(userData[0])"
        :label="field"
        :field="field"
        sortable
        v-slot="props"
        :key="field"
      >
        {{ props.row[field] }}
      </b-table-column>
      <b-table-column
        custom-key="actions"
        cell-class="is-actions-cell"
        v-slot="props"
      >
        <div class="buttons is-right">
          <router-link
            :to="{ name: 'client.edit', params: { id: props.row.id } }"
            class="button is-small is-primary"
          >
            <b-icon icon="account-edit" size="is-small" />
          </router-link>
          <button
            class="button is-small is-danger"
            type="button"
            @click.prevent="trashModal(props.row)"
          >
            <b-icon icon="trash-can" size="is-small" />
          </button>
        </div>
      </b-table-column>

      <section slot="empty" class="section">
        <div class="content has-text-grey has-text-centered">
          <template v-if="isLoading">
            <p>
              <b-icon icon="dots-horizontal" size="is-large" />
            </p>
            <p>Fetching data...</p>
          </template>
          <template v-else>
            <p>
              <b-icon icon="emoticon-sad" size="is-large" />
            </p>
            <p>Nothing's here&hellip;</p>
          </template>
        </div>
      </section>
    </b-table>
  </div>
</template>

<script>
import ModalBox from '@/components/ModalBox'

export default {
  name: 'Table',
  components: { ModalBox },
  props: {
    userData: {
      type: Array,
      default: null,
    },
    checkable: {
      type: Boolean,
      default: false,
    },
    isLoading: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      isModalActive: false,
      trashObject: null,
      paginated: false,
      perPage: 10,
      checkedRows: [],
    }
  },
  computed: {
    trashObjectName() {
      if (this.trashObject) {
        return this.trashObject.name
      }

      return null
    },
  },
  mounted() {},
  methods: {
    trashModal(trashObject) {
      this.trashObject = trashObject
      this.isModalActive = true
    },
    trashConfirm() {
      this.isModalActive = false
      this.$buefy.snackbar.open({
        message: 'Confirmed',
        queue: false,
      })
    },
    trashCancel() {
      this.isModalActive = false
    },
  },
}
</script>
