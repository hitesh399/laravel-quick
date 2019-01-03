/**
 * To Get the Form name id M
 * @param {Object} _this 
 */
export function getFormName (_this) {
    return _this.formName !== undefined ?  _this.formName : this.getParent(_this.$parent)
}
/**
 * To add string before the file name extension.
 * @param {String} name 
 * @param {String} include 
 */
export function updateFileName(name, include) {
    var name_arr = name.split('.');
    name_arr[name_arr.length -1] = include + '.' + name_arr[name_arr.length -1];
    return name_arr.join('.');
} 