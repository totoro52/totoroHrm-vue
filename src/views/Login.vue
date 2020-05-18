<template>
<div class="login">
  <v-app id="inspire">
    <v-content>
      <v-container
        class="fill-height"
        fluid
        blue-grey darken-2
      >
        <v-row
          align="center"
          justify="center"
        >
          <v-col
            cols="12"
            sm="8"
            md="4"
          >
            <v-card class="elevation-12">
              <v-toolbar
                color="blue-grey darken-2"
                dark
                flat
              >
                <v-toolbar-title>Login form</v-toolbar-title>
                <v-spacer />
                <v-tooltip right>
                  <template v-slot:activator="{ on }">
                    <v-btn
                      icon
                      large
                      href="https://codepen.io/johnjleider/pen/pMvGQO"
                      target="_blank"
                      v-on="on"
                    >
                      <v-icon>mdi-code-tags</v-icon>
                    </v-btn>
                  </template>
                  <span>Codepen</span>
                </v-tooltip>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field
                    label="Login"
                    name="login"
                    prepend-icon="person"
                    type="text"
                    v-model="username"
                  />

                  <v-text-field
                    id="password"
                    label="Password"
                    name="password"
                    prepend-icon="lock"
                    type="password"
                    v-model="password"
                  />
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer />
                <v-btn block="block" dark color="blue-grey darken-2" @click="login">Login</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
  <Dialog :dialog="showDialog" :dialogMsg="dialogMsg" @showDialog="setDialog"></Dialog>
</div>
</template>





<script>
import dialog from '../components/Dialog.vue';
export default {
    name:"Login",
    components :{
      'Dialog' : dialog
    },
    data(){
        return {
        username : '123',
        password : '12322',
        showDialog : false,
        dialogMsg : ''
        }
    },
    methods:{
      login(){
        var postData = new URLSearchParams();
        postData.append('loginName',this.username);
        postData.append('password',this.password);
        this.$axios.post("http://localhost:8081/api/v1/login",postData).then(ret=>{
          if(ret && ret.data.code == "success"){
            localStorage.setItem("token",ret.data.data.token);
            this.showDialog = true;
            this.dialogMsg = "登录成功，欢迎回来"
            this.$router.push({name:'Index'})
          }else{
            this.showDialog = true;
            this.dialogMsg = "密码错误或用户不存在"
          }
        }).catch(err=>{
            this.showDialog = true;
            this.dialogMsg = "当前远程服务器没有响应，请联系管理员"+ err
        });
      },
      setDialog(showDialog){
        this.showDialog = showDialog;
      }
    }

}
</script>
