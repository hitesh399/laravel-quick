import helper from 'vuejs-object-helper';

const state = {
	
}
const getters = {

	errros: (state) => (formName) => {
		return state[formName] && state[formName].errors ? state[formName].errors : {};
	},
	validations: (state) => (formName) => {
		return state[formName] && state[formName].validations ? state[formName].validations : {};
	},
	values: (state) => (formName) => {
		return state[formName] && state[formName].values ? state[formName].values : {};
	}
}

const actions = {

	setElementValue({commit}, {formName, elementName, value}) {

		commit('saveElementValue', { formName,  elementName,  value});
	},
	addNewElement({commit}, {formName, elementName, value}) {
 
		commit('pushNewElement', {formName, elementName,  value});
	},
	addNewElementUnshift({commit}, {formName, elementName, value}) {
 
		commit('unshiftNewElement', { formName, elementName,  value});
	},
	removeElement({commit}, {formName, elementName}) {
 
		commit('deleteElement', {formName, elementName});
	},
	addErrors({commit}, {formName, errors}) {

		commit('saveErrors', { formName, errors});
	},
	addError({commit}, {formName, elementName, errors}) {

		commit('updateError', { formName, elementName, errors});
	},
	removeErrors({commit}, {formName}) {

		commit('deleteErrors', { formName});
	},
	removeError({commit}, {formName, elementName}) {

		commit('deleteError', { formName, elementName});
	},
	addValidation({commit}, {formName, elementName, rules}) {

		commit('updateValidation', { formName, elementName, rules});
	},
	addValidations({commit}, {formName, rules}) {
		
		commit('saveValidations', { formName, rules});
	},
	removeValidation({commit}, {formName, elementName}) {

		commit('deleteValidation', { formName, elementName});
	}
}

const mutations = {

	saveElementValue(state, {formName, elementName, value}) {

		helper.setProp(state, `${formName}.values.${elementName}`, value)
	},
	pushNewElement(state, {formName, elementName, value}) {

		helper.pushProp(state, `${formName}.values.${elementName}`, value)
	},
	unshiftNewElement(state, {formName, elementName, value}) {

		helper.unshiftProp(state, `${formName}.values.${elementName}`, value)
	},
	updateValidation(state, {formName, elementName, rules}) {
		helper.setProp(state, [formName, 'validations', elementName], rules, true); 
	},
	saveValidations(state, {formName, rules}) {

		helper.setProp(state, [formName, 'validations' ], rules, true);
	},
	deleteValidation(state, {formName, elementName}) {

		helper.deleteProp(state, [formName, 'validations', elementName]); 
	},
	saveErrors(state, {formName, errors}) {
		//console.log('saveErrors', errors);
		helper.setProp(state, [formName, 'errors' ], errors, true);
	},
	updateError(state, {formName, elementName, errors}) {

		helper.setProp(state, [formName, 'errors', elementName], errors, true); 
	},
	deleteErrors(state, {formName}) {

		helper.deleteProp(state, [formName, 'errors' ]);
	},
	deleteError(state, {formName, elementName}) {

		helper.deleteProp(state, [formName, 'errors', elementName]); 
	},
	deleteElement(state, {formName, elementName}) {

		// Removing the Error
		this.dispatch('form/removeError', { formName, elementName});

		// Rearrange the Errors index
		let errors = {...this.getters['form/errros'](formName)};
		let updatedErrors = helper.reArrangeObjectIndex(errors, elementName);		
		if(updatedErrors){
			this.dispatch('form/addErrors', { formName, errors: updatedErrors});
		}

		// Removing Validation
		this.dispatch('form/removeValidation', { formName, elementName});

		// Rearrange the Errors Validation index
		let rules = {...this.getters['form/validations'](formName) };
		let updatedValidations = helper.reArrangeObjectIndex(rules, elementName);

		if(updatedValidations){
			this.dispatch('form/addValidations', { formName, rules: updatedValidations});
		}

		// Deleting the element
		helper.deleteProp(state, `${formName}.values.${elementName}`);
	}
}


export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}