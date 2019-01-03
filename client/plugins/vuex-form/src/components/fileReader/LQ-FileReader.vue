<template>
    <div>
        <div v-if="loading ">
            loading...
        </div>
        <div v-else>
            <p>{{file.name}}</p>
        </div>

        <div v-if="needToCropped()">
            <lq-cropper v-for="(thumb, index) in thumbnails" :key="`${elementName}_cropper_${index}`" 
                :viewport="thumb"
                :element-name="elementName"
                :thumbnail-index="!updateOriginal ? index : undefined"
                v-bind="crop"
            />
        </div>
        <!-- <p v-if="error">{{error.join(', ')}}</p> -->
        <button @click="$emit('remove', name)">Delete</button>
       
    </div>
</template>
<script>
import  helper, {isImage} from 'vuejs-object-helper';
import {getFormName} from '../helper';
import LqCropper from './LQ-Cropper';

export default {
    name: 'LQ-FileReader',
    props: {
        crop: {
            type: Object,
            default: () => {size: 'original'}
        },
        // crop: {
        //      // [{width: 100, height: 100, type: 'square'}]
        //     boundary: Object, //{ width: 300, height: 300 } 
        // },
        thumbnails:  Array,
        updateOriginal: {
            type: Boolean,
            required: false,
            default: () => false
        },
        elementName:{
            type: String,
            required: true
        }
    },
    components:{
        LqCropper
    },
    data: function () {

        return {
            isImage: null,
            formName: null,
            loading: false
        }
    },
    computed: {
        file: function () {
            //console.log('keys', `${this.formName}.values.${this.elementName}.file`);
            return helper.getProp(this.$store.state.form, `${this.formName}.values.${this.elementName}.file`, null);
        }
    },
    created: function () {
        console.log('Form Name', getFormName(this));
        this.formName = getFormName(this);
        this.readFile();
    },
    watch: {

        file: function (newFile, oldFile) {
            !oldFile || newFile.name !==  oldFile.name ? this.readFile() : null;
        }
    },
    methods: {
        
        readFile: function () {  
            console.log('this.file', this.file);
            if(!this.file) {
                return;
            }

            let fReader = new FileReader();
            this.loading = true;

            fReader.onload = (e) => {

                this.isImage  =  isImage(e.target.result) ? true : false;
                this.loading = false;
            }
            fReader.readAsDataURL(this.file);
        },
        needToCropped: function () {
            //console.log('needToCropped', this.file);
            
            return helper.isArray(this.thumbnails) && this.file;
        }

    }
}
</script>

