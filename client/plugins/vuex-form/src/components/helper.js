/**
 * To Get the Form name id M
 * @param {Object} _this 
 */
export function getFormName (_this) {
    
    //return _this.formName !== undefined ?  _this.formName : getFormName(_this.$parent)
    if( _this.formName !== undefined && _this.formName !== null) {
        console.log('_this', _this);
        return _this.formName
    }
    else if(_this.$parent) {
        return getFormName(_this.$parent)
    }
    else {
        return undefined;
    }
}
/**
 * To add string before the file name extension.
 * @param {String} name 
 * @param {String} include 
 */
export function updateFileName(name, include) {
    let name_arr = name.split('.');
    name_arr[name_arr.length -1] = include + '.' + name_arr[name_arr.length -1];
    return name_arr.join('.');
}
/**
 * To get the file extension.
 * @param {String} name 
 */
export function getFileExt(name) {
    let name_arr = name.split('.');
    return name_arr[name_arr.length -1];
}