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
	},
	infos: (state) => (formName) => {
		return state[formName] && state[formName].infos ? state[formName].infos : {};
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


	/**
	 * Errors Functions
	 */

	addErrors({commit}, {formName, errors}) {

		commit('saveDataKey', { formName, data: errors, dataKey: 'errors'});
	},
	addError({commit}, {formName, elementName, errors}) {

		commit('updateDataKey', { formName, elementName, data: errors, dataKey: 'errors'});
	},
	removeErrors({commit}, {formName}) {

		commit('destroyDataKey', { formName, dataKey: 'errors'});
	},
	removeError({commit}, {formName, elementName}) {

		commit('deleteDataKey', { formName, elementName, dataKey: 'errors'});
	},


	/**
	 * Validation functions
	 */
	addValidation({commit}, {formName, elementName, rules}) {

		commit('updateDataKey', { formName, elementName, data: rules, dataKey: 'validations'});
	},
	addValidations({commit}, {formName, rules}) {
		
		commit('saveDataKey', { formName, data: rules, dataKey: 'validations'});
	},
	removeValidation({commit}, {formName, elementName}) {

		commit('deleteDataKey', { formName, elementName, dataKey: 'validations'});
	},

	/**
	 * Element Information functions
	 */
	addInfo({commit}, {formName, elementName, info}) {

		commit('updateDataKey', { formName, elementName, data: info, dataKey: 'info'});
	},
	addInfos({commit}, {formName, info}) {
		
		commit('saveDataKey', { formName, data: info, dataKey: 'info'});
	},
	removeInfo({commit}, {formName, elementName}) {

		commit('deleteDataKey', { formName, elementName, dataKey: 'info'});
	},


	isReady({commit}, {formName, status}) {

		commit('changeStatus', {formName, statusKey: 'isReady', status})
	},
	isSubmiting({commit}, {formName, status}) {
		
		commit('changeStatus', {formName, statusKey: 'isSubmiting', status})
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

	updateDataKey(state, {formName, elementName, data, dataKey}){

		helper.setProp(state, [formName, dataKey, elementName], data, true); 
	},
	saveDataKey(state, {formName, data, dataKey}){

		helper.setProp(state, [formName, dataKey ], data, true);
	},
	deleteDataKey(state, {formName, elementName, dataKey}) {

		helper.deleteProp(state, [formName, dataKey, elementName]); 
	},
	destroyDataKey(state, {formName, dataKey}) {

		helper.deleteProp(state, [formName, dataKey ]);
	},


	changeStatus(state, {formName, statusKey, status}){

		helper.setProp(state, [formName, statusKey ], status, true);	
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

		// Removing Infomation
		this.dispatch('form/removeValidation', { formName, elementName});

		// Rearrange the Errors Information index
		let infos = {...this.getters['form/infos'](formName) };
		let updatedInfos = helper.reArrangeObjectIndex(infos, elementName);

		if(updatedInfos){
			this.dispatch('form/addInfos', { formName, rules: updatedInfos});
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