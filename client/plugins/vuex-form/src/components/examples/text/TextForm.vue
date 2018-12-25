<template>
	<div>
	 <h1> Text Element Examples</h1>

	 <table>
	 	<tr>
	 		<td>
	 			<table>
					<tr>
						<td>Name</td>
						<td><lq-text id="name" class="form-control" :rules="rules.name" validate-event="blur" /> </td>
					</tr>
					<tr>
						<td>Email</td>
						<td><lq-text id="email" class="form-control" :rules="rules.email" validate-event="blur" /></td>
					</tr>

					<tr>
						<td>User Name</td>
						<td><lq-text id="username" class="form-control" /></td>
					</tr>

					<tr>
						<td>Addresses:</td>
						<td><button @click="push('addresses', {})">Add</button></td>
					</tr>
					<tr>
						<td colspan="2">
							<table>
								<tr v-for="(address, address_index) in getElement(`addresses`, {})">
									<td>
										<lq-text :id="`addresses.${address_index}.line1`" class="form-control" placeholder="Line 1" />
									</td>
									<td>
										<lq-text :id="`addresses.${address_index}.line2`" class="form-control" placeholder="Line 2" />
									</td>
									<td>
										<lq-text :id="`addresses.${address_index}.street`" class="form-control" placeholder="Street" />
									</td>

									<td>
										<lq-text :id="`addresses.${address_index}.landmark`" class="form-control" placeholder="Landmark" />
									</td>
									<td>
										<button @click="remove(`addresses.${address_index}`)">Remove</button>
									</td>
								</tr>
							</table>
						</td>
					</tr>
				 </table>
	 		</td>

	 		<td>
	 			<!-- <pre>
	 				<code>
	 				{{formValues}}
	 				</code>
	 			</pre> -->
	 			<pre>
	 			<json-viewer :value="formValues"></json-viewer>
	 		</pre>
	 		<pre>
	 			<json-viewer :value="getErrors()"></json-viewer>
	 		</pre>
	 		</td>
	 	</tr>
	 </table>
</div>
</template>

<script type="text/javascript">
	import form from '../../../mixins/form';
	import lqText from '../../text/LQ-Text';
	import validationRule from './MyProfileValidation';

	export default {
		name: 'example-text-form',
		inheritAttrs: true,
		mixins: [form],
		components: {
			lqText
		},
		data: function () {

			return {
				rules: validationRule
			}
		},
		methods: {

			addError: function () {

				this.addErrors({'educations.0.name': 'Required'});
			},
			test : function (w, value) {
				console.log('W', w);
				alert('ok.dd..'+ value)
			}
		}
	}
</script>