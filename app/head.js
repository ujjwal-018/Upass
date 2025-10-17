export default function Head() {
  return (
    <>
      {/* Page Title */}
      <title>Upass</title>
      <meta name="description" content="Upass – Your Secure Password Manager" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="author" content="Your Name" />

      {/* Favicon */}
      <link rel="icon" href="/upass.png" />
      <link rel="shortcut icon" href="/upass.png" />
      <link rel="apple-touch-icon" href="/upass.png" />

      {/* Open Graph / Social Sharing */}
      <meta property="og:title" content="Upass – Your Secure Password Manager" />
      <meta property="og:description" content="Manage your passwords securely with Upass." />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://yourdomain.com" />
      <meta property="og:image" content="/upass-social.png" /> {/* Optional social preview image */}
    </>
  );
}
