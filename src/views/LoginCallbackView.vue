
<template>
    <div>
    </div>
</template>
  
<script>
import { mapActions } from 'pinia'
import { useUser } from '../store'

export default {
    name: 'LoginCallback',
    methods: {
    ...mapActions(useUser, ['completeLogin'])
    },
    mounted() {
        this.completeLogin(location.href)
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