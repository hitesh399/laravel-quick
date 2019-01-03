<template>
    <div>
        <input :multiple="isMultiple()" type="file" @change="handleFileChange" :id="id" :name="makeElementName()"/>
        <div v-if="(!maxNoOfFiles || maxNoOfFiles >1) && LQElement">
            <lq-file-reader v-for="(item, index) in LQElement" :elementName="makeElementName()" :key="`${id}_preview${index}`"  v-on:remove="deleteFile" :name="`${id}._preview.${index}`" :file="item.file" />
        </div>
        <div v-else-if="LQElement && LQElement.file">
            <lq-file-reader :key="`${id}_preview`" :elementName="makeElementName()" :name="`${id}._preview`" :file="LQElement.file" v-on:remove="deleteFile" />
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
