<template>
  <v-toolbar-title class="subtitle-1 pl-2">{{ title }}
    <v-btn color="success" icon small @click="openDialog"><v-icon>mdi-pencil</v-icon></v-btn>

    <v-dialog v-model="dialog" max-width="500px">
      <v-card>
        <v-card-title>
          <span>사이트 타이틀 수정</span>
          <v-spacer></v-spacer>
          <v-btn color="success" icon @click="save"><v-icon>mdi-content-save</v-icon></v-btn>
        </v-card-title>
        <v-card-text>
          <v-text-field name="name" label="타이틀" v-model="text" />
        </v-card-text>
      </v-card>

    </v-dialog>
  </v-toolbar-title>
</template>

<script>
export default {
  props: ['title'],
  data () {
    return {
      dialog: false,
      text: this.title
    }
  },
  methods: {
    openDialog () {
      this.dialog = true
      this.text = this.title
    },
    save () {
      this.dialog = false
      this.$firebase.database().ref('site').update({
        title: this.text
      })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
