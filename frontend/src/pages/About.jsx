import React from "react";
import { Link } from "react-router-dom";

const About = () => (
  <main className="about-page">
    <section className="about-hero">
      <div className="about-brand-mark" aria-hidden="true">
        <img src="/ShopNestLogo.png" alt="" />
      </div>
      <p className="about-eyebrow">A little about us</p>
      <h1>Good finds, made easy.</h1>
      <p className="about-intro">
        ShopNest brings together useful pieces for your home, everyday style,
        and the moments in between. Browse at your own pace and find something
        that feels right for you.
      </p>
      <Link to="/shop" className="btn">Explore the shop</Link>
    </section>

    <section className="about-values" aria-label="What you can find at ShopNest">
      <article className="about-value-card">
        <span className="about-value-number">01</span>
        <h2>Everyday useful</h2>
        <p>Discover practical picks across electronics, clothing, home, and more.</p>
      </article>
      <article className="about-value-card">
        <span className="about-value-number">02</span>
        <h2>Easy to explore</h2>
        <p>Search the collection, compare the details, and find what suits you.</p>
      </article>
      <article className="about-value-card">
        <span className="about-value-number">03</span>
        <h2>Made for your routine</h2>
        <p>From a fresh desk setup to a new everyday essential, start here.</p>
      </article>
    </section>

    <section className="about-note">
      <div>
        <p className="about-eyebrow">Welcome to the nest</p>
        <h2>Your next favorite find might be just around the corner.</h2>
      </div>
      <Link to="/shop" className="about-text-link">Browse all products <span aria-hidden="true">→</span></Link>
    </section>
  </main>
);

export default About;
