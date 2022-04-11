<header id="header" class="container">
  <a href="/">
    <h1 id="page-title">Far &amp; Wide Studios</h1>
  </a>
  <nav id="nav">
    <ul>
      <li>
        <a href="/" class={match('/', { exact: true }) ? 'active' : null}>
          Inspire
        </a>
      </li>
      <li>
        <a href="/about" class={match('/about') ? 'active' : null}>
          About Us
        </a>
      </li>
      <li>
        <a href="/team" class={match('/team') ? 'active' : null}>
          Our Team
        </a>
      </li>
    </ul>
  </nav>
</header>;
