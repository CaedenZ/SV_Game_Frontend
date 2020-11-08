import createPersistedState from 'vuex-persistedstate'

export default ({ store }) => {
  createPersistedState({
    key: 'ccc',
    paths: ['data'],
  })(store)
}
