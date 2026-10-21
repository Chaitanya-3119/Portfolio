"use client";

import { useState } from "react";
import Image from "next/image";

type Props = {
  liveUrl?: string;
  fallbackImage?: string;
  alt: string;
  title: string;
  priority?: boolean;
};

// thum.io serves a free, no-key homepage capture. We try the live capture first
// so the shot stays current as the real UI changes, and fall back to whatever
// image was uploaded if the capture fails or the project isn't deployed.
function liveCaptureUrl(url: string) {
  return `https://image.thum.io/get/width/1200/crop/750/noanimate/${url}`;
}

export default function ProjectScreenshot({
  liveUrl,
  fallbackImage,
  alt,
  title,
  priority,
}: Props) {
  const [imgFailed, setImgFailed] = useState(false);
  const [liveFailed, setLiveFailed] = useState(false);

  // Prioritize the custom uploaded image (e.g. from Cloudinary)
  // Fall back to automated liveCaptureUrl only if no image is uploaded or it fails
  const hasUploaded = Boolean(fallbackImage) && !imgFailed;
  const canTryLive = Boolean(liveUrl) && !liveFailed;

  const src = hasUploaded
    ? (fallbackImage as string)
    : canTryLive
    ? liveCaptureUrl(liveUrl as string)
    : undefined;

  const handleError = () => {
    if (hasUploaded) {
      setImgFailed(true);
    } else {
      setLiveFailed(true);
    }
  };

  if (!src) {
    return (
      <div
        className="flex h-full w-full items-center justify-center"
        style={{
          background:
            "radial-gradient(120% 100% at 20% 0%, rgba(216,255,62,0.1), transparent 60%), #101014",
        }}
      >
        <span className="px-6 text-center font-serif text-3xl tracking-tight opacity-75">
          {title}
        </span>
      </div>
    );
  }

  return (
    <Image
      key={src}
      src={src}
      alt={alt}
      fill
      sizes="(min-width: 1024px) 960px, 100vw"
      priority={priority}
      className="h-full w-full object-cover object-top transition-transform duration-500"
      onError={handleError}
    />
  );
}
