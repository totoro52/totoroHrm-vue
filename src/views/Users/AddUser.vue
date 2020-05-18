<template>
    <div class="AddUser">
        <v-breadcrumbs :items="items"></v-breadcrumbs>
        <v-card
        class="mx-auto"
        outlined
        style="padding:20px"
        >
    <v-form
    ref="form"
    lazy-validation
  >
    <v-text-field
      v-model="longname"
      :counter="10"
      :rules="[v => !!v || 'Item is required']"
      label="登录用户名"
      required
    ></v-text-field>

    <v-text-field
      v-model="password"
      :counter="16"
      :rules="[v => !!v || 'Item is required']"
      label="登录密码"
      required
    ></v-text-field>


    <v-text-field
      v-model="createdate"
      :counter="30"
      :rules="[v => !!v || 'Item is required']"
      label="添加时间"
      required
    ></v-text-field>

    <v-text-field
      v-model="username"
      :counter="10"
      :rules="[v => !!v || 'Item is required']"
      label="用户昵称"
      required
    ></v-text-field>

    <v-select
      v-model="select"
      :items="selects"
      item-text="name"
      item-value="status"
      :rules="[v => !!v || 'Item is required']"
      label="用户类型"
      required
    ></v-select>

    <v-btn
      color="success"
      class="mr-4"
      @click="AddUser"
    >
      添加用户
    </v-btn>
  </v-form>
</v-card>
<Dialog :dialog="showDialog" :dialogMsg="dialogMsg" @showDialog="setDialog"></Dialog>
    </div>
</template>

<script>
import dialog from '../../components/Dialog.vue';
export default {
    name:'addUser',
    components:{
        "Dialog" : dialog
    },
    data(){
        return{
            showDialog : false,
            dialogMsg : '',
            items: [
                {
                    text: 'Dashboard',
                    disabled: false,
                    href: '/',
                },
                {
                    text: 'AddUser',
                    disabled: true,
                    href: '',
                },
                ],
            select : '',
            longname : '',
            password : '',
            createdate : '',
            username : '',
            selects: [
                {name:"普通用户",status: 1},
                {name:"超级管理员",status: 2},
                ],
            users : [],
        }
    },
    methods:{
        /**
         * 设置提示框属性
         */
        setDialog(showDialog){
            this.showDialog = showDialog;
        },

        /**
         * 添加用户
         */
        AddUser(){
            if(!this.$refs.form.validate()) return;
            var postData = new URLSearchParams();
            postData.append('loginName',this.username);
            postData.append('password',this.password);
            postData.append('createDate',this.createdate);
            postData.append('status',this.select);
            postData.append('userName',this.username);
            this.$axios.post("http://localhost:8081/api/v1/users",postData).then(ret=>{
            if(ret && ret.data.code == "success"){
                this.showDialog = true;
                this.dialogMsg = "添加成功"
            }else{
                this.showDialog = true;
                this.dialogMsg = "添加失败"
            }
            }).catch(err=>{
                this.showDialog = true;
                this.dialogMsg = "当前远程服务器没有响应，请联系管理员"+ err
            });
        }


    }
}
</script>
