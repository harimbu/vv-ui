<template>
  <div class="board2">
    <h3 class="subtitle-2">board2</h3>
    <v-data-table
      :headers="headers"
      :items="items"
      :items-per-page="10"
      :options.sync="options"
      :server-items-length="serverItemsLength"
      must-sort
    >
      <template v-slot:[`item.id`]="{ item }">
        <v-btn icon @click="openDialog(item)"><v-icon>mdi-pencil</v-icon></v-btn>
        <v-btn icon @click="remove(item)"><v-icon>mdi-delete</v-icon></v-btn>
      </template>
      <template v-slot:[`item.createdAt`]="{ item }">
        {{item.createdAt}}
      </template>
    </v-data-table>
    <v-card>
      <v-btn depressed color="success" @click="openDialog(null)">쓰기</v-btn>
    </v-card>
    <v-dialog max-width="500" v-model="dialog">
      <v-card>
        <v-card-title v-if="!currentItem">
          <span>글 쓰기</span>
          <v-spacer />
          <v-btn icon @click="save"><v-icon>mdi-content-save</v-icon></v-btn>
        </v-card-title>
        <v-card-title v-else>
          <span>글 수정</span>
          <v-spacer />
          <v-btn icon @click="update"><v-icon>mdi-update</v-icon></v-btn>
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
import { head, last } from 'lodash'
export default {
  data () {
    return {
      dialog: false,
      form: { title: '', content: '' },
      items: [],
      headers: [
        { value: 'createdAt', text: '작성일' },
        { value: 'title', text: '제목' },
        { value: 'content', text: '내용' },
        { value: 'id', text: 'id', sortable: false }
      ],
      currentItem: null,
      unsubscribe: null,
      unsubscribeCount: null,
      serverItemsLength: 0,
      options: {
        sortBy: ['createdAt'],
        sortDesc: [true]
      },
      docs: []
    }
  },
  watch: {
    options: {
      handler (n, o) {
        const arrow = n.page - o.page
        this.subscribe(arrow)
      },
      deep: true
    }
  },
  created () {
    // this.subscribe()
  },
  destroyed () {
    if (this.unsubscribe) this.unsubscribe()
    if (this.unsubscribeCount) this.unsubscribeCount()
  },
  methods: {
    subscribe (arrow) {
      this.unsubscribeCount = this.$firebase.firestore().collection('meta').doc('board2').onSnapshot(doc => {
        if (!doc.exists) return
        this.serverItemsLength = doc.data().count
      })

      const order = head(this.options.sortBy)
      const sort = head(this.options.sortDesc) ? 'desc' : 'asc'
      const limit = this.options.itemsPerPage
      const ref = this.$firebase.firestore().collection('board2').orderBy(order, sort)

      let query
      switch (arrow) {
        case -1: query = ref.endBefore(head(this.docs)).limitToLast(limit)
          break
        case 1 : query = ref.startAfter(last(this.docs)).limit(limit)
          break
        default: query = ref.limit(limit)
          break
      }

      this.unsubscribe = query.onSnapshot(sn => {
        this.docs = sn.docs
        console.log(head(sn.docs).data())
        console.log(last(sn.docs).data())

        this.items = sn.docs.map(doc => {
          const item = doc.data()
          return {
            id: doc.id,
            title: item.title,
            content: item.content,
            createdAt: item.createdAt.toDate().toLocaleString()
          }
        })
      })
    },
    openDialog (item) {
      this.currentItem = item
      this.dialog = true
      if (!item) {
        this.form.title = ''
        this.form.content = ''
      } else {
        this.form.title = item.title
        this.form.content = item.content
      }
    },
    save () {
      const item = {
        // createdAt: new Date(),
        // title: this.form.title,
        // content: this.form.content
      }
      Object.assign(item, this.form)
      item.createdAt = new Date()

      this.$firebase.firestore().collection('board2').add(item)
      this.dialog = false
    },
    update () {
      this.$firebase.firestore().collection('board2').doc(this.currentItem.id).set(this.form)
      this.dialog = false
    },
    remove (item) {
      this.$firebase.firestore().collection('board2').doc(item.id).delete()
    }
  }
}
</script>
