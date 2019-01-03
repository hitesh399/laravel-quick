
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
import {getFormName} from '../helper';

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
        }
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
            console.log('fn2', a1,a2,a3)
            //console.log('Result 2', );
            this.$refs.croppieRef.result({ type: 'blob', size:'original', format:'png', quality: 1, circle: false }).then(function(d){
                console.log('Result ', d)
                console.log('Result File:, ', new File([d], "test.jpeg", {lastModified: new Date()}));
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

