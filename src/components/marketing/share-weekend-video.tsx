"use client";

import { getImageProps } from "next/image";
import { Play } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { MouseEvent } from "react";

// Keep in sync with the portrait breakpoint for `.weekend-video` in globals.css.
const portraitQuery = "(max-width: 640px)";

// A silent 9-second excerpt that loops behind the play button until someone starts the full video.
const teaserSrc = "/video/share-the-weekend-teaser.mp4";

const renditions = {
  landscape: {
    src: "/video/share-the-weekend-landscape.mp4",
    poster: "/video/share-the-weekend-landscape-poster.jpg",
    width: 1920,
    height: 1000,
  },
  portrait: {
    src: "/video/share-the-weekend-portrait.mp4",
    poster: "/video/share-the-weekend-portrait-poster.jpg",
    width: 1080,
    height: 1840,
  },
} as const;

type Orientation = keyof typeof renditions;

const videoLabel = "Share the weekend: a 49-second FullCourtHQ product video with music and no narration";

type ShareWeekendVideoProps = {
  className?: string;
  /** `sizes` for the landscape poster; the portrait poster is only used on narrow screens. */
  sizes: string;
  /** Load the poster eagerly when the video is the page's main content. */
  priority?: boolean;
  /** Loop a silent excerpt behind the play button on wide screens while the video is in view. */
  teaser?: boolean;
};

export function ShareWeekendVideo({ className, sizes, priority = false, teaser = false }: ShareWeekendVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const teaserRef = useRef<HTMLVideoElement>(null);
  const [orientation, setOrientation] = useState<Orientation | null>(null);

  const {
    props: { srcSet: portraitSrcSet },
  } = getImageProps({
    alt: "",
    src: renditions.portrait.poster,
    width: renditions.portrait.width,
    height: renditions.portrait.height,
    sizes: "min(92vw, 420px)",
  });
  const { props: posterProps } = getImageProps({
    alt: "",
    src: renditions.landscape.poster,
    width: renditions.landscape.width,
    height: renditions.landscape.height,
    sizes,
    loading: priority ? "eager" : "lazy",
    fetchPriority: priority ? "high" : undefined,
  });

  // Only load the teaser for wide screens and viewers who haven't asked for reduced motion, and only
  // play it while it's on screen.
  useEffect(() => {
    if (!teaser || orientation) return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const narrow = window.matchMedia(portraitQuery);
    if (reduceMotion.matches || narrow.matches || !("IntersectionObserver" in window)) return;

    const clip = teaserRef.current;
    const frame = clip?.parentElement;
    if (!clip || !frame) return;

    // Setting the source here, rather than in markup, keeps phones and reduced-motion viewers from
    // downloading it at all.
    clip.src = teaserSrc;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) clip.play().catch(() => {});
        else clip.pause();
      },
      { threshold: 0.25 },
    );
    observer.observe(frame);
    return () => {
      observer.disconnect();
      clip.pause();
    };
  }, [teaser, orientation]);

  // The play link unmounts once playback starts, so hand keyboard focus to the player.
  useEffect(() => {
    if (orientation) videoRef.current?.focus();
  }, [orientation]);

  function handlePlay(event: MouseEvent<HTMLAnchorElement>) {
    const video = videoRef.current;
    if (!video) return;

    event.preventDefault();

    // Pick the rendition once, inside the tap, so iOS allows playback with sound and a
    // later rotation does not swap the video out from under the viewer.
    const next: Orientation = window.matchMedia(portraitQuery).matches ? "portrait" : "landscape";
    const rendition = renditions[next];
    video.poster = rendition.poster;
    video.src = rendition.src;
    setOrientation(next);
    // If the browser still blocks playback, the native controls remain for a manual start.
    video.play().catch(() => {});
  }

  return (
    <div className={className ? `weekend-video ${className}` : "weekend-video"} data-orientation={orientation ?? undefined}>
      <video
        ref={videoRef}
        className="weekend-video__player"
        controls={orientation !== null}
        playsInline
        preload="none"
        aria-label={videoLabel}
        aria-hidden={orientation === null ? true : undefined}
      >
        Your browser can’t play this video. <a href={renditions.landscape.src}>Download the video</a>.
      </video>

      {orientation === null ? (
        <a className="weekend-video__facade" href={renditions.landscape.src} onClick={handlePlay} aria-label={`Play video. ${videoLabel}`}>
          <picture>
            <source media={portraitQuery} srcSet={portraitSrcSet} width={renditions.portrait.width} height={renditions.portrait.height} />
            <img {...posterProps} alt="" className="weekend-video__poster" />
          </picture>
          {teaser ? (
            <video
              ref={teaserRef}
              className="weekend-video__teaser"
              muted
              loop
              playsInline
              preload="none"
              aria-hidden="true"
              tabIndex={-1}
              onPlaying={(event) => (event.currentTarget.dataset.playing = "true")}
            />
          ) : null}
          <span className="weekend-video__play" aria-hidden="true">
            <span className="weekend-video__play-icon">
              <Play size={18} fill="currentColor" strokeWidth={0} />
            </span>
            Watch the video
            <span className="weekend-video__duration">0:49</span>
          </span>
        </a>
      ) : null}
    </div>
  );
}
