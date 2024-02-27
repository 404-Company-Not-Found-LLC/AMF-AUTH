# AutoMultiFactor-AUTH
 
This project sets up a Rust-based web server using Actix-web with TOTP (Time-based One-Time Password) generation capability.

## Features

- **TOTP Generation**: Generates a TOTP code based on a provided secret.
- **Test Endpoint**: A simple GET endpoint for test purposes.

## Endpoints

- `POST /generate-totp`: Accepts a JSON payload with a `secret` field and returns a TOTP code.
- `GET /test`: Returns a static string for testing server responsiveness.

## Usage

1. Ensure Rust and Cargo are installed on your system.
2. Clone the repository and navigate into the project directory.
3. Build and run the project using Cargo:

    ```sh
    cargo run
    ```

4. The server will start running on `127.0.0.1:7000`.

## Dependencies

- `actix-web`: Powerful, pragmatic, and extremely fast web framework for Rust.
- `libreauth`: Library for generating TOTP codes.
- `serde`: Serialization framework for Rust structures.

## Environment

Set the `RUST_LOG` environment variable to `actix_web=debug` for verbose logging output.

## Contributing

Contributions are welcome. Please feel free to submit a pull request or create an issue.

## License

This project is open source and available under the [MIT License](LICENSE).
