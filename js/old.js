const { authenticator } = require('otplib');
const express = require('express');

// Your secret key from the Microsoft Authenticator app
// Normally, the secret is base32 encoded. Ensure it is correctly formatted.

const secret = 'YOUR_SECRET_KEY_HERE';

// Generate a TOTP token using the secret
const token = authenticator.generate(secret);

console.log(`Current TOTP token: ${token}`);
