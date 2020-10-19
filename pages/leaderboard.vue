<template>
  <b-table :data="data" :columns="columns"></b-table>
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
          point: '5',
          gender: 'Male',
        },
        {
          id: 2,
          first_name: 'John',
          last_name: 'Jacobs',
          point: '10',
          gender: 'Male',
        },
        {
          id: 3,
          first_name: 'Tina',
          last_name: 'Gilbert',
          point: '20',
          gender: 'Female',
        },
        {
          id: 4,
          first_name: 'Clarence',
          last_name: 'Flores',
          point: '30',
          gender: 'Male',
        },
        {
          id: 5,
          first_name: 'Anne',
          last_name: 'Lee',
          point: '35',
          gender: 'Female',
        },
      ],
      columns: [
        {
          field: 'id',
          label: 'ID',
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
          field: 'gender',
          label: 'Gender',
        },
      ],
    }
  },
}
</script>
