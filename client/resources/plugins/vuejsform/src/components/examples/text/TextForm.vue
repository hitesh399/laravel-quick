<template>
	<div>
	  <h1> Text Element Examples</h1>

	  	<lq-text :form-name="formName" name="0.name" ></lq-text>
	  	<lq-text :form-name="formName" name="0.password" ></lq-text>

	  	<button @click="push('0.names', '')">Add More Text</button>
	
	  	<lq-text v-for="(item, index) in getElement('0.names', '')"  :form-name="formName" :name="`0.names.${index}`" :key="`${formName}.0.names.${index}`"></lq-text>


	  	<button @click="unshift('0.emails', '')">Add More Email Above</button>
	
	  	<lq-text v-for="(item, index) in getElement('0.emails', '')"  :form-name="formName" :name="`0.emails.${index}`" :key="`${formName}.0.emails.${index}`"></lq-text>

	  	{{formValues}}
	</div>
</template>

<script type="text/javascript">
	import form from '../../../mixins/form';
	import lqText from '../../text/LQ-Text';

	export default {
		name: 'example-text-form',
		mixins: [form],
		components: {
			lqText
		}
	}
</script>