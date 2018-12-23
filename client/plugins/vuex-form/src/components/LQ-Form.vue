<template>
	<form>
		<slot>
		</slot>
	</form>
</template>
<script type="text/javascript">
	import form from '../mixins/form';
	export default {
		name: 'LQ-Form',
		inheritAttrs: true,
		mixins: [form]
	}

</script>