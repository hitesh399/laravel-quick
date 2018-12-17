import helper from 'vuejs-object-helper';

const state = {
	
}
const getters = {

}

const actions = {

	setElementValue({commit}, {formName, elementName, value}) {

		commit('saveElementValue', {formName: formName, elementName: elementName, value: value});
	},
	addNewElement({commit}, {formName, elementName, value}) {
 
		commit('pushNewElement', {formName: formName, elementName:elementName, value: value});
	},
	addNewElementUnshift({commit}, {formName, elementName, value}) {
 
		commit('unshiftNewElement', {formName: formName, elementName:elementName, value: value});
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
}


export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}