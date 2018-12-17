import helper from 'vuejs-object-helper';

const formElementMix = {

	props: {

		name: {
			type: String,
			required: true
		},
		formName: {
			type: String,
			required: true,
		},
		classes: {
			type: Array,
			required: false
		}
	},
	computed: {

		error: function () {

			return helper.getProp(this.$store.state.form, `${this.formName}.errors.${this.name}`, null);
		}
	},

	created () {

		if(this.getValue(null) == null)
			this.setValue(null);
	
	},

	methods: {

		getValue: function (defulatValue) {

			defulatValue = defulatValue !== undefined ? defulatValue : null;

			return helper.getProp(this.$store.state.form,`${this.formName}.values.${this.name}`, defulatValue);
		},
		setValue: function (value) {

			this.$store.dispatch('form/setElementValue', {formName: this.formName, elementName: this.name, value: value})
		}
	}

}

export default formElementMix;