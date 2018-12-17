import helper from 'vuejs-object-helper';

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
		formErrors: function () {}
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
		 	console.log('getElement');
		 	console.log(this.formValues)
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
		remove: function () {},
		/*
		 |-----------------------------------
		 | To get the element error
		 |-----------------------------------
		 * @param elementName => String
		 * If element is an array then name path should be concat with comma like
		 * element is name: [1,2,3,4] and you want to delete the second element than
		 * name value should be like: `name.1`
		 */
		getError: function () {},
		/*
		 |---------------------------------------------------------------------------
		 | To Error of the given element
		 |---------------------------------------------------------------------------
		 * @param elementName => String
		 */
		 removeError: function() {},

		/*
		 |---------------------------------------------------------------------------
		 | To Re-arrange errors index after delete an element which dataType is array
		 |---------------------------------------------------------------------------
		 * @param elementName => String
		 */
		 reArrangeErrorsIndex: function () {},
	}
}

export default formMixin;