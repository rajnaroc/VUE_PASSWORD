import { createStore } from 'vuex'
import {auth, db} from "@/db/firebase"
import {signInWithEmailAndPassword, createUserWithEmailAndPassword} from "firebase/auth"
import { toast } from 'vue-sonner'
import { doc,setDoc,arrayUnion, getDoc, updateDoc,} from 'firebase/firestore'


export default createStore({
  state: {
    user: null,
    contras: []
  },
  getters: {
  },
  mutations: {
    SET_USER_DATA(state,st){
      state.user = st
    },
    SET_PASSWORD_BD(state,st){
      state.contras = st
    },
    DELETE_PASSWORD(state,indice){
      state.contras.splice(indice,1)
    }
  },
  actions: {
    async login({commit}, data){
      try {
        const usercredential = await signInWithEmailAndPassword(auth,data.email,data.password)
        commit("SET_USER_DATA",usercredential.user)
        toast.success('Iniciando sesion')
        return true
      }
      catch(error){
        console.log(error);
        toast.error('Error al iniciar sesion')
        return false
        
      }
    },
    async register({commit}, data){
      try {
        const usercredential = await createUserWithEmailAndPassword(auth,data.email,data.password)
        commit("SET_USER_DATA",usercredential.user)
        toast.success('Registrado con exito')
        return true

      }
      catch(error){
        console.log(error.message);
        
        if (error.message == "Firebase: Error (auth/email-already-in-use)."){
          toast.error('Email ya esta registrado')
          return false
        }
        else{
          toast.error('Error al registrarse')
          return false
        }
        
      }
    },
    async addpassword({state}, data){
      try {
        const docRef = doc(db,"password", state.user.uid)
        await setDoc(docRef,{servicio: arrayUnion({ servicio: data.servicio, password: data.password })}, {merge: true})
        toast.success("Agregado el servicio")
      }
      catch(error){
        console.log(error);
        
      }
    },
    async getpassword({commit,state}){
      try {
        const docRef = doc(db,"password", state.user.uid)
        const docSnap = await getDoc(docRef)
        if (!docSnap.exists()) {
          commit("SET_PASSWORD_BD", [])
        } else {
          commit("SET_PASSWORD_BD", docSnap.data().servicio)
          console.log(state.servicio);
          
        }
      } catch (error) {
        console.log(error);
        
      }
    },
    async deletepassword({state,commit},indice){
      try {
        commit("DELETE_PASSWORD",indice.indice)
        const docRef = doc(db, "password",state.user.uid)
        await updateDoc(docRef,{servicio: state.contras})
      } catch (error) {
        console.log(error);
        
      }
    }
  },
  modules: {
  }
})
