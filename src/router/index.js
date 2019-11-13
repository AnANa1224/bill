import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../views/Index.vue'
import Infor from '../views/Infor/Infor.vue'
import Mes from '../views/Infor/InforMes.vue'
import Safe from '../views/Infor/Safe.vue'
import EditName from '../views/Infor/EditNickname.vue'
import EditAvatar from '../views/Infor/EditAvatar.vue'
import Mobile from '../views/Infor/Mobile.vue'
import EditPwd from '../views/Infor/EditPwd.vue'
import Account from '../views/Infor/Account.vue'
import AddAccount from '../views/Infor/AddAccount.vue'
import EditAccount from '../views/Infor/EditAccount.vue'
import Login from '../views/Login/Login.vue'
import Register from '../views/Login/Register.vue'
import ForgetPwd from '../views/Login/ForgetPwd.vue'
import Record from '../views/Record/Index.vue'
import Category from '../views/Record/Category.vue'
import AddCate from '../views/Record/AddCate.vue'
import EditCate from '../views/Record/EditCate.vue'
import CreateRecord from '../views/Record/CreateRecord.vue'
import Detail from '../views/Record/Detail.vue'
import Detailed from '../views/Record/Detailed.vue'
import AppendRecord from '../views/Record/AppendRecord.vue'
import AppendRecordDetail from '../views/Record/AppendRecordDetail.vue'
import RecordTable from '../views/Record/RecordTable.vue'
import Books from '../views/Infor/Books.vue'
import AddBooks from '../views/Infor/AddBooks.vue'
import BookDetail from '../views/Infor/BookDetail.vue'
import AddMember from '../views/Infor/AddMember.vue'
import Feedback from '../views/Infor/Feedback.vue'

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'index',
    component: Index
  },
  {
    path: '/index',
    name: 'index',
    component: Index
  },
  {
    path: '/infor',
    name: 'infor',
    component: Infor
  },
  {
    path: '/Infor/mes',
    name: 'mes',
    component: Mes
  },
  {
    path: '/Infor/safe',
    name: 'safe',
    component: Safe
  },
  {
    path: '/Infor/editName',
    name: 'editName',
    component: EditName
  },
  {
    path: '/Infor/editAvatar',
    name: 'editAvatar',
    component: EditAvatar
  },
  {
    path: '/Infor/mobile',
    name: 'mobile',
    component: Mobile
  },
  {
    path: '/Infor/editPwd',
    name: 'editPwd',
    component: EditPwd
  },
  {
    path: '/Infor/account',
    name: 'account',
    component: Account
  },
  {
    path: '/Infor/addAccount',
    name: 'addAccount',
    component: AddAccount
  },
  {
    path: '/recordTable',
    name: 'recordTable',
    component: RecordTable
  },
  {
    path: '/Infor/editAccount',
    name: 'editAccount',
    component: EditAccount
  },
  {
    path: '/Login',
    name: 'login',
    component: Login
  },
  {
    path: '/Login/register',
    name: 'register',
    component: Register
  },
  {
    path: '/Login/forgetPwd',
    name: 'forgetPwd',
    component: ForgetPwd
  },
  {
    path: '/record',
    name: 'record',
    component: Record
  },
  {
    path: '/Record/category',
    name: 'category',
    component: Category
  },
  {
    path: '/Record/addCate',
    name: 'addCate',
    component: AddCate
  },
  {
    path: '/Record/editCate',
    name: 'editCate',
    component: EditCate
  },
  {
    path: '/Record/createRecord',
    name: 'createRecord',
    component: CreateRecord
  },
  {
    path: '/Record/detail',
    name: 'detail',
    component: Detail
  },
  {
    path: '/Record/detailed',
    name: 'detailed',
    component: Detailed
  },
  {
    path: '/Record/appendRecord',
    name: 'appendRecord',
    component: AppendRecord
  },
  {
    path: '/Record/appendRecordDetail',
    name: 'appendRecordDetail',
    component: AppendRecordDetail
  },
  {
    path: '/Infor/books',
    name: 'books',
    component: Books
  },
  {
    path: '/Infor/addBooks',
    name: 'addBooks',
    component: AddBooks
  },
  {
    path: '/Infor/bookDetail',
    name: 'bookDetail',
    component: BookDetail
  },
  {
    path: '/Infor/addMember',
    name: 'addMember',
    component: AddMember
  },
  {
    path: '/Infor/feedback',
    name: 'feedback',
    component: Feedback
  },
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  routes
})

export default router
