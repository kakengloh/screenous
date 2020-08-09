<template>
  <div class="container justify-content-center d-flex h-100">
        <div class="row align-self-center">
            <div class="my-md-auto mb-5 mb-md-0 text-center text-md-left">
                <h1 class="step mt-2 mb-2">1. Click on "Start Recording" button</h1>
                <img class="mb-5" height="45" src="@/assets/screenshots/start_recording_button.png" alt="">
                <h1 class="step mt-2 mb-2">2. Choose a target window or browser tab to be recorded</h1>
                <img class="mb-5" height="200" width="320" src="@/assets/screenshots/select_window.png" alt="">
                <h1 class="step mt-2 mb-2">3. Stop recording or until the 90 seconds is over</h1>
                <img class="mb-5 mr-5" height="80" src="@/assets/screenshots/stop_recording_2.png" alt="">
                <img class="mb-5" height="30" src="@/assets/screenshots/stop_recording.png" alt="">
                <h1 class="step mt-2 mb-2">4. Video clip is available for download or instant sharing with generated link</h1>
                <img class="mb-5" height="100" src="@/assets/screenshots/download_and_share.png" alt="">
            </div>
        </div>
    </div>
</template>

<script>

export default {
  name: 'Tutorial'
}
</script>

<style scoped>

  .step {
    font-size: 20px;
  }

</style>