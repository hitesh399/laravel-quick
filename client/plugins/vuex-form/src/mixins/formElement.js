import helper from 'vuejs-object-helper';
const validate = require("validate.js");

const formElementMix = {

	props: {

		id: {
			type: String,
			required: true
		},
		rules : Object,
		validateEvent: {
			type: String,
			validator: (val) => ['blur', 'change', 'keypress', 'keyup','keydown','click'].includes(val),
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
			formName: null,
			validationCallback: null,
			validating: false,
			isFile: false
		}
	},

	created () {

		this.formName = this.$parent.formName;
		
		if(this.getValue(null) == null && !this.isFile)
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
			errors = !helper.isArray(errors) ? [errors] : errors;
			this.$store.dispatch('form/addError', {formName: this.formName, elementName: this.id, errors: errors});
		},
		removeError: function () {
			
			this.$store.dispatch('form/removeError', {formName: this.formName, elementName: this.id});
		},
		ready: function (status) {
			
			this.$store.dispatch('form/isReady', {formName: this.formName, status});
		},
		validate: function () {

			if(!this.rules) {
				return;
			}
			if(this.validating){

				if(this.validationCallback === null) {
					this.validationCallback = this.validate;
				}
				//console.log('Already Requesting...')
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
				this.ready(false);
				this.$emit('validating');
				this.validating = true;
				//console.log('Start validating...')
				serverValidation({formData: values, value: value,  name: this.id})
					.then((res) => {
						this.ready(true);
						//console.log('Res', res);
						res ? this.addError(res) : this.removeError();
						this.$emit('validated', res);
						this.validating = false;
						this.validationCallback ? this.validationCallback():  null;
						this.validationCallback = null;

					}).catch((err) => {
						this.ready(true);
						this.addError(err)
						this.$emit('validated', err);
						this.validating = false;
						this.validationCallback = null;
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