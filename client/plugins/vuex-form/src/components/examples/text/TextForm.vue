<template>
	<div>
	 <h1> Text Element Examples</h1>
	 <button @click="push('educations', {})">Add More Section</button>
	<div v-for="(education, edu_index) in getElement('educations', {})" >
	 

	  	<lq-text :id="`educations.${edu_index}.name`"></lq-text>
	  	<lq-text  :id="`educations.${edu_index}.password`"  ></lq-text>

	  	<button @click="push(`educations.${edu_index}.names`, '')">Add More Text</button>
		
		<div v-for="(item_name, item_index) in getElement(`educations.${edu_index}.names`, '')" :key="`${formName}.educations.${edu_index}.names.${item_index}`">

	  		<lq-text :id="`educations.${edu_index}.names.${item_index}`" ></lq-text> 
	  		<button @click="remove(`educations.${edu_index}.names.${item_index}`)">Delete</button>
	  </div>
	  	<button @click="remove(`educations.${edu_index}`)">Remove Section</button>
	  	-----------------------------------

	  	
	</div>

	<button @click="addError">Add Error</button>
	  	{{formValues}}
	  	{{getErrors()}}
</div>
</template>

<script type="text/javascript">
	import form from '../../../mixins/form';
	import lqText from '../../text/LQ-Text';

	export default {
		name: 'example-text-form',
		 inheritAttrs: true,
		mixins: [form],
		components: {
			lqText
		},
		methods: {

			addError: function () {

				this.addErrors({'educations.0.name': 'Required'});
			}
		}
	}
</script>