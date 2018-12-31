export default {

	email: {
		email: true,
		presence: {
			allowEmpty: false
		}
	},
	name: {
		presence: {
			allowEmpty: false
		}
	},
	line1: {
		presence: {
			allowEmpty: false
		}
	},
	proof: {
		presence: {
			allowEmpty: false
		}
	},
	username: {

		presence: {
			allowEmpty: false
		},
		serverValidation : function (value) {

			return new Promise(function (resolve, reject) {
				
				setTimeout(function () {
					if(value.value ==='test') {

						resolve();
					}
					else {
						console.log('InputValue: ', value.value);
						resolve(['Username should be unique.'])
					}
				}, 2000);
			})
		}
	} 
}