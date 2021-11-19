import Vue from 'vue'
import VueRouter from 'vue-router'
import homeRouter from './home'
import seckillRouter from './seckill'
import shopCarRouter from './shopCar'
import otherRoute from './otherRoute'

Vue.use(VueRouter)

const routes = [
   ...homeRouter,
   ...seckillRouter,
   ...shopCarRouter,
   ...otherRoute,
   {
     path: '/person',
     component: () => import('@/pages/person'),
     meta: {
       title: '个人信息'
     }
   },
   {
     path: '*',
     component: () => import('@/pages/error/404.vue'),
     meta: {
       title: '404'
     }
   }
]

//解决点击路由跳转同名报错的问题
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

const router = new VueRouter({
  routes
})

VueRouter.prototype.goBack = function () {
  this.go(-1)
}

router.beforeEach((to,from,next) => {
  if(to.path !== '/person') {
    next()
  }else {
    console.log('验证处理')
    next()
  }
})

router.afterEach((to,from) => {
  document.title = to.meta.title || '淘宝网 - 淘！我喜欢'
})

export default router
