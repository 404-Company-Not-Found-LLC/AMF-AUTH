const express = require('express');
const { authenticator } = require('otplib');

const app = express();
const PORT = 4000;

// Middleware to parse JSON bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Route to generate and return a TOTP token
app.post('/generate-totp', (req, res) => {
	const secret = req.body.auth; // Get the secret key from the request body

	if (!secret) {
		return res.status(400).send({ error: 'No secret key provided.' });
	}

	try {
		// Generate a TOTP token using the secret
		const token = authenticator.generate(secret);
		res.json({ token: token });
	} catch (error) {
		res.status(500).send({ error: 'Failed to generate TOTP token.' });
	}
});

app.listen(PORT, () => {
	console.log(`Server running on http://localhost:${PORT}`);
});

/*

curl -X POST http://localhost:4000/generate-totp \
-H "Content-Type: application/json" \
-d '{"auth":"YOUR_SECRET_KEY_HERE"}'



*/
