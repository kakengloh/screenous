<template>
    <div class="container d-flex h-100">
        <div class="justify-content-center align-self-center">
            <video v-if="src" id="video-player" class="mb-3" :src="src" autoplay controls />
        </div>
    </div>
</template>

<script>
export default {
    
    name: 'Player',

    data: () => ({
        src: null,
        isError: false,
    }),

    methods: {

        async retrieveClip() {

            const { slug } = this.$route.params

            if(!slug) return

            const today = new Date()

            const monthYear = `${today.getUTCMonth() + 1}-${today.getUTCFullYear()}`

            try {
                this.src = await this.fStorage.child(`clips/${monthYear}/${slug}.mp4`).getDownloadURL()
            } catch(e) {
                this.isError = true
            }

        }

    },

    created() {

        this.retrieveClip()

    }

}
</script>

<style scoped>

video {
    width: 60vw;
    height: 60vh;
    border-radius: 15px;
    object-fit: cover;
    border: 1px solid #ccc;
}

</style>