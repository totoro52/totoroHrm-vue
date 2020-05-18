<template>
<div>
<v-dialog
      v-model="dialog"
      max-width="290"
      persistent=true
    >
      <v-card>
        <v-card-title class="headline">温馨提示</v-card-title>

        <v-card-text v-text="dialogMsg">
          
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            color="green darken-1"
            text
            @click="onClick"
          >
            确定
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    </div>
</template>

<script>
export default {


props:{
    dialog :{
        Type: Boolean,
    },
    dialogMsg :{
        Type: String
    }
},
methods:{
    onClick(){
        this.dialog = false;
        this.$emit("showDialog",false)
    }
}
}
</script>

