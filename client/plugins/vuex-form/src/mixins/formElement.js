import helper from 'vuejs-object-helper';
var validate = require("validate.js");

const formElementMix = {

	props: {

		id: {
			type: String,
			required: true
		},
		rules : Object,
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
		},

		inputListeners: function (event) {

			console.log('sadsdss');
			console.log(event)

	      var vm = this;

	      return this.$listeners;
	    
	      // `Object.assign` merges objects together to form a new object
	      // return Object.assign({},
	      //   // We add all the listeners from the parent
	      //   this.$listeners,
	      //   // Then we can add custom listeners or override the
	      //   // behavior of some listeners.
	      //   {
	      //     // This ensures that the component works with v-model
	      //     input: function (val) {
	      //     	console.log('asdasdsdds');
	      //     	console.log(event)
	      //       vm.$emit('input', val)
	      //     }
	      //   }
	      // )
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
		validate: function () {

			if(!this.rules) {
				return;
			}

			let value = this.getValue();
			let test = validate.single(value, this.rules);

			if(test !== undefined) {
				this.addError(test);
			}
			else {
				this.removeError();
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