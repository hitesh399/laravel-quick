<template>
    <div>
        Test,,,............
    </div>
</template>
<script>
export default {
    name: 'LQ-FileReader',
    props: {
        file :{
            type: File,
            required: true
        }
    },
    created() {

        console.log('This........', this.file);
        let fReader = new FileReader();
        fReader.onload = function(e) {

        }
        fReader.readAsDataURL(this.file);
    }
}
</script>

