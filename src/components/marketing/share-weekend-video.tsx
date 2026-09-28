"use client";

import { getImageProps } from "next/image";
import { Play } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { MouseEvent } from "react";

// Keep in sync with the portrait breakpoint for `.weekend-video` in globals.css.
const portraitQuery = "(max-width: 640px)";

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
};

export function ShareWeekendVideo({ className, sizes, priority = false }: ShareWeekendVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
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
