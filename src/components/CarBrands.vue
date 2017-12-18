<template>
    <div id="CarBrands" class="component-content">
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
                                <div v-for="carBrand in carsBrand">
                                    {{ carBrand }}
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
        name: 'CarBrands',
        data () {
            return {
                carsBrands: []
            }
        },
        methods: {
//            login: function () {
//                this.load = true
//                jQuery('.notify').css('display', 'block')
//                Auth.login(this, {username: this.username, password: this.password}, this.$route.query.redirect ? this.$route.query.redirect : '/')
//            },
//            close: function () {
//                jQuery('.notify').slideUp()
//            }
        },
        mounted: function () {
            console.log(this)
            this.$http.get('/cars', {}, {emulateJSON: true}).then((data) => {
              this.carBrands = data.cars;
            })
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>