<template>
	<div>
		<input type="text" v-bind="$attrs" v-model="LQText">
		<p v-if="error">{{error}}</p>

	</div>
</template>
<script type="text/javascript">
	import formElement from '../../mixins/formElement';

	export default {

		name: 'LQ-Text',
		mixins:[formElement],
		computed: {

			LQText: {

				get: function () {

					return this.getValue();
				},
				set: function (value) {

					this.setValue(value)
				}
			}
		}
	}
</script>