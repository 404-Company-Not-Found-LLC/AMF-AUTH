from flask import Flask, request, jsonify
import pyotp

app = Flask(__name__)

# Function to generate a new TOTP code
def generate_totp_code(secret):
    totp = pyotp.TOTP(secret)
    return totp.now()

@app.route('/generate-totp', methods=['POST'])
def get_totp_code():
    data = request.json
    secret = data.get('secret')
    if not secret:
        return jsonify({"error": "Missing secret"}), 400

    code = generate_totp_code(secret)
    return jsonify({"totp_code": code})

if __name__ == "__main__":
    app.run(debug=True)
