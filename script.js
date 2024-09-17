	$(document).ready(function(){
		// PREVENT RESUBMIT ON REFRESH AND BACK BUTTON
		if (window.history.replaceState) {
			window.history.replaceState(null, null, window.location.href);
		}

		let $image = $('#image'),
		$fname = $('#firstname'),
		$lname = $('#lastname'),
		$email = $('#email'),
		$mob = $('#mob'),
		$dob = $('#dob'),
		$password = $('#password'),
		$state = $('#state'),
		$experience = $('#exp'),
		$gender = $('input[name="gender"]'),
		$intAreas = $('#area-int'),
		$qual = $('#qualifications'),
		$terms = $('#terms');

		let $imgError = $('#img-error'),
		$fnameError = $('#fname-error'),
		$lnameError = $('#lname-error'),
		$emailError = $('#email-error'),
		$mobError = $('#mob-error'),
		$dobError = $('#dob-error'),
		$passwordError = $('#password-error'),
		$stateError = $('#state-error'),
		$expError = $('#exp-error'),
		$genderError = $('#gender-error'),
		$fieldError = $('#int-error'),
		$qualError = $('#qual-error'),
		$termError = $('#term-error'),
		$submitError = $('#submit-error');

		//PROFILE PHOTO
		function validateImg() {
			let file = $image[0].files[0],
			maxSize = 2 * 1024 * 1024,
			allowedExtensions = /(\.jpg|\.jpeg|\.png)$/i;

			if (!$image[0].files || $image[0].files.length===0) {
			$imgError.text("*Please upload your image");
			return false;
			} else if (!allowedExtensions.exec(file.name)) {
				$imgError.text("*Only jpg, jpeg, png formats are supported");
				return false;
			}else if (file.size > maxSize) {
				$imgError.text("*Image size cannot exceed 2MB");
				return false;
			}else{
				$imgError.text('');
				return true;
			}
		}
		//VALIDATING BASIC INFORMATIONS
		function validateFields($id,$error,$pattern,$errorField){
			let value=$id.val();
			if(!value.length){
				$error.text("*Please enter your"+' '+$errorField);
				return false;
			}
			else if(!$pattern.test(value)){
				$error.text("*Please enter valid"+' '+$errorField);
				return false;
			}
			else{
				$error.text('');
				return true;
			}
			
		}
		//FIRST NAME
		function validateFname() {
			let $pattern = /^[A-Za-z]+(\s[A-Za-z]+)?$/;
			return validateFields($fname,$fnameError,$pattern,"firstname");
		}
		//LAST NAME
		function validateLname(){
			let $pattern = /^[A-Za-z]+(\s[A-Za-z]+)?$/;
			return validateFields($lname,$lnameError,$pattern,"lastname");
		}
		//EMAIL
		function validateEmail() {
			let $pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
			return validateFields($email,$emailError,$pattern,"email");
		}
		//MOBILE
		function validateMob() {
			let $pattern = /^[6-9]\d{9}$/;
			return validateFields($mob,$mobError,$pattern,"mobile");
		}		
		//DOB
		function validateDob() {
			let $pattern = /^\d{4}-\d{2}-\d{2}$/;
			return validateFields($dob,$dobError,$pattern,"Date of birth");
		}		
		//PASSWORD
		function validatePassword() {
			let $pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
			return validateFields($password,$passwordError,$pattern,"password");
		}
				
		//VALIDATING ADDITIONAL INFORMATIONS
		function validateAddInfo($id,$error,$errorField){
			let value = $id.val();
			if(!value.length){
				$error.text("*Please enter your"+' '+$errorField);
				return false;
			}
			else{
				$error.text('');
				return true;
			}
		}		
		//STATE
		function validateState() {
			return validateAddInfo($state,$stateError,"state");
		}		
		//EXPERIENCE
		function validateExp() {
			let value = $experience.val();
			if (!value.length || isNaN(value) || value < 0 || !Number.isInteger(Number(value))) {
				$expError.text("*Please enter valid experience in years");
				return false;
			} else {
				$expError.text('');
				return true;
			}
		}
		//GENDER
		function validateGender() {
			if ($gender.is(':checked')) {
				$genderError.text('');
				return true;
			} else {
				$genderError.text("Gender should be specified");
				return false;
			}

		}		
		//AREA OF INTEREST
		function validateIntArea() {
			return validateAddInfo($intAreas,$fieldError,"interested areas");
		}
		//QUALIFICATIONS
		function validateQual() {
			return validateAddInfo($qual,$qualError,"qualifications");
		}
		//TERMS
		function validateTerms() {
			if(!$terms.is(':checked')) {
				$termError.text("*Please accept the terms and conditions");
				return false;
			} else {
				$termError.text('');
				return true;
 			}

		}		
		//VALIDATION WITH EVENTS
		$image.on('change',validateImg);
		$fname.on('keyup',validateFname);
		$lname.on('keyup',validateLname);
		$email.on('keyup',validateEmail);
		$mob.on('keyup',validateMob);
		$dob.on('change',validateDob);
		$password.on('keyup',validatePassword);
		$state.on('change',validateState);
		$experience.on('change',validateExp);
		$experience.on('keyup',validateExp);
		$gender.on('click',validateGender);
		$intAreas.on('keyup',validateIntArea);
		$qual.on('keyup',validateQual);
		$terms.on('change',validateTerms);

		// FORM SUBMISSION
		function validateForm(event) {
			let isValid = true;

			if (!validateImg()) isValid = false;
			if (!validateFname()) isValid = false;
			if (!validateLname()) isValid = false;
			if (!validateEmail()) isValid = false;
			if (!validateMob()) isValid = false;
			if (!validateDob()) isValid = false;
			if (!validatePassword()) isValid = false;
			if (!validateState()) isValid = false;
			if (!validateExp()) isValid = false;
			if (!validateGender()) isValid = false;
			if (!validateIntArea()) isValid = false;
			if (!validateQual()) isValid = false;
			if (!validateTerms()) isValid = false;
			
			if (!isValid) {
				event.preventDefault();
				$submitError.text("Complete the form");
				setTimeout(function(){
					$submitError.text('');
				}, 5000);
			}
		}
		
		// BIND FORM SUBMITTING EVENT
		$('.form').on('submit', validateForm);
	});
	