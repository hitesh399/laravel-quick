
import helper, {isImage, checkFileExtensions} from 'vuejs-object-helper';
import errorLang from './fileErrorLang';
import validate from 'validate.js';

const fileMixIn = {
    props: {
		maxNoOfFiles: {
			type: Number,
			required: false,
			default: () => { return null; }
		},
		maxFileSize: {
			type: Number,
			required: false,
			default: () => { return null; }
		},
		minFileSize: {
			type: Number,
			required: false,
			default : () => { return null; }
		},
		acceptedFiles: {
			type: [String, Array],
			required: false,
			default: () => { return null; }
		},
		minImageDimensions: {
			type: Array,
			required: false,
			default: () => { return null; },
			validator: (value) => {
				return value ? (value.length == 2) : true
			}	
		},
		maxImageDimensions: {
			type: Array,
			required: false,
			default: () => { return null; },
			validator: (value) => {
				return value ? (value.length == 2) : true
			}	
		},
		exactImageDimensions: {
			type: Array,
			required: false,
			default: () => { return null; },
			validator: (value) => {
				return value ? (value.length == 2) : true
			}	
        },
        lang: {
            type: Object,
            required: false,
            default: () => {return errorLang}
        },
        thumbs: {
            type: Array,
            default: () => { return null; },
            validator: (value) => {
                let isValid = true;
                value.map(function (v) {
                    if(!helper.isFloat( v.width ) || !helper.isFloat( v.height ) ){
                        isValid = false;
                    }
                })
                return isValid;
            }
        }
    },
    data: function () {

        return {
            isFile: true
        }
    },
    methods: {

		isMultiple: function () {

			return this.maxNoOfFiles === 1 ? false: true;
		},
		handleFileChange: function(event)  {

			console.log('changeEvent');
			var fileLenght = event.target.files.length;
			var vm = this;
			var maxFileSizeBytes = this.maxFileSize ? this.maxFileSize*1024*1204 : null;
			var minFileSizeBytes = this.minFileSize? this.minFileSize*1024*1204: null;	
			// console.log('fffffffff');
            // console.log(this.acceptedFiles)
            
			var acceptedFiles = this.acceptedFiles ? (helper.isArray(this.acceptedFiles) ? this.acceptedFiles : this.acceptedFiles.split(','))  : null;
			//var minImageDimensions = this.minImageDimensions;

          	if(fileLenght) {
          		
          		let allFilePromise = [];
                this.ready(false);
          		for (var i = 0; i < fileLenght; i++) {

                    allFilePromise[i] =  new Promise(function(resolve, reject) {
                        var file = event.target.files[i];
                        const currentIndex =  i;
	          			var a = new FileReader();
	          			a.onload = function(e) { 
                            
                            let errors = [];
                            let attribues = {
                                maxFileSize: vm.maxFileSize,
                                minFileSize: vm.minFileSize,
                                maxNoOfFiles: vm.maxNoOfFiles,
                                fileSize: e.total,
                                acceptedFiles: acceptedFiles
                            }

	          				if(maxFileSizeBytes && e.total > maxFileSizeBytes) {
                               
                                errors.push(validate.format(vm.lang.maxFileSize, attribues));
	          				}
                              
                            if (acceptedFiles && !checkFileExtensions(acceptedFiles, file) ){

                                errors.push(validate.format(vm.lang.acceptedFiles, attribues));
	          				}

	          				if(minFileSizeBytes && e.total <  minFileSizeBytes) {

                                errors.push(validate.format(vm.lang.minFileSize, attribues));
	          				} 
                              
                            if(isImage(e.target.result)) {

	          					var img = new Image();

	          					img.onload = function(imgE) { 

	          						// Min Size validation
	          						if(vm.minImageDimensions && vm.minImageDimensions[0] && !vm.minImageDimensions[1] && imgE.width < vm.minImageDimensions[0] ) {
                                        
                                        attribues.minImageWidth = vm.minImageDimensions[0];
                                        errors.push(validate.format(vm.lang.minImageWidth, attribues));
	          						} 
	          						else if ( vm.minImageDimensions && vm.minImageDimensions[1] && !vm.minImageDimensions[0] && imgE.height < vm.minImageDimensions[1] ) {

                                        attribues.minImageHeight = vm.minImageDimensions[1];
                                        errors.push(validate.format(vm.lang.minImageHeight, attribues));
	          						}
	          						else if ( vm.minImageDimensions && vm.minImageDimensions[1] && vm.minImageDimensions[0] && (imgE.height < vm.minImageDimensions[1] || imgE.width < vm.minImageDimensions[0] )) {

                                        attribues.minImageHeight = vm.minImageDimensions[1];
                                        attribues.minImageWidth = vm.minImageDimensions[0];
                                        errors.push(validate.format(vm.lang.minImageWidthHeight, attribues));
                                    }
                                      
	          						// Max Dimensions Validation
	          						if(vm.maxImageDimensions && vm.maxImageDimensions[0] && !vm.maxImageDimensions[1] && imgE.width > vm.maxImageDimensions[0] ) {

                                        attribues.maxImageWidth = vm.maxImageDimensions[0];
                                        errors.push(validate.format(vm.lang.maxImageWidth, attribues));	
	          						} 
	          						else if ( vm.maxImageDimensions && vm.maxImageDimensions[1] && !vm.maxImageDimensions[0] && imgE.height > vm.maxImageDimensions[1] ) {
                                        
                                        attribues.maxImageHeight = vm.maxImageDimensions[1];
                                        errors.push(validate.format(vm.lang.maxImageHeight, attribues));
	          						}
	          						else if ( vm.maxImageDimensions && vm.maxImageDimensions[1] && vm.maxImageDimensions[0] && (imgE.height > vm.maxImageDimensions[1] || imgE.width > vm.maxImageDimensions[0] )) {
                                        
                                        attribues.maxImageWidth = vm.maxImageDimensions[0];
                                        attribues.maxImageHeight = vm.maxImageDimensions[1];
                                        errors.push(validate.format(vm.lang.maxImageWidthHeight, attribues));
	          						}
	          						// exactImageDimensions
	          						if(vm.exactImageDimensions && vm.exactImageDimensions[0] && !vm.exactImageDimensions[1] && imgE.width != vm.exactImageDimensions[0] ) {

                                        attribues.imageWidth = vm.exactImageDimensions[0];
                                        errors.push(validate.format(vm.lang.imageWidth, attribues));	
	          						} 
	          						else if ( vm.exactImageDimensions && vm.exactImageDimensions[1] && !vm.exactImageDimensions[0] && imgE.height != vm.exactImageDimensions[1] ) {

                                        attribues.imageHeight = vm.exactImageDimensions[1];
                                        errors.push(validate.format(vm.lang.imageHeight, attribues));
	          						}
	          						else if ( vm.exactImageDimensions && vm.exactImageDimensions[1] && vm.exactImageDimensions[0] && (imgE.height != vm.exactImageDimensions[1] || imgE.width != vm.exactImageDimensions[0] )) {
                                        
                                        attribues.imageWidth = vm.exactImageDimensions[0];
                                        attribues.imageHeight = vm.exactImageDimensions[1];
                                        errors.push(validate.format(vm.lang.imageWidthHeight, attribues));
                                    }
                                      
                                    vm.setValue(file);

                                    if(vm.maxNoOfFiles && vm.maxNoOfFiles > 1 && helper.isArray(storedFiles) && storedFiles.length < vm.maxNoOfFiles ) {
                                        errors.push(validate.format(vm.lang.maxNoOfFiles, attribues));
                                    }

                                    if(errors.length >0) {
                                        vm.addError(errors, (vm.isMultiple() ? currentIndex: undefined) );
                                    }
                                    else {
                                        vm.removeError();
                                    }
                                    resolve(errors);
	          					}

	          					img.src = e.target.result;
                            }
                            else {
                                
                                vm.setValue(file);

                                const storedFiles = vm.LQElement ? vm.LQElement : [];

                                if(vm.maxNoOfFiles && vm.maxNoOfFiles > 1 && helper.isArray(storedFiles) && storedFiles.length < vm.maxNoOfFiles ) {
                                    errors.push(validate.format(vm.lang.maxNoOfFiles, attribues));
                                }

                                if(errors.length >0) {
                                    vm.addError(errors, (vm.isMultiple() ? currentIndex: undefined) );
                                }
                                else {
                                    vm.removeError();
                                }

                                resolve(errors);
                            }
                        };
                        
					    event.target.value = '';
					    a.readAsDataURL(file);
				    });

          		}

          		Promise.all(allFilePromise).then(function(values) {
                    vm.ready(true);
                    vm.$emit('change', vm.LQElement);
				})
          	}
			// console.log(this);
			// console.log(e);
        },
        addError: function (errors, index) {

            const elementName = index ? this.id+'.'+index : this.id;
			this.$store.dispatch('form/addError', {formName: this.formName, elementName: elementName, errors: errors});
        },
        /**
         * To set the file value in store
         * @param {File} file 
         */
        setValue: function (file) {

            let value = {
                file: file,
                thumbSizes: this.thumbs,
                cropped: false,
                croppedData: null,
            }

            let data = {
                formName: this.formName, 
                elementName: this.id, 
                value: value
            }
            const action = this.isMultiple() ? 'form/addNewElement' : 'form/setElementValue';

            this.$store.dispatch(action, data);
        }
	}
}

export default fileMixIn;