<template>
  <sui-menu secondary inverted class="nav">
    <router-link to="/">
      <sui-item>
        <strong>Screenous</strong>
      </sui-item>
    </router-link>
    <router-link to="/">
      <sui-menu-item :active="$route.path == '/'" link name="Home"
        >Home</sui-menu-item
      >
    </router-link>
    <router-link to="/recorder">
      <sui-menu-item :active="$route.path == '/recorder'" link name="Recorder"
        >Recorder</sui-menu-item
      >
    </router-link>
    <router-link to="/tutorial">
      <sui-menu-item :active="$route.path == '/tutorial'" link name="Tutorial"
        >Tutorial</sui-menu-item
      >
    </router-link>
    <router-link to="/contact">
      <sui-menu-item :active="$route.path == '/contact'" link name="Contact"
        >Contact Me</sui-menu-item
      >
    </router-link>
  </sui-menu>
</template>

<script>
export default {
  name: "Nav",
};
</script>

<style scoped>
.nav {
  background-color: #1b1c1d !important;
  padding: 10px;
}
</style>