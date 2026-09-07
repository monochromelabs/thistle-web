import heroImg from "./assets/thistle.png";
import desktopLightImg from "./assets/thistle-desktop-light-mac.png";
import desktopDarkImg from "./assets/thistle-desktop-dark-mac.png";
import windowsLightImg from "./assets/thistle-desktop-light-windows.png";
import windowsDarkImg from "./assets/thistle-desktop-dark-windows.png";
import wordmarkImg from "./assets/thistle-wordmark.png";
import backgroundVideo from "./assets/background.mp4";
import "./App.css";
import { useEffect, useRef, useState } from "react";

const desktopVariants = [
  "windows-light",
  "mac-light",
  "windows-dark",
  "mac-dark",
] as const;

function App() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const reverseFrameRef = useRef<number | null>(null);
  const lastReverseTimeRef = useRef<number | null>(null);
  const playbackDirectionRef = useRef<"forward" | "reverse">("forward");
  const [activeDesktop, setActiveDesktop] = useState<
    "mac-light" | "mac-dark" | "windows-light" | "windows-dark"
  >("mac-light");

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveDesktop((desktop) => {
        const currentIndex = desktopVariants.indexOf(desktop);
        return desktopVariants[(currentIndex + 1) % desktopVariants.length];
      });
    }, 5000);

    return () => window.clearInterval(interval);
  }, []);

  useEffect(() => {
    const video = videoRef.current;

    return () => {
      if (reverseFrameRef.current !== null) {
        window.cancelAnimationFrame(reverseFrameRef.current);
      }
      video?.pause();
    };
  }, []);

  const showNextDesktop = () => {
    setActiveDesktop((desktop) => {
      const currentIndex = desktopVariants.indexOf(desktop);
      return desktopVariants[(currentIndex + 1) % desktopVariants.length];
    });
  };

  const reverseVideo = (timestamp: number) => {
    const video = videoRef.current;
    if (!video || !video.duration) {
      return;
    }

    const lastTimestamp = lastReverseTimeRef.current ?? timestamp;
    const elapsedSeconds = (timestamp - lastTimestamp) / 1000;
    lastReverseTimeRef.current = timestamp;
    video.currentTime = Math.max(0, video.currentTime - elapsedSeconds);

    if (video.currentTime <= 0.01) {
      video.currentTime = 0;
      lastReverseTimeRef.current = null;
      playbackDirectionRef.current = "forward";
      void video.play();
      return;
    }

    reverseFrameRef.current = window.requestAnimationFrame(reverseVideo);
  };

  const handleVideoEnded = () => {
    const video = videoRef.current;
    if (
      !video ||
      !video.duration ||
      playbackDirectionRef.current === "reverse"
    ) {
      return;
    }

    playbackDirectionRef.current = "reverse";
    video.pause();
    video.currentTime = video.duration;
    lastReverseTimeRef.current = null;
    reverseFrameRef.current = window.requestAnimationFrame(reverseVideo);
  };

  return (
    <main>
      <header className="site-header">
        <video
          ref={videoRef}
          className="hero-video"
          src={backgroundVideo}
          autoPlay
          muted
          playsInline
          onCanPlay={() => void videoRef.current?.play()}
          onEnded={handleVideoEnded}
          aria-hidden="true"
        />
        <nav className="page-section nav" aria-label="Main navigation">
          <a className="wordmark" href="#top" aria-label="Thistle home">
            <img className="wordmark-icon" src={heroImg} alt="" />
            <img className="wordmark-image" src={wordmarkImg} alt="Thistle" />
          </a>
        </nav>
        <section className="page-section hero-section" id="top">
          <div className="hero-copy">
            <p className="hero-title">
              Your work,
              <br />
              <em>in full bloom.</em>
            </p>
            <p className="hero-description">
              Thistle makes AI more secure, sustainable, and accessible by
              running inference locally, on the hardware you already have.
            </p>
            <div className="hero-actions">
              <a className="button button-primary" href="#downloads">
                Desktop app
              </a>
              <a className="text-link" href="#packages">
                Developers
              </a>
            </div>
          </div>
          <div
            className="hero-art"
            aria-label="Screenshot of the Thistle desktop app."
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
            <div className="desktop-previews">
              <img
                className={`desktop-preview desktop-preview-mac ${
                  activeDesktop === "mac-light" ? "desktop-preview-active" : ""
                }`}
                src={desktopLightImg}
                alt="Thistle desktop app in light mode"
              />
              <img
                className={`desktop-preview desktop-preview-mac ${
                  activeDesktop === "mac-dark" ? "desktop-preview-active" : ""
                }`}
                src={desktopDarkImg}
                alt="Thistle desktop app in dark mode"
              />
              <img
                className={`desktop-preview desktop-preview-windows ${
                  activeDesktop === "windows-light"
                    ? "desktop-preview-active"
                    : ""
                }`}
                src={windowsLightImg}
                alt="Thistle desktop app in Windows light mode"
              />
              <img
                className={`desktop-preview desktop-preview-windows ${
                  activeDesktop === "windows-dark"
                    ? "desktop-preview-active"
                    : ""
                }`}
                src={windowsDarkImg}
                alt="Thistle desktop app in Windows dark mode"
              />
            </div>
          </div>
        </section>
      </header>
      <section className="page-section downloads-section" id="downloads">
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
            className="download-card"
            href="https://thistle-demo.s3.us-east-1.amazonaws.com/Thistle.dmg"
            download="Thistle.dmg"
          >
            <span className="card-icon card-icon-macos">⌘︎</span>
            <div>
              <p className="card-title">macOS</p>
              <p>Recommended system requirements:</p>
              <ul className="system-specs">
                <li>macOS 26 (Tahoe) or later</li>
                <li>8 GB unified memory minimum</li>
              </ul>
            </div>
          </a>
          <a
            className="download-card"
            href="https://thistle-demo.s3.us-east-1.amazonaws.com/Thistle-Setup.exe"
            download="Thistle-Setup.exe"
          >
            <span className="card-icon card-icon-windows">⊞︎</span>
            <div>
              <p className="card-title">Windows</p>
              <p>Recommended system requirements:</p>
              <ul className="system-specs">
                <li>Windows 11 or later</li>
                <li>DirectX 12 GPU or integrated graphics</li>
              </ul>
            </div>
          </a>
        </div>
      </section>
      <section className="page-section packages-section" id="packages">
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
            <b>View on GitHub</b>
          </a>
          {/* <a className="package-row" href="#react-package">
            <span className="package-symbol package-symbol-react">⚛</span>
            <span>
              <strong>React package</strong>
              <small>A foundation for local-first products</small>
            </span>
            <b>Explore package</b>
          </a> */}
        </div>
      </section>
      <footer className="page-section">
        <span>© 2026 Thistle, an MONOCHROME Initiative.</span>
      </footer>
    </main>
  );
}

export default App;
