import helper from 'vuejs-object-helper';

const state = {
	
}
const getters = {

	errros: (state) => (formName) => {
		return state[formName] && state[formName].errors ? state[formName].errors : {};
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

	saveErrors(state, {formName, errors}) {
		console.log('saveErrors', errors);
		helper.setProp(state, [formName, 'errors' ], errors, true);
	},
	updateError(state, {formName, elementName, errors}) {

		helper.setProp(state, [formName, 'errors', elementName], errors, true); 
	},
	deleteErrors(state, {formName, errors}) {

		helper.deleteProp(state, [formName, 'errors' ]);
	},
	deleteError(state, {formName, elementName}) {

		helper.deleteProp(state, [formName, 'errors', elementName]); 
	},
	deleteElement(state, {formName, elementName}) {

		this.dispatch('form/removeError', { formName, elementName});


		let errors = {...this.getters['form/errros'](formName)};
		let updatedErrors = helper.reArrangeObjectIndex(errors, elementName);

		if(updatedErrors){
			this.dispatch('form/addErrors', { formName, errors: updatedErrors});
		}

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