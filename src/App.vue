<template>
  <v-app>
    <v-navigation-drawer app v-model="drawer">
      <v-list class="text-center my-8">
        <v-list-item class="justify-center">
          <v-avatar size="80" color="red" v-if="$store.state.fireuser">
            <v-img size=80 :src="$store.state.fireuser.photoURL"></v-img>
          </v-avatar>
          <v-avatar size="80" color="red" v-else>
            <span class="white--text">who?</span>
          </v-avatar>
        </v-list-item>

        <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="title mb-2">하림부</v-list-item-title>
            <v-list-item-subtitle class="caption">뷰티파이로 잡다한 거 만든는 중...</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <Menu :items="site.items" />
    </v-navigation-drawer>

    <v-app-bar app flat class="justify-center">
      <v-app-bar-nav-icon @click='drawer = !drawer'></v-app-bar-nav-icon>
      <Title :title="site.title" />
      <v-spacer />
      <v-toolbar-items class="hidden-xs-only">
        <v-btn text color="grey darken-2" v-for="item in site.items" :key="item.title" :to="item.to">{{ item.title }}</v-btn>
      </v-toolbar-items>
      <Sign />

    </v-app-bar>

    <v-main>
      <v-container fluid>
        <router-view />
      </v-container>
    </v-main>
  </v-app>

</template>

<script>
import Menu from '@/views/site/Menu'
import Sign from '@/views/site/Sign'
import Title from '@/views/site/Title'

export default {
  name: 'App',
  components: { Menu, Title, Sign },

  data () {
    return {
      drawer: null,
      site: {
        logo: 'https://seeklogo.com/images/Y/yarn-logo-F5E7A65FA2-seeklogo.com.png',
        title: '뷰-뷰티파이 & 파이어베이스',
        items: [
          {
            icon: 'mdi-home',
            items: [{ title: '대시보드', to: '/' }],
            title: '홈',
            to: '/'
          },
          {
            icon: 'mdi-camera',
            active: true,
            items: [
              { title: 'pinterest', to: '/pinterest' },
              { title: 'instagram', to: '/instagram' },
              { title: 'sign', to: '/sign' }
            ],
            title: '뷰티파이 UI',
            to: '/pinterest'
          },
          {
            icon: 'mdi-chat',
            items: [
              { title: '샘플게시판', to: '/board' },
              { title: '샘플게시판2', to: '/board2' }
            ],
            title: '게시판',
            to: '/board'
          }
        ]
      }
    }
  },
  created () {
    this.subscribe()
  },
  methods: {
    subscribe () {
      this.$firebase.database().ref('site').on('value', snap => {
        const data = snap.val()
        if (!data) {
          this.$firebase.database().ref('site').set(this.site)
        } else {
          this.site = data
        }
      })
    }
  }
}
</script>
<style lang="scss">
img {
  width: 100%;
  display: block;
}

</style>
