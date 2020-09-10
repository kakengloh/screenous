<template>
  <div class="container vertical-center justify-content-center">
        <div class="row">
            <div class="col-md-6 my-md-auto mb-5 mb-md-0 text-center text-md-left">
                <span class="text-uppercase text-muted small-xl">Screenous is free to use for everyone</span>
                <h1 class="description mt-2 mb-4">Share screen recordings through quick links.</h1>
                <h2 class="subdescription mb-4">No sign-up or installation is required</h2>
                <router-link class="nav-link" to="/recorder">
                  <button class="btn btn-lg btn-primary d-flex align-items-center">Get Started
                    <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-arrow-right-short" fill="currentColor" xmlns="http://www.w3.org/2000/svg" style="margin-left: 0.25em;">
                      <path fill-rule="evenodd" d="M8.146 4.646a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.793 8 8.146 5.354a.5.5 0 0 1 0-.708z"/>
                      <path fill-rule="evenodd" d="M4 8a.5.5 0 0 1 .5-.5H11a.5.5 0 0 1 0 1H4.5A.5.5 0 0 1 4 8z"/>
                    </svg>
                  </button>
                </router-link>
            </div>
            <div class="col-md-6 play-wrapper">
                <img src="https://webresourcesdepot.com/demo/snap/img/macbook.png" class="img-fluid d-block mx-auto" alt="Laptop">
            </div>
        </div>
    </div>
</template>

<script>

export default {
  name: 'Home'
}
</script>

<style scoped>

  .description {
    font-size: 35px;
  }

  .subdescription {
    font-size: 23px;
    color: grey;
  }

</style>