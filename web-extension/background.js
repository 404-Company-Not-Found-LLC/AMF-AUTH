document.getElementById('testCode').addEventListener('click', function () {
	console.log('testCode clicked');

	const res = browser.storage.local.get('key');
	console.log(res);

	browser.storage.local.get('key').then((result) => {
		var totp = new jsOTP.TOTP();
		var token = totp.getOtp(result.key);
		console.log(token); // Log the token to the console
	});
});
