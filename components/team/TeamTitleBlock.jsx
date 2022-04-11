<section class={`title-block ${isReversed ? 'title-block--reversed' : ''}`}>
  <div
    class="title-block__content"
    style={{ backgroundImage: `url(${backsplashImageURL})` }}
  >
    <h2 id={hash} class="title-block__title">
      {title}
    </h2>
    <h3>{subTitle}</h3>
  </div>
  <img src={imageURL} alt={title} class="title-block__image" />
</section>;
