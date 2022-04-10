<head>
  <meta charset="UTF-8" />
  <title>{title}</title>
  <meta
    name="description"
    content="Far and Wide Studios is a fully-remote animation cohort that focuses on stories and 3D animation."
  />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <link
    rel="icon"
    type="image/png"
    href={join(staticPath, '/images/favicon.png')}
  />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="true" />
  <link
    href="https://fonts.googleapis.com/css2?family=Carter+One&display=swap"
    rel="stylesheet"
  />
  <link
    rel="stylesheet"
    href="https://fonts.googleapis.com/css?family=Open+Sans:400,700&display=swap"
  />
  <link rel="stylesheet" href={join(staticPath, '/reset.css')} />
  <link
    rel="stylesheet"
    href={join(staticPath, './fontawesome/css/fontawesome.min.css')}
  />
  <link
    rel="stylesheet"
    href={join(staticPath, './fontawesome/css/brands.min.css')}
  />
  <link rel="stylesheet" href={join(staticPath, '/styles.css')} />
  {children}
</head>;
