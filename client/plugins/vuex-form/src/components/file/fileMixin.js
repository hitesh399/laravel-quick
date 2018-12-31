
import helper, {isImage, checkFileExtensions} from 'vuejs-object-helper';
import errorLang from './fileErrorLang';
import validate from 'validate.js';
import fileValidation from '../validate/FileValidation';
//validate.validators.file = fileValidation;

const fileMixIn = {
    props: {
		maxNoOfFiles: {
			type: Number,
			required: false,
			default: () => { return null; }
		},
		// maxFileSize: {
		// 	type: Number,
		// 	required: false,
		// 	default: () => { return null; }
		// },
		// minFileSize: {
		// 	type: Number,
		// 	required: false,
		// 	default : () => { return null; }
		// },
		// acceptedFiles: {
		// 	type: [String, Array],
		// 	required: false,
		// 	default: () => { return null; }
		// },
		// minImageDimensions: {
		// 	type: Array,
		// 	required: false,
		// 	default: () => { return null; },
		// 	validator: (value) => {
		// 		return value ? (value.length == 2) : true
		// 	}	
		// },
		// maxImageDimensions: {
		// 	type: Array,
		// 	required: false,
		// 	default: () => { return null; },
		// 	validator: (value) => {
		// 		return value ? (value.length == 2) : true
		// 	}	
		// },
		// exactImageDimensions: {
		// 	type: Array,
		// 	required: false,
		// 	default: () => { return null; },
		// 	validator: (value) => {
		// 		return value ? (value.length == 2) : true
		// 	}	
        // },
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
    methods: {

		isMultiple: function () {

			return this.maxNoOfFiles === 1 ? false: true;
		},
		handleFileChange: async function(event)  {
            
            const fileLenght = event.target.files.length;
              
            if(fileLenght) {
          		
                console.log('Started...')
                this.ready(false);
          		for (var i = 0; i < fileLenght; i++) {
                    
                    if(!this.rules || !this.rules.file) {
                        return;
                    }

                    const file = event.target.files[i];
                    const result = await fileValidation(file, this.rules.file, this.lang );
                    result ? this.addError(result, (this.isMultiple() ? i: undefined) ) : null;
                    console.log('index:', i, result);
                    this.setValue(file);
                }
                this.ready(false);
                console.log('Completed...')
                

          		// Promise.all(allFilePromise).then(function(values) {
                //     vm.ready(true);
                //     vm.$emit('change', vm.LQElement);
				// })
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
            const defaultValue = this.isMultiple() ? [] : {};

            const value = file ? {
                file: file,
                thumbSizes: this.thumbs,
                cropped: false,
                croppedData: null,
            } : defaultValue;

            const data = {
                formName: this.formName, 
                elementName: this.id, 
                value: value
            }
            console.log('Data', data);
            const action = this.isMultiple() ? 'form/addNewElement' : 'form/setElementValue';

            this.$store.dispatch(action, data);
        }
	}
}

export default fileMixIn;