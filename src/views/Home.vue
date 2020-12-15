<template>
  <div class="center-container">
    <sui-grid-row>
      <div
        class="col-md-6 my-md-auto text-center text-md-left"
      >
        <sui-header size="medium" disabled>Screenous is free to use for everyone</sui-header>
        <sui-header size="huge">Share screen recordings through quick links.</sui-header>
        <sui-header size="medium">No sign-up or installation is required</sui-header>
        <router-link class="nav-link mt-4" to="/recorder">
          <sui-button color="blue" content="Get started" size="large" icon="right arrow" label-position="right" />
        </router-link>
      </div>
      <div class="col-md-6">
        <img
          src="https://webresourcesdepot.com/demo/snap/img/macbook.png"
          class="img-fluid d-block mx-auto"
          alt="Laptop"
        />
      </div>
    </sui-grid-row>
  </div>
</template>

<script>
export default {
  name: "Home",
};
</script>