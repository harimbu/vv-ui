<template>
  <div>
    <h3 class='subtitle-1 my-5'>게시판 테스트 firestore CRUD</h3>
    <v-data-table
      :headers="headers"
      :items="items"
      :items-per-page="5"
      class="elevation-1"
    >
      <template v-slot:[`item.id`]="{ item }">
        <v-btn icon @click="openDialog(item)"><v-icon>mdi-pencil</v-icon></v-btn>
        <v-btn icon @click="remove(item)"><v-icon>mdi-delete</v-icon></v-btn>
      </template>
    </v-data-table>

    <v-card flat class="my-5">
      <v-btn text color="success" @click="openDialog(null)">쓰기</v-btn>
      <v-btn text color="success" @click="read">읽기</v-btn>
    </v-card>

    <v-dialog max-width="500px" v-model='dialog'>
      <v-card>
        <v-card-title primary-title v-if="!selectedItem">
          추가하기
          <v-spacer></v-spacer>
          <v-btn color="success" icon @click="add"><v-icon>mdi-content-save</v-icon></v-btn>
        </v-card-title>
        <v-card-title primary-title v-else>
          수정하기
          <v-spacer></v-spacer>
          <v-btn color="success" icon @click="update"><v-icon>mdi-update</v-icon></v-btn>
        </v-card-title>
        <v-card-text>
          <v-text-field label="제목" v-model="form.title" />
          <v-text-field label="내용" v-model="form.content" />
        </v-card-text>
      </v-card>
    </v-dialog>

  </div>
</template>
<script>
export default {
  data () {
    return {
      headers: [
        { value: 'title', text: '제목' },
        { value: 'content', text: '내용' },
        { value: 'id', text: 'id' }
      ],
      dialog: false,
      form: { title: '', content: '' },
      items: [],
      selectedItem: null,
      unsubscribe: null
    }
  },
  created () {
    this.subscribe()
  },
  destroyed () {
    if (this.unsubscribe) this.unsubscribe()
  },
  methods: {
    subscribe () {
      this.unsubscribe = this.$firebase.firestore().collection('boards').onSnapshot(snapshot => {
        this.items = snapshot.docs.map(doc => {
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
      this.selectedItem = item
      this.dialog = true
      if (!item) {
        this.form.title = ''
        this.form.content = ''
      } else {
        this.form.title = item.title
        this.form.content = item.content
      }
    },
    add () {
      this.$firebase.firestore().collection('boards').add(this.form)
      this.dialog = false
    },
    async read () {
      const snapshot = await this.$firebase.firestore().collection('boards').get()

      this.items = snapshot.docs.map(doc => {
        const item = doc.data()
        return {
          id: doc.id,
          title: item.title,
          content: item.content
        }
      })
    },
    remove (item) {
      this.$firebase.firestore().collection('boards').doc(item.id).delete()
    },
    update () {
      this.$firebase.firestore().collection('boards').doc(this.selectedItem.id).set(this.form)
      this.dialog = false
    }
  }

}
</script>
