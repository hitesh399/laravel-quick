<template>
	<div>
	  <h1> Text Element Examples</h1>
	  	<lq-text :form-name="formName" name="name" ></lq-text>
	  	<button @click="push('names', '')">Add More Text</button>
	
	  		<lq-text v-for="(item, index) in getElement('names', '')"  :form-name="formName" :name="`names.${index}`" :key="`${formName}.names.${index}`"></lq-text>


	  	<button @click="unshift('emails', '')">Add More Email Above</button>
	
	  	<lq-text v-for="(item, index) in getElement('emails', '')"  :form-name="formName" :name="`emails.${index}`" :key="`${formName}.emails.${index}`"></lq-text>

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