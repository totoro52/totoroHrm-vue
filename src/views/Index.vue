<template>
  <div class="index">
      <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      app
    >
      <v-list >
        <v-list-item two-line :class="miniVariant && 'px-0'">
            <v-list-item-avatar>
              <img src="https://randomuser.me/api/portraits/men/81.jpg">
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title>Admin</v-list-item-title>
              <v-list-item-subtitle>欢迎使用</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <v-divider></v-divider>
         <v-list-group
         
        prepend-icon="account_circle"
        v-for="menu in menus" :key="menu.name"
      >
        <template v-slot:activator>
          <v-list-item-title>{{ menu.name }}</v-list-item-title>
        </template>
          <v-list-item v-for="clild in menu.childMenu" :key="clild.name"  @click="goLink(clild.url)">
          <v-list-item-action>
            <v-icon>mdi-view-dashboard</v-icon>
          </v-list-item-action>
          <v-list-item-content  @click="this.showDialog=!this.showDialog">
            <v-list-item-title>{{ clild.name }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
         </v-list-group>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      app
      color="primary"
      dark
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title>人力资源管理中心</v-toolbar-title>
    </v-app-bar>

    <v-content>
      <v-container
        fluid
      >
        <v-row justify="start"
          align="start">
          <v-col cols="12">
            <router-view />
          </v-col>
        </v-row>
      </v-container>
    </v-content>

    <v-footer app inset>
      <span>&copy; 2020 备案号：京ICP备 备你妈的案</span>
    </v-footer>
  </v-app>
  <Dialog/>
  </div>
</template>

<script>
import dialog from '../components/Dialog.vue';
export default {
  name: 'Index',
    props: {
      source: String,
    },
    components:{
      "Dialog" : dialog
    },
    data(){
      return{
        drawer: true,
        showDialog : false,
        dialogMsg : '',
        menus :[],
      }
    },
    methods:{
      goLink(url){
        console.log(url);
        this.$router.push({name:url});
      }
    },
    mounted () {
      //this.$vuetify.theme.dark = true
      this.$axios.defaults.headers.common["token"] = "123";
          this.$axios.get("http://localhost:8081/api/v1/menus").then(ret=>{
          if(ret && ret.data.code == "success"){
            this.menus = ret.data.data
          }else{
            this.showDialog = true;
            this.dialogMsg = "获取菜单失败"
          }
        }).catch(err=>{
            this.showDialog = true;
            this.dialogMsg = "当前远程服务器没有响应，请联系管理员"+ err
        });
    }
}
</script>
