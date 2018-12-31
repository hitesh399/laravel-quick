import validate from 'validate.js';
import helper, {isImage, checkFileExtensions} from 'vuejs-object-helper';

export default  (file, rules, lang) => {
    const {
        maxFileSize,
        minFileSize,
        acceptedFiles,
        minImageDimensions,
        maxImageDimensions,
        exactImageDimensions
    } = rules;

    let maxFileSizeBytes = maxFileSize ? maxFileSize*1024*1204 : null;
    let minFileSizeBytes = minFileSize ? minFileSize*1024*1204 : null;	
    let acceptedFilesArr = acceptedFiles ? (helper.isArray(acceptedFiles) ? acceptedFiles : acceptedFiles.split(','))  : null;

    return new Promise(function(resolve, reject) {
        
        let fReader = new FileReader();

        fReader.onload = function(e) {

            let errors = [];
            let attribues = { maxFileSize, minFileSize, fileSize: e.total, acceptedFiles: acceptedFiles };
            /**
             * Checking file size for max size validation
             */
            if(maxFileSizeBytes && e.total > maxFileSizeBytes) {
                            
                errors.push(validate.format(lang.maxFileSize, attribues));
            }
            /**
             * Checking file extensions
             */
            if (acceptedFilesArr && !checkFileExtensions(acceptedFilesArr, file) ){

                errors.push(validate.format(lang.acceptedFiles, attribues));
            }
            /**
             * Checking file size for min validation
             */
            if(minFileSizeBytes && e.total <  minFileSizeBytes) {

                errors.push(validate.format(lang.minFileSize, attribues));
            }
            /**
             * Checking File type is Image
             */
            if(isImage(e.target.result)) {

                let img = new Image();

                img.onload = function(imgE) { 

                    /**
                     * Min Dimensions validation
                     */
                    if(minImageDimensions && minImageDimensions[0] && !minImageDimensions[1] && imgE.width < minImageDimensions[0] ) {
                        
                        attribues.minImageWidth = minImageDimensions[0];
                        errors.push(validate.format(lang.minImageWidth, attribues));
                    } 
                    else if ( minImageDimensions && minImageDimensions[1] && !minImageDimensions[0] && imgE.height < minImageDimensions[1] ) {

                        attribues.minImageHeight = minImageDimensions[1];
                        errors.push(validate.format(lang.minImageHeight, attribues));
                    }
                    else if ( minImageDimensions && minImageDimensions[1] && minImageDimensions[0] && (imgE.height < minImageDimensions[1] || imgE.width < minImageDimensions[0] )) {

                        attribues.minImageHeight = minImageDimensions[1];
                        attribues.minImageWidth = minImageDimensions[0];
                        errors.push(validate.format(lang.minImageWidthHeight, attribues));
                    }
                    /**
                     * Max Dimensions Validation
                     */
                    if(maxImageDimensions && maxImageDimensions[0] && !maxImageDimensions[1] && imgE.width > maxImageDimensions[0] ) {

                        attribues.maxImageWidth = maxImageDimensions[0];
                        errors.push(validate.format(lang.maxImageWidth, attribues));	
                    } 
                    else if ( maxImageDimensions && maxImageDimensions[1] && !maxImageDimensions[0] && imgE.height > maxImageDimensions[1] ) {
                        
                        attribues.maxImageHeight = maxImageDimensions[1];
                        errors.push(validate.format(lang.maxImageHeight, attribues));
                    }
                    else if ( maxImageDimensions && maxImageDimensions[1] && maxImageDimensions[0] && (imgE.height > maxImageDimensions[1] || imgE.width > maxImageDimensions[0] )) {
                        
                        attribues.maxImageWidth = maxImageDimensions[0];
                        attribues.maxImageHeight = maxImageDimensions[1];
                        errors.push(validate.format(lang.maxImageWidthHeight, attribues));
                    }
                    /**
                     * exact Image Dimensions validation
                     */
                    if(exactImageDimensions && exactImageDimensions[0] && !exactImageDimensions[1] && imgE.width != exactImageDimensions[0] ) {

                        attribues.imageWidth = exactImageDimensions[0];
                        errors.push(validate.format(lang.imageWidth, attribues));	
                    } 
                    else if ( exactImageDimensions && exactImageDimensions[1] && !exactImageDimensions[0] && imgE.height != exactImageDimensions[1] ) {

                        attribues.imageHeight = exactImageDimensions[1];
                        errors.push(validate.format(lang.imageHeight, attribues));
                    }
                    else if ( exactImageDimensions && exactImageDimensions[1] && exactImageDimensions[0] && (imgE.height != exactImageDimensions[1] || imgE.width != exactImageDimensions[0] )) {
                        
                        attribues.imageWidth = exactImageDimensions[0];
                        attribues.imageHeight = exactImageDimensions[1];
                        errors.push(validate.format(lang.imageWidthHeight, attribues));
                    }
                    /**
                     * Resolving the promise instance
                     */
                    resolve(errors.length ? errors : '');
                }

                img.src = e.target.result;
            }
            else {
                /**
                 * Resolving the promise instance
                 */
                resolve(errors.length ? errors : '');
            }
            
        }

        fReader.readAsDataURL(file);
    });
};