<template>
  <ErrorContent :code="429"/>
</template>

<script>
import ErrorContent from '@/components/ErrorContent'

export default {
  name: 'Error429',
  components: { ErrorContent }
}
</script>

<style scoped>

</style>
