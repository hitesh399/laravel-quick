<template>
    <div>
        <input :multiple="isMultiple()" type="file" @change="handleFileChange" :id="id" :name="makeElementName()"/>
        <label :for="id">
            <slot name="button_wrap">
               Browse
            </slot>
        </label>
        <div v-if="(isMultiple() && LQElement)">
            <lq-file-reader v-for="(item, index) in LQElement" 
             :key="`${id}_preview_${index}`" 
             :elementName="`${id}.${index}`" 
             :thumbnails="thumbs" 
             v-on:remove="deleteFile" 
            /> 
        </div>
        <div v-else-if="LQElement && LQElement.file && !isMultiple()">
            <lq-file-reader :key="`${id}_preview`" 
            :elementName="id" 
            :thumbnails="thumbs" 
            v-on:remove="deleteFile" />
        </div>
    </div>
</template>

<script>
import formElement from '../../mixins/formElement';
import fileMixin from './fileMixin';
import VueCropper from 'vue-cropperjs';
import LqFileReader from '../fileReader/LQ-FileReader';

export default {
    name: 'LQ-File',
    mixins:[formElement, fileMixin],
    inheritAttrs: false,
    components: {
        VueCropper,
        LqFileReader
    },
    methods: {

        deleteFile: function (elementName) {
            console.log('Getting......', elementName)
            this.remove(elementName)
        }
    }
}
</script>
<style>
    input[type="file"] {
        visibility: hidden;
    }
</style>
