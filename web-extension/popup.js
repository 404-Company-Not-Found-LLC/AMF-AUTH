document.getElementById('myButton').addEventListener('click', function () {
	var inputValue = document.getElementById('myInput').value;
	browser.storage.local.set({ key: inputValue });
	displayStoredValue();
});

function displayStoredValue() {
	browser.storage.local.get('key', function (result) {
		if (result.key !== undefined) {
			document.getElementById('displayKeyValue').textContent = result.key;
		} else {
			document.getElementById('displayKeyValue').textContent =
				'No value stored';
		}
	});
}

document.addEventListener('DOMContentLoaded', displayStoredValue);

// popup.js
document.getElementById('testCode').addEventListener('click', function () {
	browser.runtime
		.sendMessage({ action: 'generateOTP' })
		.then((response) => {
			if (response.status === 'success') {
				document.getElementById('generatedCode').textContent = response.otp; // Display the OTP
			} else {
				document.getElementById('generatedCode').textContent =
					response.message + 'error 204'; // Display error message
			}
		})
		.catch((error) => {
			document.getElementById('generatedCode').textContent = 'Error: ' + error;
		});
});