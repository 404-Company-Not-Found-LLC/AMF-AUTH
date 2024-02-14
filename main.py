import pyotp
import tkinter as tk
from functools import partial
import threading
import time

# Function to generate a new TOTP code
def generate_totp_code(secret):
    totp = pyotp.TOTP(secret)
    return totp.now()

# Function to update the label with the current TOTP code
def update_label(label, secret):
    code = generate_totp_code(secret)
    label.config(text=code)
    # Schedule the label to be updated again in 30 seconds
    label.after(30000, update_label, label, secret)

# Function to create the GUI
def create_gui(secret):
    root = tk.Tk()
    root.title("TOTP Authenticator")

    label = tk.Label(root, text="", font=('Arial', 20))
    label.pack(pady=20)

    # Initial update
    update_label(label, secret)

    return root

# Main function to run the application
def main():
    secret = 'base32secretkey'
    print(f"Your secret is: {secret}")

    root = create_gui(secret)
    root.mainloop()

if __name__ == "__main__":
    main()
