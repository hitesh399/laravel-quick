<template>
<el-container>
  <el-header>Header</el-header>
  <el-main>
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
							<td><lq-text id="username" :rules="rules.username" validate-event="keyup" class="form-control" /></td>
						</tr>
						<tr>
							<td>Photo</td>
							<td>
								<lq-file :max-no-of-files="1" id="photo" acceptedFiles="image/*"/>
							</td>
						</tr>
						<tr>
							<td>Addresses:</td>
							<td><button @click="push('addresses', {})">Add</button></td>
						</tr>
						<tr>
							<td colspan="2">
								<table>
									<tr v-for="(address, address_index) in getElement(`addresses`, {})" :key="`address_row${address_index}`">
										<td>
											<lq-text :id="`addresses.${address_index}.line1`" class="form-control" placeholder="Line 1" :rules="rules.line1"/>
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
											<lq-file  :id="`addresses.${address_index}.proof`" :max-no-of-files="2" :rules="rules.proof"/>
										</td>
										<td>
											<button @click="remove(`addresses.${address_index}`)">Remove</button>
										</td>
									</tr>
								</table>
							</td>
						</tr>
					</table>
					<button @click="submit">Submit</button>
				</td>

				<td>
					<pre>
						<code>
						{{formValues}}
						</code>
					</pre>
					
				<!-- <pre>
					<json-viewer :value="getErrors()"></json-viewer>
				</pre> -->
				</td>
			</tr>
		</table>
  </el-main>
</el-container>

</template>

<script type="text/javascript">
	import form from '../../../mixins/form';
	import lqText from '../../text/LQ-Text';
	import lqFile from '../../file/LQ-File';
	import validationRule from './MyProfileValidation';
	import LqFileReader from '../../fileReader/LQ-FileReader';
	export default {
		name: 'example-text-form',
		inheritAttrs: true,
		mixins: [form],
		components: {
			lqText,
			lqFile,
			LqFileReader
		},
		data: function () {

			return {
				rules: validationRule
			}
		},
		methods: {
			test : function (w, value) {
				console.log('W', w);
				alert('ok.dd..'+ value)
			}
		}
	}
</script>