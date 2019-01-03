export function getFormName (parent) {

    if(parent.formName !== undefined) {
        return parent.formName;
    }
    else {
        return this.getParent(parent.$parent);
    }
}