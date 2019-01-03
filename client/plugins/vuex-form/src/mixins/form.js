import helper from 'vuejs-object-helper';
const validate = require("validate.js");

const formMixin = {

	props: {
		formName: {
			type: String,
			required: true,
		},
		keepAlive: {
			type: Boolean,
			default: function(){ return true;}
		},
		initialvalues: {
			type: Object,
			default: function () { return {}; }
		}
	},
	data: function(){
		return{
			autoSubmit: true,
			method: 'POST',
			dataType: 'Json', // formData
			endPoint: '/', // URL to Submit the Form Data
		}
	},
	/*
	 |-------------------------------------------------------
	 | Check that is the form  already have the values ?
	 |-------------------------------------------------------
	 * Form does have the values and `keepAlive` setting is true,
	 * then no need to re-initialize the form value else hit the event to intialize the value
	 *
	 */
	mounted: function () {

	},

	created: function () {

		this.ready(true);
		this.submiting(false);
	},
	/*
	 |--------------------------------------------------------------------------------
	 | Check if Keep alive is false then delete the all form value and assign the null.
	 |--------------------------------------------------------------------------------
	 *
	 */
	unmounted: function () {

	},
	computed: {

		formValues: function () {

			return helper.getProp(this.$store.state.form,`${this.formName}.values`, {});
		},
		formInitialvalues: function () {},
		formErrors: function () {

			return helper.getProp(this.$store.state.form,`${this.formName}.errors`, {});
		},
		isReady: function () {

			return helper.getProp(this.$store.state.form,`${this.formName}.isReady`, true);
		},
		isSubmiting: function () {

			return helper.getProp(this.$store.state.form,`${this.formName}.isSubmiting`, false);
		}
	},

	methods: {


		/*
		 |-----------------------------------
		 | To get given element value
		 |-----------------------------------
		 * @param elementName => String
		 * If element is an array then name path should be concat with comma like
		 * element is name: [1,2,3,4] and you want to delete the second element than
		 * name value should be like: `name.1`
		 */
		 getElement: function (elementName, defaultValue) {
		 	
		 	return helper.getProp(this.formValues, elementName , [defaultValue]);
		 },
		 
		/*
		 |----------------------------------------
		 | To add new Element in last of an Array
		 |----------------------------------------
		 * @param elementName => String,
		 * @param default_value => any,
		 */

		push: function (elementName, defaultValue) {
			

			this.$store.dispatch('form/addNewElement', {formName: this.formName, elementName: elementName, value: defaultValue})
		},

		/*
		 |----------------------------------------
		 | To add new Element in start of an Array
		 |----------------------------------------
		 * @param elementName => String,
		 * @param default_value => any,
		 * Note after that we will re-arrange the error index.
		 */

		unshift: function (elementName, defaultValue) {

			this.$store.dispatch('form/addNewElementUnshift', {formName: this.formName, elementName: elementName, value: defaultValue})
		},

		/*
		 |-----------------------------------
		 | To remove the element
		 |-----------------------------------
		 * @param elementName => String
		 * If element is an array then name path should be concat with comma like
		 * element is name: [1,2,3,4] and you want to delete the second element than
		 * name value should be like: `name.1`
		 */
		remove: function (elementName) {
			
			this.$store.dispatch('form/removeElement', {formName: this.formName, elementName: elementName});
		},

		
		/*
		 |-----------------------------------
		 | To get the element error
		 |-----------------------------------
		 * @param elementName => String
		 * If element is an array then name path should be concat with comma like
		 * element is name: [1,2,3,4] and you want to delete the second element than
		 * name value should be like: `name.1`
		 */
		getErrors: function (elementName) {

			return elementName ? this.formErrors.elementName : this.formErrors;
		},
		addErrors: function (errors) {

			this.$store.dispatch('form/addErrors', {formName: this.formName, errors});
		},
		addError: function (elementName, errors) {

			this.$store.dispatch('form/addError', {formName: this.formName, elementName, errors});
		},
		removeError: function (elementName) {
			
			this.$store.dispatch('form/removeError', {formName: this.formName, elementName: elementName});
		},
		ready: function (status) {
			
			this.$store.dispatch('form/isReady', {formName: this.formName, status});
		},
		submiting: function (status) {
			
			this.$store.dispatch('form/isSubmiting', {formName: this.formName, status});
		},
		hasError: function () {
			console.log('hasError', Object.keys(this.getErrors()).length )
			return Object.keys(this.getErrors()).length > 0;
		},

		validate: async function () {

			const rules = {...this.$store.getters['form/validations'](this.formName)};
			const values = {...this.$store.getters['form/values'](this.formName)};
			const elementNames = Object.keys(rules);
			let validations = [];

			this.ready(false);

			elementNames.map((elementName) => {

				const elementValue = 	helper.getProp(values, elementName, null);
		
				const rule = {...rules[elementName]};

				const { serverValidation } = rule;
				delete rule.serverValidation;
				delete rule.file;
					
				const test = validate.single(elementValue, rule);
				test ? this.addError(elementName, test) : (!serverValidation ? this.removeError(elementName) : null);

				if(test === undefined && serverValidation) {

					validations[validations.length] = serverValidation({
						formData: values, 
						value: elementValue, 
						name: elementName
					}).then((res) => {

						res ? this.addError(elementName, res) : this.removeError(elementName);

					}).catch((err) => {

						this.addError(elementName, err)
					})
				}
				
			})

			console.log('Waiting...');

			const data = await Promise.all(validations);
			this.ready(true);
			return data;
		},
		submit: async function () {

			if(!this.canSubmit()){
				//console.log('Already Submiting data.');
				return;
			}

			await this.validate();

			console.log('isSubmiting')

			if(this.hasError()) {

				//this.isSubmiting(false);
				console.log('Has Error..');
				this.$emit('errors')
			}
			else {

				this.submiting(true);
				
				setTimeout( () => {
					console.log('isSubmiting Done.')
					
					this.submiting(false);
					this.$emit('submited');

				}, 5000);
			}
		},
		canSubmit: function (){
			return this.isReady && !this.isSubmiting;
		}
	}
}

export default formMixin;