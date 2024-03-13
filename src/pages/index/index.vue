<template>
    <Navbar/>
    <Search/>
    <router-view/>
</template>
<script setup>
import Navbar from '@/pages/index/views/Navbar.vue'
import Search from '@/pages/index/views/Search.vue'
import useRegister from '@/service/index.js'

const result=useRegister()
console.log(result)
</script>
<style scope>
  
</style>