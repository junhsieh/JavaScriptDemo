<template>
  <div>
    <SalesOrderForm msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import SalesOrderForm from '@/components/SalesOrderForm.vue'

export default {
  name: 'SalesOrder',
  components: {
    SalesOrderForm
  }
}
</script>

