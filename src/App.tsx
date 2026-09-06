import heroImg from "./assets/thistle.png";
import desktopLightImg from "./assets/thistle-desktop-light.png";
import desktopDarkImg from "./assets/thistle-desktop-dark.png";
import wordmarkImg from "./assets/thistle-wordmark.png";
import backgroundVideo from "./assets/background.mp4";
import "./App.css";
import { useEffect, useState, type MouseEvent } from "react";

function App() {
  const [activeDesktop, setActiveDesktop] = useState<"light" | "dark">("light");

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveDesktop((desktop) => (desktop === "light" ? "dark" : "light"));
    }, 5000);

    return () => window.clearInterval(interval);
  }, []);

  const showNextDesktop = () => {
    setActiveDesktop((desktop) => (desktop === "light" ? "dark" : "light"));
  };

  const showWindowsComingSoon = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    window.alert("Coming soon!");
  };

  return (
    <main>
      <header className="site-header">
        <video
          className="hero-video"
          src={backgroundVideo}
          autoPlay
          muted
          loop
          playsInline
          aria-hidden="true"
        />
        <nav className="nav" aria-label="Main navigation">
          <a className="wordmark" href="#top" aria-label="Thistle home">
            <img className="wordmark-icon" src={heroImg} alt="" />
            <img className="wordmark-image" src={wordmarkImg} alt="Thistle" />
          </a>
        </nav>
        <section className="hero-section" id="top">
          <div className="hero-copy">
            <p className="hero-title">
              Your work
              <br />
              <em>in full bloom.</em>
            </p>
            <p className="hero-description">
              Thistle makes AI more secure, sustainable, and accessible by
              running inference locally, on the hardware you already have.
            </p>
            <div className="hero-actions">
              <a className="button button-primary" href="#downloads">
                Desktop app <span aria-hidden="true">↓</span>
              </a>
              <a className="text-link" href="#packages">
                Developers <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
          <div
            className="hero-art"
            aria-label="Preview of the Thistle desktop app. Click to switch appearance."
            role="button"
            tabIndex={0}
            onClick={showNextDesktop}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                showNextDesktop();
              }
            }}
          >
            <div className="orbit orbit-one" />
            <div className="orbit orbit-two" />
            <div className="desktop-previews">
              <img
                className={`desktop-preview ${
                  activeDesktop === "light" ? "desktop-preview-active" : ""
                }`}
                src={desktopLightImg}
                alt="Thistle desktop app in light mode"
              />
              <img
                className={`desktop-preview ${
                  activeDesktop === "dark" ? "desktop-preview-active" : ""
                }`}
                src={desktopDarkImg}
                alt="Thistle desktop app in dark mode"
              />
            </div>
          </div>
        </section>
      </header>
      <section className="downloads-section" id="downloads">
        <div>
          <p className="eyebrow">Security, sustainability, access.</p>
          <p className="shift-title" id="shift-heading">
            Private by default.
            <br />
            <em>Available to more people.</em>
          </p>
          <p className="shift-copy">
            Keep sensitive work on your device, reduce reliance on remote data
            centers, and lower the cost of access to capable AI.
          </p>
        </div>
        <div className="download-grid">
          <a
            className="download-card download-card-dark"
            href="https://thistle-demo.s3.us-east-1.amazonaws.com/Thistle.dmg"
            download="Thistle.dmg"
          >
            <span className="card-icon card-icon-macos">⌘</span>
            <span className="card-arrow">↗</span>
            <div>
              <p className="card-title">macOS</p>
              <p>System Requirements</p>
              <ul className="system-specs">
                <li>Apple silicon M chip</li>
                <li>8 GB unified memory minimum</li>
              </ul>
            </div>
          </a>
          <a
            className="download-card"
            href="#windows"
            onClick={showWindowsComingSoon}
          >
            <span className="card-icon card-icon-windows">⊞</span>
            <span className="card-arrow">↗</span>
            <div>
              <p className="card-title">Windows</p>
              <p>System Requirements</p>
              <ul className="system-specs">
                <li>8 GB RAM minimum</li>
                <li>DirectX 12 GPU or integrated graphics</li>
              </ul>
            </div>
          </a>
        </div>
      </section>
      <section className="packages-section" id="packages">
        <div className="package-intro">
          <p className="eyebrow">Tools for operationalizing local inference.</p>
          <p className="package-title">
            Build with local AI.
            <br />
            <em>Keep control.</em>
          </p>
        </div>
        <div className="package-list">
          <a
            className="package-row"
            href="https://github.com/monochromelabs/react-native-thistle"
            target="_blank"
            rel="noreferrer"
          >
            <span className="package-symbol package-symbol-react">⚛</span>
            <span>
              <strong>React Native package</strong>
              <small>Local inference for native experiences</small>
            </span>
            <b>View on GitHub ↗</b>
          </a>
          {/* <a className="package-row" href="#react-package">
            <span className="package-symbol package-symbol-react">⚛</span>
            <span>
              <strong>React package</strong>
              <small>A foundation for local-first products</small>
            </span>
            <b>Explore package ↗</b>
          </a> */}
        </div>
      </section>
      <footer>
        <span>© 2026 Thistle, an MONOCHROME Initiative.</span>
      </footer>
    </main>
  );
}

export default App;
