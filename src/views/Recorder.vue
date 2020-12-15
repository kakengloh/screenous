<template>
  <div class="center-container">
    <div>
      <video
        id="video-player"
        class="mb-3"
        poster="@/assets/black.jpg"
        :src="blobSrc"
        autoplay
        controls
      />
      <sui-grid-row class="justify-content-center mb-4">
        <sui-checkbox
          :label="
            isMicEnabled ? 'Disable sound recording' : 'Enable sound recording'
          "
          toggle
          v-model="isMicEnabled"
        />
      </sui-grid-row>
      <div class="mb-4">
        <sui-button
          v-if="!isRecording"
          @click="start"
          icon="play"
          size="large"
          positive
          content="Start recording"
        />
        <sui-button
          v-else
          @click="stop"
          negative
          icon="stop"
          size="large"
          content="Stop recording"
        />
      </div>
      <p class="mb-4" v-if="isRecording">
        {{ timeRemaining }}
        {{ timeRemaining > 0 ? "seconds" : "second" }} left
      </p>
      <!-- <div class="row justify-content-center" v-if="shareableLink">
        <div class="input-group mb-4 w-50">
          <input
            type="text"
            class="form-control"
            ref="shareableLink"
            :value="shareableLink"
          />
          <div class="input-group-append">
            <button
              class="btn btn-md btn-outline-dark d-flex align-items-center"
              type="button"
              @click="copyLink"
            >
              {{ isLinkCopied ? "Copied" : "Copy Link" }}
              <svg
                v-if="!isLinkCopied"
                width="1em"
                height="1em"
                viewBox="0 0 16 16"
                class="bi bi-clipboard"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                style="margin-left: 0.5em"
              >
                <path
                  fill-rule="evenodd"
                  d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z"
                />
                <path
                  fill-rule="evenodd"
                  d="M9.5 1h-3a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z"
                />
              </svg>
              <svg
                v-else
                width="1em"
                height="1em"
                viewBox="0 0 16 16"
                class="bi bi-clipboard-check"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                style="margin-left: 0.5em"
              >
                <path
                  fill-rule="evenodd"
                  d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z"
                />
                <path
                  fill-rule="evenodd"
                  d="M9.5 1h-3a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3zm4.354 7.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 9.793l2.646-2.647a.5.5 0 0 1 .708 0z"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
      <div
        class="row justify-content-center align-items-center mb-4"
        v-else-if="dataSrc"
      >
        Generating Shareable Link
        <div
          class="spinner-border spinner-border-sm"
          role="status"
          style="margin-left: 0.5em"
        >
          <span class="sr-only">Loading...</span>
        </div>
      </div>
      <div class="row justify-content-center mb-3" v-if="dataSrc">
        <a :href="dataSrc" download="screen_recording.mp4">
          <button class="btn btn-outline-dark d-flex align-items-center">
            Download Clip
            <svg
              width="1em"
              height="1em"
              viewBox="0 0 16 16"
              class="bi bi-box-arrow-in-down"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
              style="margin-left: 0.5em"
            >
              <path
                fill-rule="evenodd"
                d="M4.646 8.146a.5.5 0 0 1 .708 0L8 10.793l2.646-2.647a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 0 1 0-.708z"
              />
              <path
                fill-rule="evenodd"
                d="M8 1a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-1 0v-9A.5.5 0 0 1 8 1z"
              />
              <path
                fill-rule="evenodd"
                d="M1.5 13.5A1.5 1.5 0 0 0 3 15h10a1.5 1.5 0 0 0 1.5-1.5v-8A1.5 1.5 0 0 0 13 4h-1.5a.5.5 0 0 0 0 1H13a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-.5.5H3a.5.5 0 0 1-.5-.5v-8A.5.5 0 0 1 3 5h1.5a.5.5 0 0 0 0-1H3a1.5 1.5 0 0 0-1.5 1.5v8z"
              />
            </svg>
          </button>
        </a>
      </div> -->
      <div v-if="isFinished">
        <div class="mb-4">
          <sui-input
            placeholder="Generating link"
            :loading="!shareableLink"
            :value="shareableLink"
            @focus="$event.target.select()"
          ></sui-input>
        </div>
        <sui-button v-if="dataSrc" icon="download"
          ><a :href="dataSrc" download="screen_recording.mp4"
            >Download clip</a
          ></sui-button
        >
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import shortid from "shortid";

export default {
  name: "Recorder",

  data: () => ({
    stream: null,
    recorder: null,
    blobSrc: null,
    dataSrc: null,
    isFirstTime: true,
    isRecording: false,
    shareableLink: null,
    isLinkCopied: false,
    timeRemaining: 180,
    isMicEnabled: false,
    isModalOpened: true,
    isFinished: false,
  }),

  watch: {
    isRecording: {
      handler(newVal, oldVal) {
        if (newVal == false && oldVal == true) {
          this.isFinished = true;
        }
      },
    },
  },

  methods: {
    async start() {
      if (this.isMicEnabled) {
        const videoStream = await navigator.mediaDevices.getDisplayMedia({
          video: { mediaSource: "screen" },
        });

        const audioStream = await navigator.mediaDevices.getUserMedia({
          audio: true,
        });

        const videoTrack = videoStream.getTracks()[0];
        const audioTrack = audioStream.getTracks()[0];

        this.stream = new MediaStream([videoTrack, audioTrack]);
      } else {
        this.stream = await navigator.mediaDevices.getDisplayMedia({
          video: { mediaSource: "screen" },
        });
      }

      this.recorder = new MediaRecorder(this.stream);

      const chunks = [];

      this.recorder.ondataavailable = (e) => chunks.push(e.data);

      this.recorder.onstop = () => {
        this.isRecording = false;

        const completeBlob = new Blob(chunks, { type: chunks[0].type });
        this.blobSrc = URL.createObjectURL(completeBlob);

        this.firestoreUpload();

        this.convertToBase64();
      };

      this.recorder.start();

      this.timeRemaining = 180;

      this.isRecording = true;

      this.isFirstTime = false;

      this.shareableLink = null;

      this.isLinkCopied = false;

      this.countDown();
    },

    stop() {
      this.recorder.stop();
      this.stream.getVideoTracks()[0].stop();

      if (this.isMicEnabled) {
        this.stream.getAudioTracks()[0].stop();
      }
    },

    countDown() {
      var vm = this;

      (function loop() {
        setTimeout(() => {
          vm.timeRemaining--;

          if (vm.timeRemaining) return loop();

          vm.timeRemaining = 180;
          vm.stop();
        }, 1000);
      })();
    },

    async convertToBase64() {
      var { data } = await axios.get(this.blobSrc, { responseType: "blob" });

      const reader = new FileReader();

      var vm = this;

      reader.onloadend = function () {
        // this.dataSrc = reader.result.substr(reader.result.indexOf(',') + 1)
        vm.dataSrc = reader.result;
      };

      reader.readAsDataURL(data);

      this.firestoreUpload(data);
    },

    async firestoreUpload(blob) {
      const today = new Date();

      const ISOWeek = today.getISOWeek();

      const slug = shortid.generate();

      var path = `clips/${ISOWeek}/${slug}.mp4`;

      if (this.$store.state.env == "development") {
        path = "dev/" + path;
      }

      var snapshot = await this.fStorage.child(path).put(blob);

      if (snapshot.state == "success") {
        this.shareableLink = `https://${location.hostname}/#/play/${slug}`;

        if (this.$store.state.env == "development") {
          this.shareableLink = `https://${location.hostname}/#/dev/play/${slug}`;
        }

        var clipSlugs = JSON.parse(localStorage.getItem("clipSlugs") || "[]");

        clipSlugs.push(slug);

        localStorage.setItem("clipSlugs", JSON.stringify(clipSlugs));

        // var { data } = await axios.get('https://ifconfig.me/ip')

        // await this.fStore.collection('clips').add({
        //     slug,
        //     ip: data,
        //     createdAt: Date.now()
        // })
      }
    },

    copyLink() {
      let textToCopy = this.$refs.shareableLink;
      textToCopy.select();
      document.execCommand("copy");

      this.isLinkCopied = true;
    },
  },
};
</script>

<style scoped>
video {
  position: relative;
  width: 55vw;
  height: 50vh;
  border-radius: 15px;
  object-fit: cover;
}
</style>