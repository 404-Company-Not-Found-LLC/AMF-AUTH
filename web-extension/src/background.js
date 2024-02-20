import { totp } from 'otplib';

// background.js
browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
	if (message.action === 'generateOTP') {
		browser.storage.local
			.get('key')
			.then((result) => {
				if (result.key) {
					const token = totp.generate(result.key);
					console.log(token);
					sendResponse({ status: 'success', otp: token });
				} else {
					sendResponse({ status: 'error', message: 'No key stored' });
				}
			})
			.catch((error) => {
				sendResponse({
					status: 'error',
					message: 'Error retrieving key: ' + error,
				});
			});
		return true; // keep the message channel open for sendResponse
	}
});
