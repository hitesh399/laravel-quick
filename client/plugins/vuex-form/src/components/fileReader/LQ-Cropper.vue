
<template>
    
</template>

<script>
import {getFormName} from '../helper';

export default {
    name: 'LQ-Cropper',
    props: {
        elementName:{
            type: String,
            required: true
        }
    },
    computed: {
        error: function () {
            //console.log('this.name]', this.name, this.formName);
			return helper.getProp(this.$store.state.form, [this.formName, 'errors', this.elementName], null);
        },
        file: function () {

            return helper.getProp(this.$store.state.form, `${this.formName}.values.${this.elementName}.file`, null);
        }
    },
    created() {
        this.formName = getFormName(this);
        //console.log('This........', this);
        this.readFile();
        
    },
    watch:{
        result: function (newVal, oldVal) {
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
        fn2: function (a1,a2,a3) {
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
                this.result = e.target.result;
            }
            fReader.readAsDataURL(this.file);
        },
    }
}
</script>

<style>

</style>

