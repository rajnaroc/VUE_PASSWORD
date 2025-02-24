<template>
  <div>
    <Toaster position="top-right" richColors  />
    <router-view/>
  </div>
</template>

<script>
import {mapMutations} from "vuex"
import { auth } from './db/firebase'
export default {
  methods: {
    ...mapMutations(['SET_USER_DATA']),
    asignarUsuario(){
      auth.onAuthStateChanged( (user)=> {
      if (user){
        this.SET_USER_DATA(user)
      }
      else{
        this.$router.push({name: 'login'}
        )}
  })
}

  },
  mounted(){
    this.asignarUsuario()
  }
}
</script>
<script setup>
import { Toaster } from 'vue-sonner'
</script>