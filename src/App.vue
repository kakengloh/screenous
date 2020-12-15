<template>
  <div id="app">
    <Nav />
    <div id="content">
      <sui-container>
        <router-view/>
      </sui-container>
    </div>
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
  },

  created() {

    if(location.hash.startsWith('#/dev/')) {
      this.$store.dispatch('setEnv', 'development')
    }

  }

}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Montserrat&display=swap');

html, body {
  background-color: #F1F3FF;
  /* padding: 0;
  margin: 0; */
}

#app {
  /* font-family: Avenir, Helvetica, Arial, sans-serif; */
  font-family: 'Montserrat', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  position: relative;
}

.center-container {
  position: fixed;
  top: 50%;
  left: 50%;
  /* bring your own prefixes */
  transform: translate(-50%, -50%);
}

</style>