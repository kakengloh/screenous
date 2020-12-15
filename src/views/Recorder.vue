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
      <div v-if="isFinished">
        <div class="mb-4">
          <sui-input
            style="width: 50%"
            placeholder="Generating link"
            :loading="!shareableLink"
            :value="shareableLink"
          ></sui-input>
          <sui-button
            @click="copyLink"
            icon="clipboard check"
            :color="isLinkCopied ? 'positive' : ''"
            >{{ isLinkCopied ? "Copied" : "Copy shareable link" }}</sui-button
          >
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
      let dummy = document.createElement("textarea");
      document.body.appendChild(dummy);
      dummy.value = this.shareableLink;
      dummy.select();
      document.execCommand("copy");
      document.body.removeChild(dummy);

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