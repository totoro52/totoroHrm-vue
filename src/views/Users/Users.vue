<template>
<div class="Users">
 <v-row>
   <v-col cols="12">
<v-card
  class="mx-auto"
  outlined
>
<v-card-text>
    <v-row 
      justify="center"
      align="center">
        <v-col cols="4" >
        <v-text-field
        label="请输入你要搜索的账号"
        v-model="queryUser"
        ></v-text-field>
        </v-col>
        <v-col cols="4" > 
        <v-btn dark  style="margin-right:5px" color="primary" @click="queryUsers()">搜索</v-btn>
        <v-btn   color="error">高级搜索</v-btn>
        </v-col>
        </v-row>
</v-card-text>
</v-card>
   </v-col>
   <v-col cols="12">
<v-card
  class="mx-auto"
  outlined
>
    <v-simple-table >
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-left">ID</th>
          <th class="text-left">登录账号</th>
          <th class="text-left">登录密码</th>
          <th class="text-left">账号状态</th>
          <th class="text-left">添加时间</th>
          <th class="text-left">账号名称</th>
          <th class="text-left">相关操作</th>
        </tr>
      </thead>
      <tbody>

        <tr :index="index" v-for="(user,index) in users" :key="user.id">
          <td>{{ user.id }}</td>
          <td>{{ user.loginName }}</td>
          <td>{{ user.password }}</td>
          <td>{{ user.status }}</td>
          <td>{{ user.createDate }}</td>
          <td>{{ user.userName }}</td>
          <td>
            <v-btn small dark color="primary" @click.stop="updateUserDialog(index)">更新</v-btn>
            &nbsp;&nbsp;&nbsp;
            <v-btn small dark color="error" @click="deleteUser(user.id)">删除</v-btn></td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
</v-card>
    <v-pagination
      v-model="page"
      :length="pages.totalPages"
    ></v-pagination>
  <Dialog :dialog="showDialog" :dialogMsg="dialogMsg" @showDialog="setDialog"></Dialog>
  <template>
    <v-dialog v-model="showEditDialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">修改用户</span>
        </v-card-title>
        <v-card-text>
  <v-form
    ref="form"
    lazy-validation
  >
    <v-text-field
      v-model="editUser.loginName"
      :counter="10"
      :rules="[v => !!v || 'Item is required']"
      label="登录用户名"
      required
    ></v-text-field>

    <v-text-field
      v-model="editUser.password"
      :counter="16"
      :rules="[v => !!v || 'Item is required']"
      label="登录密码"
      required
    ></v-text-field>

    <v-text-field
      v-model="editUser.userName"
      :counter="10"
      :rules="[v => !!v || 'Item is required']"
      label="用户昵称"
      required
    ></v-text-field>

    <v-select
      v-model="editUser.status"
      :items="selects"
      item-text="name"
      item-value="status"
      :rules="[v => !!v || 'Item is required']"
      label="用户类型"
      required
    ></v-select>
  </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="showEditDialog=false">取消</v-btn>
          <v-btn color="blue darken-1" text @click="editUsers()">保存</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </template>
   </v-col>
 </v-row>
</div>
</template>





<script>
import dialog from '../../components/Dialog.vue';
export default {
    name:"users",
    data(){
        return{
            items: [
                {
                    text: 'Dashboard',
                    disabled: false,
                    href: '/',
                },
                {
                    text: 'Users',
                    disabled: true,
                    href: '',
                },
                ],
            users : [],
            pages : {},
            showDialog : false,
            dialogMsg : '',
            pageSize:10,
            page : 1,
            queryUser: '',
            showEditDialog: false,
            selects: [
              {name:"普通用户",status: 1},
              {name:"超级管理员",status: 2},
            ],
            editUser : {
            },

        }
    },
    components:{
        "Dialog" : dialog
    },
    methods:{

        /**
         * 删除用户
         */
        deleteUser(id){
            this.$axios.delete("http://localhost:8081/api/v1/users/"+id).then(ret=>{
                if(ret && ret.data.code == "success"){
                    console.log(ret.data);
                    this.showDialog = true;
                    this.dialogMsg = "删除用户成功"
                    this.showUsers();
                    }else{
                    this.showDialog = true;
                    this.dialogMsg = "删除用户失败"
                    }
                    }).catch(err=>{
                        console.log(err);
                        this.showDialog = true;
                        this.dialogMsg = "当前远程服务器没有响应，请联系管理员"+ err
        });
        },


        updateUserDialog(id){
          this.editUser = this.users[id];
          this.showEditDialog = true;
        },


        /**
         * 刷新用户
         */
        showUsers(){
          this.$axios.get("http://localhost:8081/api/v1/users?page=" + this.page + "&pageSize=" + this.pageSize).then(ret=>{
          if(ret && ret.data.code == "success"){
            this.users = ret.data.data[1]
            this.pages = ret.data.data[0]
          }else{
           console.log('获取用户失败');
          }
        }).catch(err=>{
            console.log('获取用户失败' + err);
        });
        },


        /**
         * 修改用户
         */
        editUsers(){
            if(!this.$refs.form.validate()) return;
            var postData = new URLSearchParams();
            postData.append('loginName',this.editUser.loginName);
            postData.append('password',this.editUser.password);
            postData.append('status',this.editUser.status);
            postData.append('userName',this.editUser.userName);
            this.$axios.put("http://localhost:8081/api/v1/users/"+this.editUser.id,postData).then(ret=>{
            if(ret && ret.data.code == "success"){
                this.showDialog = true;
                this.dialogMsg = "修改用户成功"
            }else{
                this.showDialog = true;
                this.dialogMsg = "修改用户失败"
            }
            }).catch(err=>{
                this.showDialog = true;
                this.dialogMsg = "当前远程服务器没有响应，请联系管理员"+ err
            });
        },


        /**
         * 查找用户
         */
        queryUsers(){
          var postData = new URLSearchParams();
          postData.append('loginName',this.queryUser);
          postData.append('page',this.page);
          postData.append('pageSize',this.pageSize);
          this.$axios.post("http://localhost:8081/api/v1/users/query",postData).then(ret=>{
          if(ret && ret.data.code == "success"){
            this.users = ret.data.data[1];
            this.pages = ret.data.data[0];
          }else{
              this.showDialog = true;
              this.dialogMsg = "查找用户失败"
          }
          }).catch(err=>{
              this.showDialog = true;
              this.dialogMsg = "当前远程服务器没有响应，请联系管理员"+ err
          });
        },


        /**
         * 设置提示框属性
         */
        setDialog(showDialog){
            this.showDialog = showDialog;
        }
    },

    watch:{
      page(){
        this.showUsers();
      }
    },
    mounted () {
        this.showUsers();
    }
}
</script>
