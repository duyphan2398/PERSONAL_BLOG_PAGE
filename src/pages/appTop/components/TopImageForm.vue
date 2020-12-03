<template>
  <a-card class="card-common">
    <div class="card-status-top bg-warning"></div>
    <div class="title" slot="title">
      <h3>{{ $t('title_app_top') }}</h3>
    </div>
    <div class="card-body">
      <div class="row">
        <div class="col-md-3 col-12 d-flex justify-content-center">
           <slot name="uploadImage"/>
        </div>
        <div class="col-md-9 col-12">
          <slot name="inputTitle"/>
          <slot name="inputDetail"/>
        </div>
      </div>

    </div>
  </a-card>
</template>

<script>
export default {
  name: 'TopImageForm'
}
</script>

<style scoped>

</style>
