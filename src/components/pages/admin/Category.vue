<template>
  <div >
      <modal modalHeading="Add New Catgeory" :cond="showingAddModal" @modalClose="showingAddModal = false">
        <table>
          <tr>
            <td>Category Name</td>
            <td><input type="text" id="newcatname" v-model="newCat.name" placeholder="Catgeory Name"></td>
          </tr>
          <tr>
            <td>Category Description</td>
            <td><textarea type="text"  v-model="newCat.description" placeholder="Write short description"></textarea></td>
          </tr>
          <tr>
            <td></td>
            <td>
              <button class="btnSave" @click="addNewCategory">Save</button>
            </td>
          </tr>
        </table>
      </modal>

      <modal modalHeading="Update Catgeory" :cond="showingEditModal" @modalClose="showingEditModal = false">
        <table>
          <tr>
            <td>Category Name</td>
            <td><input type="text" id="newcatname" v-model="clickedCat.name" placeholder="Catgeory Name"></td>
          </tr>
          <tr>
            <td>Category Description</td>
            <td><textarea type="text"  v-model="clickedCat.description" placeholder="Write short description"></textarea></td>
          </tr>
          <tr>
            <td></td>
            <td>
              <button class="btnSave" @click="updateCategory">Update</button>
            </td>
          </tr>
        </table>
      </modal>

      <modal modalHeading="Are you sure?" :cond="showingDeleteModal" @modalClose="showingDeleteModal = false">
      <h2>You are going to delete the catgeory {{clickedCat.name}}</h2>
        <table>
          
          <tr>
            <td>
              <button class="btnSave" @click="deleteCategory">Yes</button>
            </td>
            <td>
              <button class="btnClose"  @click="showingDeleteModal = false">No</button>
            </td>
          </tr>
          
        </table>
      </modal>
    <h2 class="fleft">Category</h2>
    <button class="addBtn fright" @click="showingAddModal = true">Add New</button>
    <div class="clear"></div>
    <hr/>

  <table class="nice-table">
    <tr>
      <th>ID</th>
      <th>Name</th>
      <th>Description</th>
      <th>Edit</th>
      <th>Delete</th>
    </tr>
    <tr v-if="!categories.length"><td colspan="5">No data</td></tr>
    <tr v-else v-for="(cat,index) in categories" :key="cat.id">
      <td>{{index + 1}} </td>
      <td>{{cat.name}} </td>
      <td>{{cat.description}} </td>
      <td> <button class="edit" @click="showingEditModal = true; clickedCat=cat">Edit</button></td>
      <td> <button class="delete" @click="showingDeleteModal = true; clickedCat=cat">Delete</button></td>
    </tr>
  </table>

    </div>
    
</template>

<script>
export default {
  name: 'Category',
  data () {
    return {
        showingAddModal : false,
        showingEditModal : false,
        showingDeleteModal : false,
        newCat:{
          name:"",
          description:""
        },
        clickedCat:{
          id:"",
          name:"",
          description:""
        },
        categories:[],
    }
  },
  mounted(){
    this.init()
  },
  methods:{
    init(){
      this.$eventBus.$emit("loadingStatus",true);
      //   this.$axios.get("url").then(res=>{})
      
      var _this = this
      setTimeout(function () {
        _this.$eventBus.$emit("loadingStatus",false);
          var cat = localStorage.getItem("Category");
          if(cat && cat.length){
            cat = JSON.parse(cat)
          }else{
            cat = []
          }
          _this.categories = cat;
      },1000)
    },
    addNewCategory(){
      this.$eventBus.$emit("loadingStatus",true);
      //   this.$axios.post("url",this.newCat).then(res=>{})
      var _this = this
      setTimeout(function () {
          _this.$eventBus.$emit("loadingStatus",false);
          if(_this.newCat.name == "" || _this.newCat.description == ""){
              _this.$iziToast.error({
                  title: 'Error',
                  message: 'Please provide full details',
              });
          }else{
              var cat = localStorage.getItem("Category");
              if(cat && cat.length){
                cat = JSON.parse(cat)
                cat.push({"id":_this.$uniqid(),"name":_this.newCat.name,"description":_this.newCat.description})
              }else{
                cat = [
                  {"id":_this.$uniqid(),"name":_this.newCat.name,"description":_this.newCat.description}
                ]
              }
              cat = JSON.stringify(cat)
              localStorage.setItem("Category",cat);
              _this.newCat.name = "";
              _this.newCat.description = "";

              _this.$iziToast.success({
                  title: 'Success',
                  message: 'Category added successfully',
              });
              _this.init()
              _this.showingAddModal = false
          }
      },1000)
    },
    updateCategory(){
      this.$eventBus.$emit("loadingStatus",true);
      //   this.$axios.post("url",this.clickedCat).then(res=>{})
      var _this = this
      setTimeout(function () {
          _this.$eventBus.$emit("loadingStatus",false);
          if(_this.clickedCat.name == "" || _this.clickedCat.description == ""){
              _this.$iziToast.error({
                  title: 'Error',
                  message: 'Please provide full details',
              });
          }else{
              var cat = localStorage.getItem("Category");
              if(cat && cat.length){
                cat = JSON.parse(cat)
                var updated_cat = cat.filter((val)=>{
                  if(val.id == _this.clickedCat.id){
                    val.name = _this.clickedCat.name;
                    val.description = _this.clickedCat.description;
                  }
                  return val
                })
                updated_cat = JSON.stringify(updated_cat)
                localStorage.setItem("Category",updated_cat);
                _this.clickedCat.id = "";
                _this.clickedCat.name = "";
                _this.clickedCat.description = "";

                _this.$iziToast.success({
                    title: 'Success',
                    message: 'Category updated] successfully',
                });
                _this.init()
                _this.showingEditModal = false

              }else{
                _this.$iziToast.error({
                    title: 'Error',
                    message: 'Soemthing went wrong',
                });
              }
              
          }
      },1000)
    },
    deleteCategory(){
      this.$eventBus.$emit("loadingStatus",true);
      //   this.$axios.post("url",this.clickedCat).then(res=>{})
      var _this = this
      setTimeout(function () {
          _this.$eventBus.$emit("loadingStatus",false);
          if(_this.clickedCat.id == "" || _this.clickedCat.name == "" || _this.clickedCat.description == ""){
              _this.$iziToast.error({
                  title: 'Error',
                  message: 'Something went wrong',
              });
          }else{
              var cat = localStorage.getItem("Category");
              if(cat && cat.length){
                cat = JSON.parse(cat)
                var updated_cat = cat.filter((val)=>{
                  return val.id != _this.clickedCat.id
                })
                updated_cat = JSON.stringify(updated_cat)
                localStorage.setItem("Category",updated_cat);
                _this.clickedCat.id = "";
                _this.clickedCat.name = "";
                _this.clickedCat.description = "";

                _this.$iziToast.success({
                    title: 'Success',
                    message: 'Category deleted successfully',
                });
                _this.init()
                _this.showingDeleteModal = false

              }else{
                _this.$iziToast.error({
                    title: 'Error',
                    message: 'Soemthing went wrong',
                });
              }
              
          }
      },1000)
    }
  }
}
</script>

