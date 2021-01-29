<template lang="">
  <div>
    <v-menu offset-y v-if="!$store.state.fireuser">
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="grey darken-4" icon  v-bind="attrs" v-on="on" ><v-icon >mdi-account</v-icon></v-btn>
      </template>
      <v-card class='d-flex flex-column pa-3'>
        <v-btn text @click="signInGoogle"><v-icon left>mdi-google</v-icon><span>구글로 로그인</span></v-btn>
      </v-card>
    </v-menu>

    <v-menu offset-y v-else>
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="grey darken-4" icon  v-bind="attrs" v-on="on" >
          <v-avatar size="30">
            <img :src="$store.state.fireuser.photoURL" alt="alt">
          </v-avatar>
        </v-btn>
      </template>
      <v-card class='d-flex flex-column pa-3'>
        <v-btn depressed color='grey darken-2' dark @click='logout'><span>로그아웃</span></v-btn>
      </v-card>
    </v-menu>
  </div>
</template>
<script>
export default {
  methods: {
    signInGoogle () {
      var provider = new this.$firebase.auth.GoogleAuthProvider()
      this.$firebase.auth().languageCode = 'ko'

      this.$firebase.auth().signInWithPopup(provider).catch((error) => {
        console.log(error.message)
      })
    },
    logout () {
      this.$firebase.auth().signOut()
    }
  }
}
</script>
<style lang="">

</style>
