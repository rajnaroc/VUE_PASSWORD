<template>
    <div class="flex justify-between px-50 h-screen w-full py-30 bg-slate-600">
        <form class="flex flex-col rounded items-center w-100 bg-white w-100 py-4 h-100 px-10" @submit.prevent="addservicio">
            <div class="py-5">
                <h1 class="text-5xl">Password</h1>
            </div>
            <div class="flex flex-col py-3">
                <label for="">Servicio</label>
                <input class="shadow-inner bg-slate-100 py-1 rounded text-center"  type="text"  placeholder="Servicio" v-model="servicio" required>
            </div>
            <div class="flex flex-col py-3">
                <label for="">Password</label>
                <input class="shadow-inner bg-slate-100 py-1 rounded text-center" type="password" placeholder="password" v-model="password" required>
            </div>
            <div  class="flex py-3">
                <button class="bg-slate-200 rounded py-3 px-4 hover:cursor-pointer hover:bg-slate-300 hover:transition" type="submit">agregar</button>
            </div>
        </form>
        <div>
            <button class="bg-red-500 rounded text-white py-3 px-4 hover:cursor-pointer hover:bg-red-100 hover:transition-all hover:text-black" @click="logout">cerrar sesion</button>
        </div>
        <div  class="flex flex-col w-100 bg-white h-100 overflow-y-auto border p-4 space-y-4">
            <p class="flex items-center justify-center w-full  h-100 text-center" v-if="contras==0">No hay password</p>
            <div v-if="contras!=0">
                <div class="flex flex-1 rounded flex-col" v-for="(tarea, indice) in contras" :key="indice">
                    <p class="text-black">Servicio: {{ tarea.servicio }}</p>
                    <p class="text-black">Contraseña: {{ tarea.password }}</p>
                    <div class="flex justify-end ">
                        <button @click="deletepass(indice)" class="bg-red-500 rounded text-white px-3 py-3  hover:cursor-pointer hover:bg-red-100 hover:transition-all hover:text-black">borrar</button>
                    </div>
                </div>
            </div>
            <!-- <p class="flex flex-1 w-100 text-xl items-center text-center" v-if="servicio!=0">No hay servicios</p> -->
        </div>
    </div>
</template>

<script>
import {mapActions,mapState} from "vuex"
import { auth } from '@/db/firebase'
import { signOut } from 'firebase/auth'
import { toast } from 'vue-sonner'
export default {
    data(){
        return{
            servicio: "",
            password: "",
        }
    },computed: {
        ...mapState(["contras"])
    },
    methods:{
        ...mapActions(["addpassword", "getpassword", "deletepassword"]),
        addservicio(){
            this.addpassword({servicio:this.servicio, password:this.password})
            this.servicio = ""
            this.password = ""
            this.getpassword()
        },
        logout(){
            signOut(auth)
            toast.success("Cerrando la sesion")
            this.$router.push("/")
        },
        deletepass(indice){
            this.deletepassword({indice:indice})
            this.getpassword()
        }
    },
    mounted(){
        this.getpassword()
    }
}
</script>

<style>

</style>