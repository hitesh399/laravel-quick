<template>
	<div>
		<input type="text" 
		v-bind="$attrs" 
		v-model="LQElement" 
		:id="id" 
		:name="makeElementName()"
		@blur="emitNativeEvent($event)"
		@focus="emitNativeEvent($event)"
		@click="emitNativeEvent($event)"
		@keyup="emitNativeEvent($event)"
		@keypress="emitNativeEvent($event)"
		@keydown="emitNativeEvent($event)"
		 >
		<p v-if="error">{{error.join(', ')}}</p>
	</div>
</template>
<script type="text/javascript">
	
	import formElement from '../../mixins/formElement';

	export default {
		name: 'LQ-Text',
		mixins:[formElement],
		inheritAttrs: false,

		methods: {
			test : function () {

				alert('ok...')
			}
		}
	}
</script>