<Layout
  title="Far &amp; Wide Studios"
  head={<link rel="stylesheet" href={staticAsset('/home.css')} />}
  pageID="home"
>
  <main>
    <section id="hero" class="container">
      <div id="hero-left">
        <img
          id="hero-image"
          src={staticAsset('/images/inspire.png')}
          alt="Inspire poster"
        />
      </div>
      <div id="hero-right">
        <p class="drop-caps">
          When aspiring artist Mina struggles with creative block, her
          subconscience is manifested into Clouse the Cloud, who has a passion
          to become the painting Mina is imagining. Clouse inspires Mina to
          regain her confidence, despite rejection, and together they create a
          masterpiece.
        </p>
        <p>To keep updated on our production, check our social media links!</p>
      </div>
    </section>
    <section id="video">
      <div class="container">
        <div id="video-container">
          <div style={{ padding: '56.25% 0 0 0', position: 'relative' }}>
            <iframe
              src="https://player.vimeo.com/video/542440180?byline=0&portrait=0&title=0&responsive=1"
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
              }}
              frameborder="0"
              allow="autoplay; fullscreen; picture-in-picture"
              allowfullscreen
            />
          </div>
        </div>
      </div>
    </section>
  </main>
  <script src="https://player.vimeo.com/api/player.js" />
</Layout>;
