import helper from 'vuejs-object-helper';
const validate = require("validate.js");

const formElementMix = {

	props: {

		id: {
			type: String,
			required: true
		},
		rules : [Object, Function],
		validateEvent: {
			type: String,
			validator: (val) => ['blur', 'change', 'keypress', 'keyup'].includes(val),
			default: function () {
				return 'change';
			}
		}
	},
	computed: {

		error: function () {

			return helper.getProp(this.$store.state.form, [this.formName, 'errors', this.id], null);
		},
		LQElement: {

			get: function () {

				return this.getValue();
			},
			set: function (value, event) {

				this.setValue(value)

				if(this.validateEvent ==='change'){
					this.validate()
				}
			}
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

		if(this.rules)
			this.$store.dispatch('form/addValidation', {formName: this.formName, elementName: this.id, rules: this.rules})
	},

	methods: {

		getValue: function (defulatValue) {

			defulatValue = defulatValue !== undefined ? defulatValue : null;

			return helper.getProp(this.$store.state.form,`${this.formName}.values.${this.id}`, defulatValue);
		},
		setValue: function (value) {

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
		},
		isReady: function (status) {
			
			this.$store.dispatch('form/isReady', {formName: this.formName, status});
		},
		validate: function () {

			if(!this.rules) {
				return;
			}

			const value = this.getValue();
			let rules  = {...this.rules};
			const {serverValidation} = rules;
			delete rules.serverValidation

			const test = validate.single(value, rules);
			//console.log('Test...', test);

			if(test === undefined && serverValidation) {

				const values = {...this.$store.getters['form/values'](this.formName)};
				this.isReady(false);

				serverValidation({formData: values, value: value})
					.then((res) => {
						this.isReady(true);
						console.log('Res', res);
						res ? this.addError(res) : this.removeError();

					}).catch((err) => {
						this.isReady(true);
						this.addError(err)
					})
			}
			else {
				test !== undefined ? this.addError(test) : this.removeError()
			}					
			
			
		},

		emitNativeEvent(event) {

			//console.log('Event Type', event.type)
			this.$emit(event.type, event, this.getValue());

			console.log('Event Emit Value: '+ event.type, this.getValue());
			if(this.validateEvent === event.type){
				
				this.validate()
			}
		}
	}

}

export default formElementMix;