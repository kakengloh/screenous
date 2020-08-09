<template>
    <div class="container d-flex h-100">
        <div class="justify-content-center align-self-center w-100">
            <h2 class="mb-5">Drop me a message 😉</h2>
            <input v-model="envelope.email" type="text" placeholder="Email *" class="form-control mb-4">
            <input v-model="envelope.subject" type="text" placeholder="Subject *" class="form-control mb-4">
            <textarea v-model="envelope.message" rows="6" type="text" placeholder="Message *" class="form-control mb-4"></textarea>
            <div v-if="missingField" class="row justify-content-center">
                <div class="alert alert-warning mb-4 w-50" role="alert">
                    The "{{ missingField }}" field is required
                </div>
            </div>
            <div v-else-if="invalidField" class="row justify-content-center">
                <div class="alert alert-warning mb-4 w-50" role="alert">
                    The "{{ invalidField }}" field is invalid
                </div>
            </div>
            <div v-if="submitting" class="spinner-border spinner-border-md" role="status">
                <span class="sr-only">Submitting...</span>
            </div>
            <button v-else @click="submit" class="btn btn-primary btn-lg mb-4">Submit</button>
            <div v-if="success === true" class="alert alert-success" role="alert">
                <span>Message sent successfully! I'll reply at my earliest convenience :)</span><br>
                <a style="text-decoration: underline;" href="/">Back to Home</a>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    
    name: 'Contact',

    data: () => ({
        envelope: {
            email: '',
            subject: '',
            message: '',
        },
        submitting: false,
        success: null,
        missingField: null,
        invalidField: null,
    }),

    methods: {

        validateEmail(email) {
            const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(String(email).toLowerCase());
        },

        async submit() {

            for(let field in this.envelope) {
                if(!this.envelope[field]) {
                    this.missingField = field
                    return
                }

                if(field == 'email' && !this.validateEmail(this.envelope.email)) {
                    this.invalidField = 'email'
                    return
                }
            }

            this.missingField = null
            this.invalidField = null

            this.submitting = true

            var doc = await this.fStore.collection('messages').add(this.envelope)

            this.submitting = false

            if(doc.id) {
                this.success = true
                this.envelope.email = ''
                this.envelope.subject = ''
                this.envelope.message = ''
            }

        }

    }

}
</script>