<template>
    <div class="container vertical-center">
        <div class="justify-content-center">
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

            var ISOWeek = today.getISOWeek()

            var path = `clips/${ISOWeek}/${slug}.mp4`

            if(this.$store.state.env == 'development') {
                path = 'dev/' + path
            }

            try {
                this.src = await this.fStorage.child(path).getDownloadURL()
            } catch(e) {

                if(--ISOWeek < 1) {
                    ISOWeek = 52
                }

                path = `clips/${ISOWeek}/${slug}.mp4`

                if(this.$store.state.env == 'development') {
                    path = 'dev/' + path
                }

                try {
                    this.src = await this.fStorage.child(path).getDownloadURL()
                } catch(e) {
                    this.isError = true
                }

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