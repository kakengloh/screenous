<template>
  <div id="app">
    <Nav />
    <router-view/>
    <Footer />
  </div>
</template>

<script>

// https://screenous-ef4ea.web.app

import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

export default {
  
  name: 'App',

  components: {
    Nav,
    Footer,
  }

}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Montserrat&display=swap');

#app {
  /* font-family: Avenir, Helvetica, Arial, sans-serif; */
  font-family: 'Montserrat', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  /* color: white; */
  background-color: #F1F3FF;
  height: 100vh;
  position: relative;
}

a {
  transition: opacity .3s;
  text-decoration: none;
}

.btn-primary {
  background-color: #101357;
  color: white;
  border: none;
  transition: opacity .3s;
}

.btn-primary:hover {
  background-color: #101357;
  opacity: .6;
}

.btn-primary:focus {
  background-color: #101357;
}

</style>