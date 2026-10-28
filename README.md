# ELEVATE-SDE-Task-2 --- CredVault

CredVault is a frontend demonstration of a certificate request,
tracking, issuing, and verification platform. It is built with HTML,
CSS, and JavaScript and uses demo data; it does not include a production
backend or database.

## Features

-   Submit a certificate request with form validation
-   Track an application by Application ID
-   Verify a certificate by Certificate ID
-   Admin login demo
-   Admin application management: issue or reject applications
-   Admin certificate management: revoke certificates
-   Shared browser state using `localStorage`
-   Light and dark mode styling

## Technologies Used

-   HTML
-   CSS
-   JavaScript
-   Python's built-in HTTP server for local testing

## How to Run Locally

No package installation or build step is required.

1.  Download or clone this repository.

2.  Open the project folder in VS Code.

3.  Open **Terminal → New Terminal**.

4.  Run:

    ``` bash
    python -m http.server 8000
    ```

    On Windows, if needed, use `py -m http.server 8000`.

5.  Open `http://localhost:8000` in your browser.

6.  Keep the terminal open while testing the website.

You can also open `index.html` directly in a browser, although running
the local server is recommended.

## Pages

  ---------------------------------------------------------------------------------
  Page                    File                              Purpose
  ----------------------- --------------------------------- -----------------------
  Home                    `index.html`                      Main landing page and
                                                            navigation

  Request Certificate     `request/index.html`              Submit a certificate
                                                            request

  Track Application       `track/index.html`                Check an application
                                                            status

  Verify Certificate      `verify/index.html`               Check certificate
                                                            validity

  Admin Login             `admin/login/index.html`          Demo admin sign-in

  Admin Applications      `admin/applications/index.html`   Issue or reject
                                                            applications

  Admin Certificates      `admin/certificates/index.html`   Revoke certificates
  ---------------------------------------------------------------------------------

## Demo Credentials and Data

**Demo admin login** - Username: `admin` - Password: `admin`

**Example application IDs** - `APP-0001` --- Approved - `APP-0002` ---
Pending - `APP-0004` --- Rejected

**Example certificate IDs** - `CERT-1001` --- Valid - `CERT-1003` ---
Revoked

The demo stores data in the browser's `localStorage`. Use **Reset demo
data** on the Admin Applications page to restore the initial demo data.

> These credentials and records are for demonstration only. Do not use
> this demo login or storage approach for a production system.

## Project Structure

``` text
ELEVATE-SDE-Task-2/
├── index.html
├── request/
│   └── index.html
├── track/
│   └── index.html
├── verify/
│   └── index.html
├── admin/
│   ├── login/
│   │   └── index.html
│   ├── applications/
│   │   └── index.html
│   └── certificates/
│       └── index.html
├── assets/
│   ├── app.js
│   └── style.css
└── screenshots/
```

## Limitations

This is a frontend internship task/demo. Data is stored locally in the
browser and is not shared between different browsers or devices. A real
deployment would need a secure backend, database, authentication, and
authorization.

## Future Improvements

-   Add a backend API and database
-   Implement secure admin authentication
-   Add server-side validation and audit logs
-   Deploy the application to a hosting platform

## Internship

-   Organization: ELEVATE Skill Development
-   Task: Software Development Engineer Internship --- Task 2
