# TOTP GENERATOR

TOTP GENERATOR is a Chrome extension that generates Time-based One-Time Passwords (TOTP) for Two-Factor Authentication (2FA) security. With this extension, users can quickly generate secure OTP codes for websites and services that require 2FA, enhancing account security.

## Features

- Generate TOTP codes based on predefined secrets.
- Copy the TOTP code directly to your clipboard.
- Easy-to-use popup interface for quick access to codes.

## Installation

1. Clone or download the repository.
2. Open Chrome and navigate to `chrome://extensions/`.
3. Enable **Developer mode** by toggling the switch in the top right corner.
4. Click on **Load unpacked** and select the folder containing the extension files.
5. The extension should now appear in the extensions toolbar.

## Usage

1. Click on the TOTP GENERATOR icon in the Chrome toolbar.
2. The extension popup will display TOTP codes for the saved keys.
3. Click the copy icon next to each TOTP code to copy it to your clipboard.
4. Paste the TOTP code in the 2FA input field of the service you're using.

## Files

- `manifest.json`: Configuration file for the Chrome extension.
- `popup.html`: HTML file for the extension's popup UI.
- `popup.js`: JavaScript file that handles TOTP generation and copy functionality.
- `icon.png`: Icon displayed for the extension in the Chrome toolbar.

## Permissions

The extension requires the following permissions:

- `clipboardWrite`: Allows the extension to copy TOTP codes to the clipboard for easy use.

## License

This project is licensed under the MIT License.

---

**Note**: TOTP GENERATOR is designed for convenience but does not store or encrypt keys. Ensure your TOTP secrets are managed securely.

