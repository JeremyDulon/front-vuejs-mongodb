import Vue from 'vue'
import Router from 'vue-router'
import Auth from '@/services/auth'
import Login from '@/components/Login'
import CarBrands from '@/components/CarBrands'

Vue.use(Router)

let router = new Router({
    history: true,
    hashbang: true,
    saveScrollPosition: true,
    transitionOnLoad: true,
    routes: [
        {
            path: '/',
            name: 'cars',
            component: CarBrands
        },{
            path: '/login',
            name: 'login',
            component: Login
        },{
            path: '*',
            redirect: function () {
                if (localStorage.user) {
                    return {name: 'cars'}
                } else {
                    return {name: 'login'}
                }
            }
        }
    ]
});

router.beforeEach((to, from, next) => {
    if (localStorage.user) {
        Auth.refreshLogin()
        this.user = JSON.parse(localStorage.user)
        Vue.http.headers.common['Authorization'] = 'Bearer ' + this.user.access_token
        Auth.authenticated = true
        if(to.name === 'login') {
            next({
                name: "cars"
            })
        }
    }

    if (!Auth.authenticated && to.name !== 'login') {
        // if route requires auth and user isn't authenticated
        next({
            name: 'login',
            query: { redirect: to.fullPath }
        })
    } else {
        next()
    }
})

export default router
