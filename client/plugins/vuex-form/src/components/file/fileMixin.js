
import {isImage, checkFileExtensions} from 'vuejs-object-helper';

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
    },
    methods: {
		
		confirm : function (){
		  this.$swal('Hello Vue world!!!');
		},

		isMultiple: function () {

			return this.maxNoOfFiles === 1 ? false: true;
		},
		handleFileChange: function(event)  {

			console.log('changeEvent');
			var fileLenght = event.target.files.length;
			var vm = this;
			var maxFileSizeBytes = this.maxFileSizez ? this.maxFileSizez*1024*1204 : null;
			var minFileSizeBytes = this.minFileSize? this.minFileSize*1024*1204: null;	
			// console.log('fffffffff');
            // console.log(this.acceptedFiles)
            
			var acceptedFiles = this.acceptedFiles ? (_.isArray(this.acceptedFiles) ? this.acceptedFiles : acceptedFiles.split(','))  : null;
			//var minImageDimensions = this.minImageDimensions;

          	if(fileLenght) {
          		
          		var allFilePromoise = [];

          		for (var i = 0; i < fileLenght; i++) {

          			allFilePromoise[i] =  new Promise(function(resolve, reject) {
						var file = event.target.files[i];
	          			var a = new FileReader();
	          			a.onload = function(e) { 

	          				if(maxFileSizeBytes && e.total > maxFileSizeBytes) {

	          					resolve(0)
	          					vm.errorFiles.push({fileReader: e, file: file, error: 'File size should be less than '+ vm.maxFileSizez + ' MB.', error_code: 1 })
	          				}
	          				else if (acceptedFiles && !checkFileExtensions(acceptedFiles, file) ){

	          					
	          					vm.errorFiles.push({fileReader: e, file: file, error: 'Invalid file.',  error_code: 2})
	          					resolve(0)
	          				}

	          				else if(minFileSizeBytes && e.total <  minFileSizeBytes) {

	          					
	          					vm.errorFiles.push({fileReader: e, file: file, error: 'File size should be greater than '+ vm.minFileSize + ' MB.' ,  error_code: 3})	
	          					resolve(0)	
	          				} 
	          				else if(isImage(e.target.result)) {

	          					var img = new Image();

	          					img.onload = function(imgE) { 

	          						// Min Size validation
	          						if(vm.minImageDimensions && vm.minImageDimensions[0] && !vm.minImageDimensions[1] && imgE.width < vm.minImageDimensions[0] ) {
	          							
	          							vm.errorFiles.push({fileReader: e, file: file, error: 'Image width should be greater than '+ vm.minImageDimensions[0] + ' PX.',  error_code: 4 });

	          							resolve(0)	
	          								
	          						} 
	          						else if ( vm.minImageDimensions && vm.minImageDimensions[1] && !vm.minImageDimensions[0] && imgE.height < vm.minImageDimensions[1] ) {

	          							
	          							vm.errorFiles.push({fileReader: e, file: file, error: 'Image height should be greater than '+ vm.minImageDimensions[0] + ' PX.',  error_code: 5 })
	          							resolve(0)
	          						}
	          						else if ( vm.minImageDimensions && vm.minImageDimensions[1] && vm.minImageDimensions[0] && (imgE.height < vm.minImageDimensions[1] || imgE.width < vm.minImageDimensions[0] )) {

	          							vm.errorFiles.push({fileReader: e, file: file, error: 'Image width/height should be greater than '+ vm.minImageDimensions[0] + '/'+vm.minImageDimensions[1]+' PX.',  error_code: 6 })
	          							resolve(0)
	          							
	          						}
	          						// Max Dimensions Validation
	          						else if(vm.maxImageDimensions && vm.maxImageDimensions[0] && !vm.maxImageDimensions[1] && imgE.width > vm.maxImageDimensions[0] ) {

	          							
	          							vm.errorFiles.push({fileReader: e, file: file, error: 'Image width should be less than '+ vm.maxImageDimensions[0] + ' PX.',  error_code: 7 })	
	          							resolve(0)	
	          						} 
	          						else if ( vm.maxImageDimensions && vm.maxImageDimensions[1] && !vm.maxImageDimensions[0] && imgE.height > vm.maxImageDimensions[1] ) {

	          							
	          							vm.errorFiles.push({fileReader: e, file: file, error: 'Image height should be less than '+ vm.maxImageDimensions[0] + ' PX.',  error_code: 8 })
	          							resolve(0)
	          						}
	          						else if ( vm.maxImageDimensions && vm.maxImageDimensions[1] && vm.maxImageDimensions[0] && (imgE.height > vm.maxImageDimensions[1] || imgE.width > vm.maxImageDimensions[0] )) {

	          							
	          							vm.errorFiles.push({fileReader: e, file: file, error: 'Image width/height should be less than '+ vm.maxImageDimensions[0] + '/'+vm.maxImageDimensions[1]+' PX.' ,  error_code: 9})
	          							resolve(0)
	          						}
	          						// exactImageDimensions
	          						else if(vm.exactImageDimensions && vm.exactImageDimensions[0] && !vm.exactImageDimensions[1] && imgE.width != vm.exactImageDimensions[0] ) {

	          							
	          							vm.errorFiles.push({fileReader: e, file: file, error: 'Image width should be '+ vm.exactImageDimensions[0] + ' PX.' ,  error_code: 10})	
	          							resolve(0)	
	          						} 
	          						else if ( vm.exactImageDimensions && vm.exactImageDimensions[1] && !vm.exactImageDimensions[0] && imgE.height != vm.exactImageDimensions[1] ) {

	          							
	          							vm.errorFiles.push({fileReader: e, file: file, error: 'Image height should be '+ vm.exactImageDimensions[0] + ' PX.',  error_code: 11 })
	          							resolve(0)
	          						}
	          						else if ( vm.exactImageDimensions && vm.exactImageDimensions[1] && vm.exactImageDimensions[0] && (imgE.height != vm.exactImageDimensions[1] || imgE.width != vm.exactImageDimensions[0] )) {

	          							
	          							vm.errorFiles.push({fileReader: e, file: file, error: 'Image width/height should be '+ vm.exactImageDimensions[0] + '/'+vm.exactImageDimensions[1]+' PX.',  error_code: 12 });
	          							resolve(0)

	          						} else {

	          							// console.log('vm.files.length');
	          							// console.log(vm.files.length);
	          							// console.log(vm.files);
	          							
	          							if(!vm.maxNoOfFiles || (vm.maxNoOfFiles && vm.files.length < vm.maxNoOfFiles )) {
		          							
		          							vm.files.push({fileReader: e, file: file, error: null});
		          							resolve(1);
		          						} 
		          						else {

		          							
		          							vm.errorFiles.push({fileReader: e, file: file, error: 'You can only Select '+ vm.maxNoOfFiles + ' File(s).',  error_code: 13});
		          							resolve(0);
		          						}
	          						}	
	          					}

	          					img.src = e.target.result;
	          				} 
	          				else {

	          					if(!vm.maxNoOfFiles || (vm.maxNoOfFiles && vm.files.length < vm.maxNoOfFiles )) {
		          					
		          					vm.files.push({fileReader: e, file: file, error: null, error_code: null});
		          					resolve(1);
		          				}
		          				else {

          							vm.errorFiles.push({fileReader: e, file: file, error: 'You can only Select '+ vm.maxNoOfFiles + ' File(s).',  error_code: 13});
          							resolve(0);
          						}

	          				}
					    };
					    event.target.value = '';
					    
					    a.readAsDataURL(file);

				    });

          		}

          		Promise.all(allFilePromoise).then(function(values) {
				  console.log('values');
				  console.log(values);
				  console.log(vm);

				  if(vm.errorFiles.length){
				    //vm.removeAllErrorFile()
				  }


				  vm.$emit('input', {files: vm.files, errorFiles: vm.errorFiles});
				  
				  if(vm.onChange) {

				  	console.log('on Change File..', vm.files);
				  	vm.onChange();
				  }

				}).catch(function (errors) {

					//console.log('errors');
				    //console.log(errors);
				    if(vm.errorFiles.length){
				    	//vm.removeAllErrorFile()
				    }
				    vm.$emit('input', {files: vm.files, errorFiles: vm.errorFiles});
				})
          	}
			// console.log(this);
			// console.log(e);
		}
	}
}