<template>
  <div>
    <h1>Dashboard</h1>
    <Dashboard msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import Dashboard from '@/components/Dashboard.vue'

export default {
  name: 'SalesOrder',
  components: {
    Dashboard,
  }
}
</script>
