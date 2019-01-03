
<template>
    <vue-croppie 
        ref="croppieRef"
        v-bind="$attrs" 
        :viewport="viewport"
        :boundary="boundary"
        @result="fn1"
        @update="updateFileData">
    </vue-croppie>
</template>

<script>
import {getFormName, updateFileName, getFileExt} from '../helper';

export default {
    name: 'LQ-Cropper',
    props: {
        elementName:{
            type: String,
            required: true
        },
        viewport: {
            type: Object,
            required: true
        },
        boundary: {
            type: Object,
            default() { return { width: 300, height: 300 }; }
        },
        circle: {
            type: Boolean,
            default:() => false,
        },
        size: {
            type: String,
            validator: (val) => ['viewport', 'original'].includes(val),
            default: () => 'original'
        },
        thumbnailIndex: Number, // If thumbnailIndex is not undefined that means need to create the thubnials otherwise update the Main file data
    },
    data: function () {
        return {
            imageRawData: null,
            loading: false,
            formName: null
        }
    },
    computed: {
        file: function () {

            return helper.getProp(this.$store.state.form, `${this.formName}.values.${this.elementName}.file`, null);
        }
    },
    created() {
        this.formName = getFormName(this);
        this.readFile();
    },
    watch:{
        imageRawData: function (newVal, oldVal) {
            //console.log('ddddddd', newVal, oldVal);
            this.$nextTick(() => {
                this.$refs.croppieRef.bind({
                    url: newVal,
                    zoom:0
                })
            })
        },
        file: function () {
            this.readFile();
        }
    },
    methods: {
        fn1: function () {
            console.log('fn1')
        },
        updateFileData: function (a1,a2,a3) {
            //console.log('fn2', a1,a2,a3)
            //console.log('Result 2', );
            this.$refs.croppieRef.result({ 
                type: 'blob', 
                size: this.size, 
                format: this.circle ? 'png' : getFileExt(this.file.name), 
                quality: 1, 
                circle: this.circle 
            })
            .then( (blobData) => {
                let name = this.thumbnailIndex !== undefined ? '_thumb_'+this.thumbnailIndex : '';
                let newFile = new File([blobData], updateFileName(this.file.name, name), {type: this.circle ? 'png' : fi.type });
                let elementName = this.thumbnailIndex !== undefined ? this.elementName+'.file' : this.elementName+'.thumbnails.'+this.thumbnailIndex+'.file';

                this.$store.dispatch('form/setElementValue', {
                    formName: this.formName,
                    elementName: elementName,
                    value: newFile
                })
            })

        },
        readFile: function () {
            
            if(!this.file) {
                return;
            }

            let fReader = new FileReader();
            this.loading = true;

            fReader.onload = (e) => {

                this.isImage  =  isImage(e.target.result) ? true : false;
                this.loading = false;
                this.imageRawData = e.target.result;
            }
            fReader.readAsDataURL(this.file);
        },
    }
}
</script>

<style>

</style>

