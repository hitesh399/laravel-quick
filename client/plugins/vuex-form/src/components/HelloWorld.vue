<template>
  <div class="hello">
    <h1>{{ msg }}</h1>

   <text-form form-name="textform" ></text-form>
  </div>
</template>

<script>
import TextForm from './examples/text/TextForm'

export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  components: {
    TextForm
  }
}
</script>


