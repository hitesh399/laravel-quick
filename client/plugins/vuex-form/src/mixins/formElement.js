import helper from 'vuejs-object-helper';

const formElementMix = {

	props: {

		id: {
			type: String,
			required: true
		}
	},
	computed: {

		error: function () {

			//console.log('Erorrr','dgggg');
			return helper.getProp(this.$store.state.form, [this.formName, 'errors', this.id], null);
		}
	},
	data: function () {

		return {
			name: null,
			formName: null
		}
	},

	created () {
		this.formName = this.$parent.formName;
		if(this.getValue(null) == null)
			this.setValue(null);
	
	},

	methods: {

		getValue: function (defulatValue) {

			defulatValue = defulatValue !== undefined ? defulatValue : null;

			return helper.getProp(this.$store.state.form,`${this.formName}.values.${this.id}`, defulatValue);
		},
		setValue: function (value) {

			console.log('adajdghjdghj', this.id)
			this.$store.dispatch('form/setElementValue', {formName: this.formName, elementName: this.id, value: value})
		},
		makeElementName: function () {

			return this.id.split('.').map(function(item, index)  { return index >0 ? '['+item+']': item  }).join('');
		},
		addError: function (errors) {

			this.$store.dispatch('form/addError', {formName: this.formName, elementName: this.id, errors: errors});
		},
		removeError: function () {
			
			this.$store.dispatch('form/removeError', {formName: this.formName, elementName: this.id});
		}
	}

}

export default formElementMix;