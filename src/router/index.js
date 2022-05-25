import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Login from '@/components/pages/Login'
import Admin from '@/components/pages/admin/Admin'
import Category from '@/components/pages/admin/Category'
import Supplier from '@/components/pages/admin/Supplier'
import Product from '@/components/pages/admin/Product'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      redirect:{name:'Login'}
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/admin',
      name: 'Admin',
      component: Admin,
      redirect:{name:'Category'},
      children:[
        {
          path: 'category',
          name: 'Category',
          component: Category
        },
        {
          path: 'supplier',
          name: 'Supplier',
          component: Supplier
        },
        {
          path: 'product',
          name: 'Product',
          component: Product
        },
      ]
    }
  ],

  mode: "history"
})
