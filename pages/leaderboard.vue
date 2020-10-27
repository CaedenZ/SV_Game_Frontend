<template>
  <section class="section">
    <div class="box">
      <div class="content">
        <h2 class="title">Leader Board</h2>
      </div>
      <b-table :data="data" :columns="columns"></b-table>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      data: [
        {
          id: 1,
          first_name: 'Jesse',
          last_name: 'Simmons',
          point: '50',
          email: 'Mal@a.com',
        },
        {
          id: 2,
          first_name: 'John',
          last_name: 'Jacobs',
          point: '44',
          email: 'joh@a.com',
        },
        {
          id: 3,
          first_name: 'Tina',
          last_name: 'Gilbert',
          point: '20',
          email: 'Ti@a.com',
        },
        {
          id: 4,
          first_name: 'Clarence',
          last_name: 'Flores',
          point: '10',
          email: 'Cla@a.com',
        },
        {
          id: 5,
          first_name: 'Anne',
          last_name: 'Lee',
          point: '5',
          email: 'Anne@a.com',
        },
      ],
      columns: [
        {
          field: 'id',
          label: 'Rank',
          width: '40',
          numeric: true,
        },
        {
          field: 'first_name',
          label: 'First Name',
        },
        {
          field: 'last_name',
          label: 'Last Name',
        },
        {
          field: 'point',
          label: 'Point',
          centered: true,
        },
        {
          field: 'email',
          label: 'Email',
        },
      ],
    }
  },
}
</script>
