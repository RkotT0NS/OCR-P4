# Security Policy

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 1.0.x   | :white_check_mark: |
| < 1.0   | :x:                |

## Reporting a Vulnerability

If you discover a security vulnerability within this project, please send an e-mail to the project maintainer. All security vulnerabilities will be promptly addressed.

## Authentication & Authorization

### Stack
- **Authentication:** Managed via **Laravel Fortify** and **Laravel Sanctum**.
- **Session Management:** Secure, HTTP-only cookies are used for session management.
- **CSRF Protection:** Standard Laravel CSRF protection is enabled for all web routes.

### Best Practices

1. **Environment Variables:** Never commit `.env` files. Ensure `APP_KEY` is generated and unique for each environment.
2. **Database:** Ensure the database user has restricted privileges appropriate for the application's needs.
3. **File Uploads:** Uploads are handled via **Tus-PHP**. Ensure the storage directory is not directly executable and validates file types strictly (managed by the application logic).

## Two-Factor Authentication (2FA)

This application supports Two-Factor Authentication via Laravel Fortify. Users are encouraged to enable 2FA in their profile settings for enhanced security.
