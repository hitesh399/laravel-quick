<template>
    <div>
        <input :multiple="isMultiple()" type="file" @change="handleFileChange"/>
        <div v-if="!maxNoOfFiles || maxNoOfFiles >1">
            <lq-file-reader v-for="(item, index) in LQElement" :key="`${id}_preview${index}`"  v-on:remove="deleteFile" :name="`${id}.${index}`" :file="item.file" />
        </div>
        <div v-else-if="LQElement.file">
            <lq-file-reader :key="`${id}_preview`" :name="id" :file="LQElement" v-on:remove="deleteFile" />
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
