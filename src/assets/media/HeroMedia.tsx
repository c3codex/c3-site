interface HeroMediaProps {
  videoSrc: string;
  posterSrc: string;
}

export default function HeroMedia({ videoSrc, posterSrc }: HeroMediaProps) {
  return (
    <div className="relative w-full overflow-hidden">
      <video
        className="w-full h-auto object-contain"
        src={videoSrc}
        poster={posterSrc}
        autoPlay
        muted
        playsInline
        preload="metadata"
      />
    </div>
  );
}
