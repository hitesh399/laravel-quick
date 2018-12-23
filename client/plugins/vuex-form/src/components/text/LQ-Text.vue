<template>
	<div>
		<input type="text" v-bind="$attrs" v-model="LQText" v-on="$listeners" :id="id" :name="makeElementName()" @blur="validate">
		<p v-if="error">{{error.join(', ')}}</p>
	</div>
</template>
<script type="text/javascript">
	import formElement from '../../mixins/formElement';
	var validate = require("validate.js");

	export default {

		name: 'LQ-Text',
		mixins:[formElement],
		//inheritAttrs: false,
		computed: {

			LQText: {

				get: function () {

					return this.getValue();
				},
				set: function (value) {

					this.setValue(value)
				}
			}
		},
		
		methods: {
			validate: function () {

				let value = this.getValue();

				console.log('value....');
				console.log(value)

				var constraints = {
				  lq_text: {
				    presence: {allowEmpty: false},
				    exclusion: {
				      within: ["nicklas"],
				      message: "'%{value}' is not allowed"
				    }
				  }
				};

				let test = new validate({lq_text: value }, constraints);
				//console.log(test);
				//console.log(test.validate());

				if(test.lq_text !== undefined) {
					this.addError(test.lq_text);
				}
				else {
					this.removeError();
				}
				console.log('isValid', test);
				console.log('value', value);

			}
		}
	}
</script>