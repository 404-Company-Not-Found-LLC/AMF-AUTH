use actix_web::{web, App, HttpResponse, HttpServer, Responder, middleware::Logger};
use libreauth::oath::TOTPBuilder;
use serde::{Deserialize, Serialize};

#[derive(Deserialize)]
struct TotpRequest {
    secret: String,
}

#[derive(Serialize)]
struct TotpResponse {
    totp_code: String,
}

async fn generate_totp_code(totp_request: web::Json<TotpRequest>) -> impl Responder {
    match TOTPBuilder::new().base32_key(&totp_request.secret).finalize() {
        Ok(totp) => {
            let code = totp.generate();
            HttpResponse::Ok().json(TotpResponse { totp_code: code })
        },
        Err(e) => {
            HttpResponse::InternalServerError().body(format!("Error generating TOTP: {}", e))
        }
    }
}

// Function to handle GET requests to /test
async fn test_endpoint() -> impl Responder {
    HttpResponse::Ok().body("AMF-AUTH")
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    std::env::set_var("RUST_LOG", "actix_web=debug");
    env_logger::init();

    HttpServer::new(|| {
        App::new()
            .wrap(Logger::default())
            .service(web::resource("/generate-totp").route(web::post().to(generate_totp_code)))
            // Add the new route for /test
            .route("/test", web::get().to(test_endpoint))
    })
    .bind("127.0.0.1:7000")?
    .run()
    .await
}
