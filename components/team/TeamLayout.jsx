<Layout
  title={title}
  head={<link rel="stylesheet" href={staticAsset('/team.css')} />}
  pageID="team"
>
  <main class="sidebar-layout container">
    <aside id="sidebar" class="sidebar-layout__sidebar">
      <div>
        <h3>Key Creatives</h3>
        <ul>
          <li>
            <a
              class={match('/team/rosanne') ? 'active' : null}
              href={`/team/rosanne${isMobile ? '#rosanne' : ''}`}
            >
              Rosanne Howell
            </a>
          </li>
          <li>
            <a
              class={match('/team/caitlyn') ? 'active' : null}
              href={`/team/caitlyn${isMobile ? '#caitlyn' : ''}`}
            >
              Caitlyn Cardoza
            </a>
          </li>
          <li>
            <a
              class={match('/team/elisha') ? 'active' : null}
              href={`/team/elisha${isMobile ? '#elisha' : ''}`}
            >
              Elisha Kantor
            </a>
          </li>
          <li>
            <a
              class={match('/team/myrka') ? 'active' : null}
              href={`/team/myrka${isMobile ? '#myrka' : ''}`}
            >
              Myrka Sanchez
            </a>
          </li>
        </ul>
      </div>
      <div>
        <h3>Collaborators</h3>
        <ul>
          <li>
            <a href="http://zeuspic.com/" target="_blank" rel="noreferrer">
              Zeus Pictures
            </a>
          </li>
          <li>
            <a
              href="https://www.adrianbobb.com/"
              target="_blank"
              rel="noreferrer"
            >
              Exocentric
            </a>
          </li>
          <li>
            <a
              href="https://www.lanaigabriel.com/"
              target="_blank"
              rel="noreferrer"
            >
              La-Nai Gabriel
            </a>
          </li>
        </ul>
      </div>
    </aside>
    <section class="sidebar-layout__content">{children}</section>
  </main>
</Layout>;
