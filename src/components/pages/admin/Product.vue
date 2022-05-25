<template>
  <div >
      <modal modalHeading="Add New Product" :cond="showingAddModal" @modalClose="showingAddModal = false">
        <table>
          <tr>
            <td>Product Name</td>
            <td><input type="text"  v-model="newProduct.name" placeholder="Product Name"></td>
          </tr>

          <tr>
            <td>Category</td>
            <td>
                <select v-model="newProduct.category">
                    <option value="">--Select One--</option>
                    <option v-for="(cat) in categories" :key="cat.id" :value="cat.id">{{cat.name}}</option>
                </select>
            </td>
          </tr>

          <tr>
            <td>Supplier</td>
            <td>
                <select v-model="newProduct.supplier">
                    <option value="">--Select One--</option>
                    <option v-for="(sup) in suppliers" :key="sup.id" :value="sup.id">{{sup.name}}</option>
                </select>
            </td>
          </tr>
          <tr>
            <td>Price</td>
            <td><input type="text"  v-model="newProduct.price" placeholder="Product Price">
            <label ><input type="checkbox" v-model="newProduct.negotiable" >Negotiable</label>
            </td>
          </tr>
          <tr>
            <td>Image</td>
            <td><input type="file" id="image" @change="onFileChange($event,'save')">
            </td>
          </tr>
          <tr>
            <td></td>
            <td>
                <progress :value="percent" max="100" v-if="percent !=0 && percent != 100"></progress>
                <span v-if="percent !=0 && percent != 100">{{percent}} %</span> <br><br>
                <img :src="newProduct.image" alt="NO image selected" class="thumbnile">
            </td>
          </tr>
          <tr>
            <td>Product Description</td>
            <td><textarea type="text"  v-model="newProduct.description" placeholder="Write short description"></textarea></td>
          </tr>
          <tr>
            <td></td>
            <td>
              <button class="btnSave" @click="addNewProduct">Save</button>
            </td>
          </tr>
        </table>
      </modal>

      <modal modalHeading="Update Product" :cond="showingEditModal" @modalClose="showingEditModal = false">
        <table>
          <tr>
            <td>Product Name</td>
            <td><input type="text"  v-model="clickedProduct.name" placeholder="Product Name"></td>
          </tr>

          <tr>
            <td>Category</td>
            <td>
                <select v-model="clickedProduct.category">
                    <option value="">--Select One--</option>
                    <option v-for="(cat) in categories" :key="cat.id" :value="cat.id">{{cat.name}}</option>
                </select>
            </td>
          </tr>

          <tr>
            <td>Supplier</td>
            <td>
                <select v-model="clickedProduct.supplier">
                    <option value="">--Select One--</option>
                    <option v-for="(sup) in suppliers" :key="sup.id" :value="sup.id">{{sup.name}}</option>
                </select>
            </td>
          </tr>
          <tr>
            <td>Price</td>
            <td><input type="text"  v-model="clickedProduct.price" placeholder="Product Price">
            <label ><input type="checkbox" v-model="clickedProduct.negotiable" >Negotiable</label>
            </td>
          </tr>
          <tr>
            <td>Image</td>
            <td><input type="file" id="image" @change="onFileChange($event,'edit')">
            </td>
          </tr>
          <tr>
            <td></td>
            <td>
                <progress :value="percent" max="100" v-if="percent !=0 && percent != 100"></progress>
                <span v-if="percent !=0 && percent != 100">{{percent}} %</span> <br><br>
                <img :src="clickedProduct.image" alt="NO image selected" class="thumbnile">
            </td>
          </tr>
          <tr>
            <td>Product Description</td>
            <td><textarea type="text"  v-model="clickedProduct.description" placeholder="Write short description"></textarea></td>
          </tr>
          <tr>
            <td></td>
            <td>
              <button class="btnSave" @click="updateProduct">Update</button>
            </td>
          </tr>
        </table>
      </modal>

      <modal modalHeading="Are you sure?" :cond="showingDeleteModal" @modalClose="showingDeleteModal = false">
      <h2>You are going to delete the Product {{clickedProduct.name}}</h2>
        <table>
          
          <tr>
            <td>
              <button class="btnSave" @click="deleteProduct">Yes</button>
            </td>
            <td>
              <button class="btnClose"  @click="showingDeleteModal = false">No</button>
            </td>
          </tr>
          
        </table>
      </modal>
    <h2 class="fleft">Product</h2>
    <button class="addBtn fright" @click="showingAddModal = true">Add New</button>
    <div class="clear"></div>
    <hr/>

  <table class="nice-table">
    <tr>
      <th>ID</th>
      <th>Name</th>
      <th>Category</th>
      <th>Supplier</th>
      <th>Price</th>
      <th>Image</th>
      <th>Description</th>
      <th>Edit</th>
      <th>Delete</th>
    </tr>
    <tr v-if="!products.length"><td colspan="5">No data</td></tr>
    <tr v-else v-for="(prod,index) in products" :key="prod.id">
      <td>{{index + 1}} </td>
      <td>{{prod.name}} </td>
      <td>{{CatName(prod.category)}} </td>
      <td>{{SupName(prod.supplier)}} </td>
      <td>{{prod.price}} </td>
      <td><img :src="prod.image" :alt="prod.name" class="thumbnileRed"> </td>
      <td>{{prod.description}} </td>
      <td> <button class="edit" @click="showingEditModal = true; clickedProduct=prod">Edit</button></td>
      <td> <button class="delete" @click="showingDeleteModal = true; clickedProduct=prod">Delete</button></td>
    </tr>
  </table>

    </div>
    
</template>

<script>
export default {
  name: 'Product',
  data () {
    return {
        baseUrl : "http://localhost:8080/static/img/",
        showingAddModal : false,
        showingEditModal : false,
        showingDeleteModal : false,
        newProduct:{
          name:"",
          description:"",
          category:"",
          supplier:"",
          price:0,
          negotiable:true,
          image:"http://localhost:8080/static/img/uploads/default.jpg"
        },
        clickedProduct:{
        },
        products:[],
        categories:[],
        suppliers:[],
        percent:0
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
          var prod = localStorage.getItem("Product");
          if(prod && prod.length){
            prod = JSON.parse(prod)
          }else{
            prod = []
          }
          _this.products = prod;

          var cat = localStorage.getItem("Category");
          if(cat && cat.length){
            cat = JSON.parse(cat)
          }else{
            cat = []
          }
          _this.categories = cat;

          var sup = localStorage.getItem("Supplier");
          if(sup && sup.length){
            sup = JSON.parse(sup)
          }else{
            sup = []
          }
          _this.suppliers = sup;
      },1000)
    },
    CatName(id){
      var cat = this.categories.filter((val)=>{
        if(val.id == id){
          return val
        }
      })
      if(cat){
        return cat[0].name
      }else{
        return ""
      }
    },
    SupName(id){
      var sup = this.suppliers.filter((val)=>{
        if(val.id == id){
          return val
        }
      })
      if(sup){
        return sup[0].name
      }else{
        return ""
      }
    },
    sleep(milliseconds) {
      return new Promise((resolve) => setTimeout(resolve, milliseconds));
    },
    async onFileChange(e,cond){
        while(this.percent <= 100){
            await this.sleep(300);
            this.percent += 10;
        }
        this.percent = 0
        
        const image = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(image);
        reader.onload = e =>{
          if(cond == "edit"){
            this.clickedProduct.image = e.target.result;
          }else{
            this.newProduct.image = e.target.result;
          }
        };


        // var _this= this;
        // var files = e.target.files || e.dataTransfers.files;
        // var file = files[0];
        // var fd = new FormData();
        // fd.append("fileToUpload",file,file.name)

        // this.$axios.post('https://api.imgur.com/3/image',fd,{
        //   onUploadProgress:function(uploadEvent){
        //       _this.percent = Math.round((uploadEvent.loaded/uploadEvent.total) * 100)
        //   }  
        // }).then(res=>{
        //     console.log(res);
        // }).catch(function (error) {
        //     if (error.response) {
        //         _this.$iziToast.error({
        //             title: 'Error',
        //             message: error.response.data.error,
        //         });
        //     } else if (error.request) {
        //         _this.$iziToast.error({
        //           title: 'Error',
        //           message: error.request,
        //         });
        //     } else {
        //         _this.$iziToast.error({
        //             title: 'Error',
        //             message: error.message,
        //         });
        //     }

        // });

    },
    addNewProduct(){
      this.$eventBus.$emit("loadingStatus",true);
      //   this.$axios.post("url",this.newCat).then(res=>{})
      var _this = this
      setTimeout(function () {
          _this.$eventBus.$emit("loadingStatus",false);
          if(_this.newProduct.name == "" || _this.newProduct.description == ""){
              _this.$iziToast.error({
                  title: 'Error',
                  message: 'Please provide name and description',
              });
          }else if(_this.newProduct.category == "" || _this.newProduct.supplier == ""){
              _this.$iziToast.error({
                  title: 'Error',
                  message: 'Please provide category and supplier',
              });
          }else if(_this.newProduct.price <= 0){
              _this.$iziToast.error({
                  title: 'Error',
                  message: 'Please provide proper price',
              });
          }else{
              var prod = localStorage.getItem("Product");
              if(prod && prod.length){
                prod = JSON.parse(prod)
                prod.push({"id":_this.$uniqid(),"name":_this.newProduct.name,"description":_this.newProduct.description,
                "category":_this.newProduct.category,"supplier":_this.newProduct.supplier,"price":_this.newProduct.price,"image":_this.newProduct.image})
              }else{
                prod = [
                  {"id":_this.$uniqid(),"name":_this.newProduct.name,"description":_this.newProduct.description,
                "category":_this.newProduct.category,"supplier":_this.newProduct.supplier,"price":_this.newProduct.price,"image":_this.newProduct.image}
                ]
              }
              prod = JSON.stringify(prod)
              localStorage.setItem("Product",prod);
              _this.newProduct.name = "";
              _this.newProduct.description = "";
              _this.newProduct.category = "";
              _this.newProduct.supplier = "";
              _this.newProduct.price = 0;
              _this.newProduct.image = "http://localhost:8080/static/img/uploads/default.jpg"

              _this.$iziToast.success({
                  title: 'Success',
                  message: 'Product added successfully',
              });
              _this.init()
              _this.showingAddModal = false
          }
      },1000)
    },
    updateProduct(){
      this.$eventBus.$emit("loadingStatus",true);
      //   this.$axios.post("url",this.clickedCat).then(res=>{})
      var _this = this
      setTimeout(function () {
          _this.$eventBus.$emit("loadingStatus",false);
          if(_this.clickedProduct.name == "" || _this.clickedProduct.description == ""){
              _this.$iziToast.error({
                  title: 'Error',
                  message: 'Please provide name and description',
              });
          }else if(_this.clickedProduct.category == "" || _this.clickedProduct.supplier == ""){
              _this.$iziToast.error({
                  title: 'Error',
                  message: 'Please provide category and supplier',
              });
          }else if(_this.clickedProduct.price <= 0){
              _this.$iziToast.error({
                  title: 'Error',
                  message: 'Please provide proper price',
              });
          }else{
              var prod = localStorage.getItem("Product");
              if(prod && prod.length){
                prod = JSON.parse(prod)
                var updated_prod = prod.filter((val)=>{
                  if(val.id == _this.clickedProduct.id){
                    val.name = _this.clickedProduct.name;
                    val.description = _this.clickedProduct.description;
                    val.category = _this.clickedProduct.category;
                    val.supplier = _this.clickedProduct.supplier;
                    val.price = _this.clickedProduct.price;
                    val.image = _this.clickedProduct.image;
                  }
                  return val
                })
                updated_prod = JSON.stringify(updated_prod)
                localStorage.setItem("Product",updated_prod);
                _this.clickedProduct.id = "";
                _this.clickedProduct.name = "";
                _this.clickedProduct.description = "";
                _this.clickedProduct.category = "";
                _this.clickedProduct.supplier = "";
                _this.clickedProduct.price = "";
                _this.clickedProduct.image = "";

                _this.$iziToast.success({
                    title: 'Success',
                    message: 'Product updated successfully',
                });
                _this.init()
                _this.showingEditModal = false

              }else{
                _this.$iziToast.error({
                    title: 'Error',
                    message: 'Something went wrong',
                });
              }
              
          }
      },1000)
    },
    deleteProduct(){
      this.$eventBus.$emit("loadingStatus",true);
      //   this.$axios.post("url",this.clickedCat).then(res=>{})
      var _this = this
      setTimeout(function () {
          _this.$eventBus.$emit("loadingStatus",false);
          if(_this.clickedProduct.id == "" || _this.clickedProduct.name == "" || _this.clickedProduct.description == ""){
              _this.$iziToast.error({
                  title: 'Error',
                  message: 'Something went wrong',
              });
          }else{
              var prod = localStorage.getItem("Product");
              if(prod && prod.length){
                prod = JSON.parse(prod)
                var updated_prod = prod.filter((val)=>{
                  return val.id != _this.clickedProduct.id
                })
                updated_prod = JSON.stringify(updated_prod)
                localStorage.setItem("Product",updated_prod);
                _this.clickedProduct.id = "";
                _this.clickedProduct.name = "";
                _this.clickedProduct.description = "";
                _this.clickedProduct.category = "";
                _this.clickedProduct.supplier = "";
                _this.clickedProduct.price = "";
                _this.clickedProduct.image = "";

                _this.$iziToast.success({
                    title: 'Success',
                    message: 'Product deleted successfully',
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

