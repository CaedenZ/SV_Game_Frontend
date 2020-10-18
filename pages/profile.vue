<template>
  <section class="section">
    <div class="box">
      <div class="container">
        <h1 class="title">Profile</h1>
        <div class="content">
          <h2 class="subtitle is-5">User: {{ userData.userName }}</h2>
          <h2 class="subtitle is-5">Email: {{ userData.email }}</h2>
        </div>
      </div>
    </div>
    <div class="box">
      <div class="content">
        <h2 class="title">History Record</h2>
      </div>
      <table class="table">
        <thead>
          <tr>
            <th><abbr title="Position">Pos</abbr></th>
            <th>Team</th>
            <th><abbr title="Company Name">CN</abbr></th>
            <th><abbr title="Target User">TU</abbr></th>
            <th><abbr title="Industry">Ind</abbr></th>
            <th><abbr title="Hot Trend">HT</abbr></th>
            <th><abbr title="Rank">Rank</abbr></th>
            <th><abbr title="Date">Date</abbr></th>
            <th><abbr title="Comments">Com</abbr></th>
            <th><abbr title="Points">Pts</abbr></th>
            <th>ETC</th>
          </tr>
        </thead>
        <tfoot>
          <tr>
            <th><abbr title="Position">Pos</abbr></th>
            <th>Team</th>
            <th><abbr title="Company Name">CN</abbr></th>
            <th><abbr title="Target User">TU</abbr></th>
            <th><abbr title="Industry">Ind</abbr></th>
            <th><abbr title="Hot Trend">HT</abbr></th>
            <th><abbr title="Rank">Rank</abbr></th>
            <th><abbr title="Date">Date</abbr></th>
            <th><abbr title="Comments">Com</abbr></th>
            <th><abbr title="Points">Pts</abbr></th>
            <th>ETC</th>
          </tr>
        </tfoot>
        <tbody>
          <tr>
            <th>1</th>
            <td>
              <a
                href="https://en.wikipedia.org/wiki/Leicester_City_F.C."
                title="Leicester City F.C."
                >Leicester City</a
              >
              <strong>(C)</strong>
            </td>
            <td>Apple</td>
            <td>Students</td>
            <td>Food</td>
            <td>BlockChain</td>
            <td>1</td>
            <td>Aug 9</td>
            <td></td>
            <td>81</td>
            <td></td>
          </tr>
          <tr class="is-selected">
            <th>4</th>
            <td>
              <a
                href="https://en.wikipedia.org/wiki/Manchester_City_F.C."
                title="Manchester City F.C."
                >Manchester City</a
              >
            </td>
            <td>38</td>
            <td>19</td>
            <td>9</td>
            <td>10</td>
            <td>71</td>
            <td>41</td>
            <td>+30</td>
            <td>66</td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>

<script>
export default {
  name: 'ProfilePage',

  data() {
    return {}
  },
  computed: {
    userData() {
      return this.$store.state.userInfo
    },
  },
  mounted() {
    this.getData()
  },
  methods: {
    getData() {
      // alert('fetch Data')
    },
  },
}
</script>
