<template>
  <div class="container-fluid">
    <Header/>
    <InformationHome/>
    <Footer/>
  </div>
  
</template>

<script>


import Header from '../components/Header.vue'
import InformationHome from '../components/InformationHome.vue'
import Footer from '../components/Footer.vue'


export default {
    components: {
        Header,
        InformationHome,
        Footer
    }
}
</script>

<style>
.container-fluid{
  padding: 0px;
}
</style>
