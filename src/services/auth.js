import router from '../router'
import Vue from 'vue'

export default {
    authenticated: false,

    forceRefreshLogin: function () {
        var params = {
            refresh_token: JSON.parse(localStorage.user).refresh_token,
            grant_type: 'refresh_token',
            client_id: '5a3662c1c8eeea39e8005171_29mf2nqlwsu8kkcsowskow08c08k0sk8wckw8ckgsoc4sgcocw',
            client_secret: 'ikyfgoc30lk400ccgg8ckcw4sswogkco4wo4wgsgw484o00o0'
        }
        Vue.http.post('oauth/v2/token', params, {emulateJSON: true}).then((data) => {
            localStorage.setItem('loginAt', new Date())
            localStorage.setItem('user', JSON.stringify(data.body))
            this.authenticated = true
            Vue.http.headers.common['Authorization'] = 'Bearer ' + data.body.access_token
        })
    },
    refreshLogin: function () {
        if (localStorage.loginAt === null || new Date().getTime() - new Date(localStorage.loginAt).getTime() < 2700000) { // 45 minutes * 60 secondes * 1000 milliseconds = 45 minutes in milliseconds
            return
        }
        this.forceRefreshLogin()
    },

    login: function (context, creds, redirect, callback) {
        var params = {
            username: creds.username,
            password: creds.password,
            grant_type: 'password',
            client_id: '5a3662c1c8eeea39e8005171_29mf2nqlwsu8kkcsowskow08c08k0sk8wckw8ckgsoc4sgcocw',
            client_secret: 'ikyfgoc30lk400ccgg8ckcw4sswogkco4wo4wgsgw484o00o0'
        };
        context.$http.post('oauth/v2/token', params, {emulateJSON: true}).then((data) => {
            localStorage.setItem('loginAt', new Date())
            localStorage.setItem('user', JSON.stringify(data.body))
            this.authenticated = true;
            Vue.http.headers.common['Authorization'] = 'Bearer ' + data.body.access_token;
            router.push('/')
        }, (errors) => {
            context.load = false
        })
    },

    register: function (context, user) {
        Vue.http.headers.common['Authorization'] = ''
        context.$http.post('user', user, {emulateJSON: true}).then((data) => {
            if (data.body.error.code === 103) {
                context.$parent.notify({
                    title: 'Erreur',
                    message: 'Votre mot de passe est invalide. (6 caractères minimum, dont 1 lettre et 1 chiffre)',
                    type: 'error'
                })
            } else if (data.body.error.code === 100) {
                context.$parent.notify({title: 'Erreur', message: 'Veuillez remplir tous les champs.', type: 'error'})
            } else if (data.body.error.code === 102) {
                context.$parent.notify({title: 'Erreur', message: 'Cette adresse e-mail est invalide.', type: 'error'})
            } else if (data.body.error.code === 201) {
                context.$parent.notify({
                    title: 'Erreur',
                    message: 'Cette adresse e-mail est déjà associée à un compte.',
                    type: 'error'
                })
            } else if (data.body.error.code !== 0) {
                context.$parent.notify({
                    title: 'Erreur',
                    message: 'Vérifiez vos informations. Si le problème persiste, contactez-nous.',
                    type: 'error'
                })
            } else {
                context.$parent.notify({
                    title: 'Bienvenue sur Captain Seller !',
                    message: 'Un e-mail vous a été envoyé afin de valider votre compte.',
                    type: 'success'
                })
            }
        }, (errors) => {
            context.$parent.notify({
                title: 'Erreur',
                message: 'Vérifiez votre connexion internet. Si le problème persiste, contactez-nous.',
                type: 'error'
            })
        })
    },

    logout: function () {
        localStorage.removeItem('user')
        localStorage.removeItem('loginAt')
        this.authenticated = false
    }
}
