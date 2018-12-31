<template>
    <input :multiple="isMultiple()" type="file" @change="handleFileChange"/>
</template>

<script>
import formElement from '../../mixins/formElement';
import fileMixin from './fileMixin';

export default {
    name: 'LQ-File',
    mixins:[formElement, fileMixin],
    inheritAttrs: false,
}
</script>
