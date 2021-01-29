<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="items"
    >
      <template v-slot:[`item.id`]="{ item }">
        <v-btn icon @click="openDialog(item)"><v-icon>mdi-pencil</v-icon></v-btn>
        <v-btn icon @click="remove(item)"><v-icon>mdi-delete</v-icon></v-btn>
      </template>
    </v-data-table>

    <v-card flat>
      <v-btn color="success" depressed @click="openDialog(null)">쓰기</v-btn>
    </v-card>

    <v-dialog v-model="dialog" max-width="500">
      <v-card>
        <v-card-title v-if="!currentItem">
          글쓰기
          <v-spacer />
          <v-btn color="success" icon @click="save"><v-icon>mdi-content-save</v-icon></v-btn>
        </v-card-title>
        <v-card-title v-else>
          수정
          <v-spacer />
          <v-btn color="success" icon @click="update"><v-icon>mdi-update</v-icon></v-btn>
        </v-card-title>
        <v-card-text>
          <v-text-field v-model="form.title" label="제목" />
          <v-text-field v-model="form.content" label="타이틀" />
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
export default {
  data () {
    return {
      dialog: false,
      form: {
        title: '',
        content: ''
      },
      items: [],
      headers: [
        { value: 'title', text: '제목' },
        { value: 'content', text: '내용' },
        { value: 'id', text: 'id' }
      ],
      currentItem: null
    }
  },
  created () {
    this.subscribe()
  },
  methods: {
    subscribe () {
      this.$firebase.firestore().collection('board2').onSnapshot(snap => {
        this.items = snap.docs.map(doc => {
          const item = doc.data()
          return {
            id: doc.id,
            title: item.title,
            content: item.content
          }
        })
      })
    },
    openDialog (item) {
      this.currentItem = item
      if (!item) {
        this.form.title = ''
        this.form.content = ''
      } else {
        this.form.title = item.title
        this.form.content = item.content
      }
      this.dialog = true
    },
    save () {
      this.$firebase.firestore().collection('board2').add(this.form)
      this.dialog = false
    },
    remove (item) {
      this.$firebase.firestore().collection('board2').doc(item.id).delete()
    },
    update () {
      this.$firebase.firestore().collection('board2').doc(this.currentItem.id).set(this.form)
      this.dialog = false
    }
  }

}
</script>
