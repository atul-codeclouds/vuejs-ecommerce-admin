<template>
  <div >
      <modal modalHeading="Add New Supplier" :cond="showingAddModal" @modalClose="showingAddModal = false">
        <table>
          <tr>
            <td>Supplier Name</td>
            <td><input type="text"  v-model="newSupplier.name" placeholder="Supplier Name"></td>
          </tr>
          <tr>
            <td>Supplier Description</td>
            <td><textarea type="text"  v-model="newSupplier.description" placeholder="Write short description"></textarea></td>
          </tr>
          <tr>
            <td></td>
            <td>
              <button class="btnSave" @click="addNewSupplier">Save</button>
            </td>
          </tr>
        </table>
      </modal>

      <modal modalHeading="Update Supplier" :cond="showingEditModal" @modalClose="showingEditModal = false">
        <table>
          <tr>
            <td>Supplier Name</td>
            <td><input type="text"  v-model="clickedSupplier.name" placeholder="Supplier Name"></td>
          </tr>
          <tr>
            <td>Supplier Description</td>
            <td><textarea type="text"  v-model="clickedSupplier.description" placeholder="Write short description"></textarea></td>
          </tr>
          <tr>
            <td></td>
            <td>
              <button class="btnSave" @click="updateSupplier">Update</button>
            </td>
          </tr>
        </table>
      </modal>

      <modal modalHeading="Are you sure?" :cond="showingDeleteModal" @modalClose="showingDeleteModal = false">
      <h2>You are going to delete the supplier {{clickedSupplier.name}}</h2>
        <table>
          
          <tr>
            <td>
              <button class="btnSave" @click="deleteSupplier">Yes</button>
            </td>
            <td>
              <button class="btnClose"  @click="showingDeleteModal = false">No</button>
            </td>
          </tr>
          
        </table>
      </modal>
    <h2 class="fleft">Supplier</h2>
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
    <tr v-if="!suppliers.length"><td colspan="5">No data</td></tr>
    <tr v-else v-for="(sup,index) in suppliers" :key="sup.id">
      <td>{{index + 1}} </td>
      <td>{{sup.name}} </td>
      <td>{{sup.description}} </td>
      <td> <button class="edit" @click="showingEditModal = true; clickedSupplier=sup">Edit</button></td>
      <td> <button class="delete" @click="showingDeleteModal = true; clickedSupplier=sup">Delete</button></td>
    </tr>
  </table>

    </div>
    
</template>

<script>
export default {
  name: 'Supplier',
  data () {
    return {
        showingAddModal : false,
        showingEditModal : false,
        showingDeleteModal : false,
        newSupplier:{
          name:"",
          description:""
        },
        clickedSupplier:{
          id:"",
          name:"",
          description:""
        },
        suppliers:[],
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
          var sup = localStorage.getItem("Supplier");
          if(sup && sup.length){
            sup = JSON.parse(sup)
          }else{
            sup = []
          }
          _this.suppliers = sup;
      },1000)
    },
    addNewSupplier(){
      this.$eventBus.$emit("loadingStatus",true);
      //   this.$axios.post("url",this.newCat).then(res=>{})
      var _this = this
      setTimeout(function () {
          _this.$eventBus.$emit("loadingStatus",false);
          if(_this.newSupplier.name == "" || _this.newSupplier.description == ""){
              _this.$iziToast.error({
                  title: 'Error',
                  message: 'Please provide full details',
              });
          }else{
              var sup = localStorage.getItem("Supplier");
              if(sup && sup.length){
                sup = JSON.parse(sup)
                sup.push({"id":_this.$uniqid(),"name":_this.newSupplier.name,"description":_this.newSupplier.description})
              }else{
                sup = [
                  {"id":_this.$uniqid(),"name":_this.newSupplier.name,"description":_this.newSupplier.description}
                ]
              }
              sup = JSON.stringify(sup)
              localStorage.setItem("Supplier",sup);
              _this.newSupplier.name = "";
              _this.newSupplier.description = "";

              _this.$iziToast.success({
                  title: 'Success',
                  message: 'Supplier added successfully',
              });
              _this.init()
              _this.showingAddModal = false
          }
      },1000)
    },
    updateSupplier(){
      this.$eventBus.$emit("loadingStatus",true);
      //   this.$axios.post("url",this.clickedCat).then(res=>{})
      var _this = this
      setTimeout(function () {
          _this.$eventBus.$emit("loadingStatus",false);
          if(_this.clickedSupplier.name == "" || _this.clickedSupplier.description == ""){
              _this.$iziToast.error({
                  title: 'Error',
                  message: 'Please provide full details',
              });
          }else{
              var sup = localStorage.getItem("Supplier");
              if(sup && sup.length){
                sup = JSON.parse(sup)
                var updated_sup = sup.filter((val)=>{
                  if(val.id == _this.clickedSupplier.id){
                    val.name = _this.clickedSupplier.name;
                    val.description = _this.clickedSupplier.description;
                  }
                  return val
                })
                updated_sup = JSON.stringify(updated_sup)
                localStorage.setItem("Supplier",updated_sup);
                _this.clickedSupplier.id = "";
                _this.clickedSupplier.name = "";
                _this.clickedSupplier.description = "";

                _this.$iziToast.success({
                    title: 'Success',
                    message: 'Supplier updated successfully',
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
    deleteSupplier(){
      this.$eventBus.$emit("loadingStatus",true);
      //   this.$axios.post("url",this.clickedCat).then(res=>{})
      var _this = this
      setTimeout(function () {
          _this.$eventBus.$emit("loadingStatus",false);
          if(_this.clickedSupplier.id == "" || _this.clickedSupplier.name == "" || _this.clickedSupplier.description == ""){
              _this.$iziToast.error({
                  title: 'Error',
                  message: 'Something went wrong',
              });
          }else{
              var sup = localStorage.getItem("Supplier");
              if(sup && sup.length){
                sup = JSON.parse(sup)
                var updated_sup = sup.filter((val)=>{
                  return val.id != _this.clickedSupplier.id
                })
                updated_sup = JSON.stringify(updated_sup)
                localStorage.setItem("Supplier",updated_sup);
                _this.clickedSupplier.id = "";
                _this.clickedSupplier.name = "";
                _this.clickedSupplier.description = "";

                _this.$iziToast.success({
                    title: 'Success',
                    message: 'Supplier deleted successfully',
                });
                _this.init()
                _this.showingDeleteModal = false

              }else{
                _this.$iziToast.error({
                    title: 'Error',
                    message: 'Something went wrong',
                });
              }
              
          }
      },1000)
    }
  }
}
</script>

