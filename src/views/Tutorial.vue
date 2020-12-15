<template>
  <div class="container my-4">
    <div class="row">
      <div class="col">
        <h1 class="step mt-2 mb-4">1. Click on "Start Recording" button</h1>
        <img
          class="mb-5"
          height="45"
          src="@/assets/screenshots/start_recording_button.png"
          alt="Tutorial Screenshot 1"
        />
      </div>
    </div>
    <div class="row">
      <div class="col">
        <h1 class="step mt-2 mb-4">
          2. Choose a target window or browser tab to be recorded
        </h1>
        <img
          class="mb-5"
          height="200"
          src="@/assets/screenshots/select_window.png"
          alt="Tutorial Screenshot 2"
        />
      </div>
    </div>
    <div class="row">
      <div class="col">
        <h1 class="step mt-2 mb-4">
          3. Stop recording or until the 180 seconds is over
        </h1>
        <img
          class="mb-5 mr-5"
          height="80"
          src="@/assets/screenshots/stop_recording_2.png"
          alt="Tutorial Screenshot 3"
        />
        <img
          class="mb-5"
          height="30"
          src="@/assets/screenshots/stop_recording.png"
          alt="Tutorial Screenshot"
        />
      </div>
    </div>
    <div class="row">
      <div class="col">
        <h1 class="step mt-2 mb-4">
          4. Video clip is available for download or instant sharing with
          generated link
        </h1>
        <img
          class="mb-5"
          height="100"
          src="@/assets/screenshots/download_and_share.png"
          alt="Tutorial Screenshot 4"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Tutorial",
};
</script>

<style scoped>
.step {
  font-size: 20px;
}
</style>