use actix_web::{web, App, HttpResponse, HttpServer, Responder};
use serde::{Deserialize, Serialize};
use otpauth::TOTP;

#[derive(Deserialize)]
struct TotpRequest {
    secret: String,
}

#[derive(Serialize)]
struct TotpResponse {
    totp_code: String,
}

async fn generate_totp(info: web::Json<TotpRequest>) -> impl Responder {
    let totp = TOTP::new(&info.secret);
    let totp_code = totp.generate(30, 0); // 30 seconds validity, aligned to current time
    HttpResponse::Ok().json(TotpResponse { totp_code })
}

#[actix_rt::main]
async fn main() -> std::io::Result<()> {
    HttpServer::new(|| {
        App::new()
            .service(web::resource("/generate-totp").route(web::post().to(generate_totp)))
    })
    .bind("127.0.0.1:8080")?
    .run()
    .await
}

