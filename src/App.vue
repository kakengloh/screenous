<template>
  <div id="app">
    <Nav />
    <div id="content">
      <router-view/>
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
  padding: 0;
  margin: 0;
}

#app {
  /* font-family: Avenir, Helvetica, Arial, sans-serif; */
  font-family: 'Montserrat', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  position: relative;
}

#content {
  height: 90vh;
}

.vertical-center {
  min-height: 90%;  /* Fallback for browsers do NOT support vh unit */
  min-height: 90vh; /* These two lines are counted as one :-)       */
  display: flex;
  align-items: center;
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