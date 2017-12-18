<template>
    <div id="Login" class="component-content">
        <div class="account-user-sec">
            <div class="account-sec">
                <div class="account-top-bar">
                    <div class="container">
                        <div class="logo">
                            Super Cars
                        </div>
                    </div>
                </div>
                <div class="acount-sec">
                    <div class="container">
                        <div class="row">
                            <div class="col-md-8" style="margin: auto; float: none;">
                                <div class="contact-sec">
                                    <div class="row top-marged">
                                        <div class="col-md-6">
                                            <div class="widget-title">
                                                <h3>Connexion</h3>
                                                <span>Connectez-vous à votre espace utilisateur</span>
                                            </div><!-- Widget title -->
                                            <div class="account-form">
                                                <form @submit.prevent="login">
                                                    <div class="row">
                                                        <div class="feild col-md-12">
                                                            <input type="text" v-model="username" placeholder="Username">
                                                        </div>
                                                        <div class="feild col-md-12">
                                                            <input type="password" v-model="password" placeholder="Mot de passe">
                                                        </div>
                                                        <div class="feild col-md-12">
                                                            <input v-if="!load" type="submit" value="Connexion" />
                                                            <input v-else type="submit" value="Chargement..." disabled />
                                                        </div>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div><!-- Account Sec -->
        </div>
    </div>
</template>

<script>
    import Auth from '@/services/auth'
    import jQuery from 'jquery'

    export default {
        name: 'Login',
        data () {
            return {
                username: '',
                password: '',
                confirm: false,
                load: false
            }
        },
        methods: {
            login: function () {
                this.load = true
                jQuery('.notify').css('display', 'block')
                Auth.login(this, {username: this.username, password: this.password}, this.$route.query.redirect ? this.$route.query.redirect : '/')
            },
            close: function () {
                jQuery('.notify').slideUp()
            }
        },
        mounted: function () {

        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>