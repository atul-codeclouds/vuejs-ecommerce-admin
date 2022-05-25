<template>
  <div class="login">
    <div class="loginHeader">
        User Login
    </div>
    <div class="loginContainer">
        <table>
            <tr>
                <td>
                    Username
                </td>
                <td>:</td>
                <td> <input type="text" placeholder="Username" v-model="user.username"> </td>
            </tr>
            <tr>
                <td>
                    Password
                </td>
                <td>:</td>
                <td> <input type="password" placeholder="Password"  v-model="user.password"> </td>
            </tr>

            <tr>
                <td>
                    
                </td>
                <td></td>
                <td> <button class="addBtn" @click="loginNow()">Login</button> </td>
            </tr>
        </table>
    </div>    
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      user:{
          username:"",
          password:""
      }
    }
  },
  mounted(){
      var token = localStorage.getItem("token")
      if(token){
          this.$router.push({name:"Category"})
      }
  },
  methods:{
      loginNow(){
          this.$eventBus.$emit("loadingStatus",true);

        //   this.$axios.post("url",this.user).then(res=>{})
        var _this = this
        setTimeout(function () {
            _this.$eventBus.$emit("loadingStatus",false);
            if(_this.user.username == "" || _this.user.password == ""){
                _this.$iziToast.error({
                    title: 'Error',
                    message: 'Please provide full details',
                });
            }else{
                 localStorage.setItem("token",_this.$uniqid())
                _this.$router.push({name:"Admin"})
            }
        },1000)
      }
  }
}
</script>

