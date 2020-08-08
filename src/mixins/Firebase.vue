<script>
import * as firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'

export default {
  
  name: 'FirebaseMixin',

  computed: {

    fAuth() {
      return firebase.auth()
    },

    fStorage() {
      return firebase.storage().ref()
    },

    fStore() {
      return firebase.firestore()
    }

  },

}

</script>