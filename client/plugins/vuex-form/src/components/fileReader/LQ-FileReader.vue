<template>
    <div>
        <div v-if="loading || !result">
            loading...
        </div>
        <div v-else-if="isImage && result">
            <!-- <img :src="result" :alt="file.name" /> -->
            
            <vue-croppie 
            ref="croppieRef" 
            :enableOrientation="true"
            :mouseWheelZoom="false"
            :enableResize="false"
            :showZoomer="false"
            :viewport="{ width: 200, height: 200, type: 'square' }"
            :boundary="{ width: 300, height: 300 }"
            @result="fn1"
            @update="fn2">
        </vue-croppie>
        </div>
        <div v-else>
            <p>{{file.name}}</p>
        </div>
        <p v-if="error">{{error.join(', ')}}</p>
        <button @click="$emit('remove', name)">Delete</button>
       
    </div>
</template>
<script>
import  helper, {isImage} from 'vuejs-object-helper';
//import VueCropper from 'vue-cropperjs';

export default {
    name: 'LQ-FileReader',
    props: {
        file :{
            type: File,
            required: true
        },
        name: {
            type: String,
            required: true,
        },
        elementName:{
            type: String,
            required: true
        }
    },
    components:{
        //VueCropper
    },
    data: function () {

        return {
            isImage: null,
            result: null,
            loading: false,
            formName: null,
            //cropImage: null
        }
    },
    computed: {
        error: function () {
            console.log('this.name]', this.name, this.formName);
			return helper.getProp(this.$store.state.form, [this.formName, 'errors', this.name], null);
		}
    },
    created() {
        this.formName = this.getParent().formName;
        console.log('This........', this);
        this.readFile();
        
    },
    watch:{
        result: function (newVal, oldVal) {
            //console.log('ddddddd', newVal, oldVal);
            this.$nextTick(() => {
                this.$refs.croppieRef.bind({
                    url: newVal
                })
            })
        },
        file: function () {
            this.readFile();
        }
    },
    methods: {
        delete: function () {
            console.log('Native Event to delete..')
        },
        cropImage: function (cropImage) {
            console.log('cropImage', cropImage)
        },
        getParent: function (parent) {
			parent = !parent ? this.$parent : parent;
			
			if(parent.formName !== undefined) {
				return parent;
			}
			else {
				return this.getParent(parent.$parent);
			}
        },
        fn1: function () {},
        fn2: function () {},
        readFile: function () {

            let fReader = new FileReader();
            this.loading = true;

            fReader.onload = (e) => {

                this.isImage  =  isImage(e.target.result) ? true : false;
                this.loading = false;
                this.result = e.target.result;
                //this.trick
            }
            fReader.readAsDataURL(this.file);
        }
    }
}
</script>

