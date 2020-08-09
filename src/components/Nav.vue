<template>
    <nav class="navbar navbar-expand-lg">
        <a class="navbar-brand" href="/">Screenous</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarColor01">
            <ul id="nav" class="navbar-nav mr-auto">

                <router-link class="nav-link" to="/">Home</router-link>
                
                <router-link class="nav-link" to="/recorder">Recorder</router-link>

                <router-link class="nav-link" to="/tutorial">Tutorial</router-link>
                
                <router-link class="nav-link" to="/contact">Contact Me</router-link>

            </ul>
        </div>

  </nav>
</template>

<script>
export default {
    name: 'Nav',
}
</script>

<style scoped>

nav {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  background-color: #101357;
}

#nav a {
  font-weight: bold;
  opacity: 0.6;
  color: white;
}

#nav a:hover {
  font-weight: bold;
  opacity: 0.8;
  color: white;
}

#nav a.router-link-exact-active {
  color: white;
  opacity: 1;
}

a.navbar-brand {
    color: white;
    font-weight: bold;
}

</style>