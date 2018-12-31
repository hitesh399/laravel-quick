<template>
    <div>
        <div v-if="loading || !result">
            loading...
        </div>
        <div v-else-if="isImage && result">
            <img :src="result" :alt="file.name" />
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
        }
    },
    data: function () {

        return {
            isImage: null,
            result: null,
            loading: false,
            formName: null,
        }
    },
    computed: {
        error: function () {
            console.log('this.name]', this.name, this.formName);
			return helper.getProp(this.$store.state.form, [this.formName, 'errors', this.name], null);
		}
    },
    created() {
        this.formName = this.$parent.formName;
        console.log('This........', this.formName);
        
        let fReader = new FileReader();
        this.loading = true;

        fReader.onload = (e) => {

            this.isImage  =  isImage(e.target.result) ? true : false;
            this.loading = false;
            this.result = e.target.result;
        }
        fReader.readAsDataURL(this.file);
    },
    methods: {
        delete: function () {
            console.log('Native Event to delete..')
        }
    }
}
</script>

