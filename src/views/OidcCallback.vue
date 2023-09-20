
<template>
    <div>
    </div>
</template>
  
<script>
import { mapActions } from 'pinia'
import useOidc from '../store'

export default {
    name: 'OidcCallback',
    methods: {
    ...mapActions(useOidc, ['oidcSignInCallback'])
    },
    mounted() {
        this.oidcSignInCallback(location.href)
            .then((redirectPath) => {
                this.$router.push(redirectPath)
            })
            .catch((err) => {
                console.error(err)
                this.$router.push('/oidc-callback-error') // Handle errors any way you want
            })
    }
}
</script>