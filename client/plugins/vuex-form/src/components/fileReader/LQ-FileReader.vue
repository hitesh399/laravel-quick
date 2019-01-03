<template>
    <div>
        <div v-if="loading || !result">
            loading...
        </div>
        <div v-else-if="isImage && result">
            <!-- <img :src="result" :alt="file.name" /> -->
   
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
import {getFormName} from '../helper';

export default {
    name: 'LQ-FileReader',
    props: {
        crop: Object,
        // crop: {
        //      // [{width: 100, height: 100, type: 'square'}]
        //     boundary: Object, //{ width: 300, height: 300 } 
        // },
        thumbnails:  Array,
        createThumbnails: {
            type: Boolean,
            required: false,
            default: () => true
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
            formName: null,
            loading: false
        }
    },
    computed: {
        file: function () {
            return helper.getProp(this.$store.state.form, `${this.formName}.values.${this.elementName}.file`, null);
        }
    },
    created: function () {
        this.readFile();
    },
    watch: {

        file: function () {
            this.readFile();
        }
    },
    methods: {
        
        readFile: function () {  
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
            helper.isArray(this.thumbnails)
        }

    }
}
</script>

