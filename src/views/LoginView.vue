<template>
  <div class="flex flex-col items-center h-screen w-full py-30 bg-slate-600">
    <form class="flex flex-col items-center bg-white h-150 w-100 py-10 px-5 rounded" @submit.prevent="loginView">
        <div class="py-5">
            <h1 class="text-5xl">Iniciar sesion</h1>
        </div>
        <div class="flex flex-col py-3">
            <label for="">Correo Eletronico</label>
            <input class="shadow-inner bg-slate-100 py-1 rounded text-center" type="email" placeholder="Email" v-model="email" required>
        </div>
        <div class="flex flex-col py-3">
            <label for="">Password</label>
            <input class="shadow-inner bg-slate-100 py-1 rounded text-center" type="password" placeholder="Password" v-model="password" required>
        </div>
        <div class="flex flex-col py-5">
            <p class="py-3">¿No Tienes cuenta? <router-link class=" text-blue-300 cursor-pointer" to="/register">Register</router-link></p>
            <button class="bg-slate-200 rounded py-3 px-4 hover:cursor-pointer hover:bg-slate-300 hover:transition" type="submit">Iniciar sesion</button>
        </div>
    </form>
  </div>
</template>

<script>
import {mapActions} from "vuex"
export default {
    data(){
        return{
            email: "",
            password: ""
        }
    },methods: {
        ...mapActions(["login"]),
        loginView(){
            const succes = this.login({email: this.email, password: this.password})
            if (succes) {
                setTimeout(() => {
                    this.$router.push("/password")
                }, 1000);
            }
        }
    }
}
</script>

<style>

</style>