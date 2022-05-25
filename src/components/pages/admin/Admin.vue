<template>
  <div class="admin">
    <div id="header">
        <h1 class="fleft">Ecommerce Project</h1>
        <a  class="fright" @click="logout()">Logout</a>
    </div>
    <div id="sidebar">
        <ul class="nav">
            <li>
                <router-link to="/admin/category">Category</router-link>
                <router-link to="/admin/supplier">Supplier</router-link>
                <router-link to="/admin/product">Product</router-link>
            </li>
        </ul>
    </div>
    
    <div id="main">
        <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Admin',
  data () {
    return {
    }
  },
  mounted(){
      var token = localStorage.getItem("token")
      if(!token){
          this.$router.push({name:"Login"})
      }
  },
  methods:{
      logout(){
          localStorage.setItem("token","")
          this.$router.push({name:"Login"})
      }
  }
}
</script>

