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
            :enableZoom="true"
            :mouseWheelZoom="false"
            :enableResize="false"
            :showZoomer="true"
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
      
        thumbnails:  Array, // [{width: 100, height: 100, type: 'square'}]
        boundary: Object, //{ width: 300, height: 300 } 
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

        
    }
}
</script>

