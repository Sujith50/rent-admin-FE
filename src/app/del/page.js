"use client";
import Image from "next/image";
import { useRef, useState, useEffect, useCallback } from "react";

export default function ImageComparison() {
  const containerRef = useRef(null);
  const [sliderPct, setSliderPct] = useState(50);
  const [isDragging, setIsDragging] = useState(false);

  // Calculate percentage slider position based on pointer
  const updatePosition = useCallback((clientX) => {
    if (!containerRef.current) return;
    const { left, width: cw } = containerRef.current.getBoundingClientRect();
    let pct = ((clientX - left) / cw) * 100;
    pct = Math.max(0, Math.min(100, pct));
    setSliderPct(pct);
  }, []);

  // Mouse / touch events
  const onDown = () => setIsDragging(true);
  const onUp = () => setIsDragging(false);
  const onMove = (e) => {
    if (!isDragging) return;
    const x = e.touches ? e.touches[0].clientX : e.clientX;
    updatePosition(x);
  };

  useEffect(() => {
    window.addEventListener("mouseup", onUp);
    window.addEventListener("touchend", onUp);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("touchmove", onMove);
    return () => {
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("touchend", onUp);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("touchmove", onMove);
    };
  }, [isDragging, onMove]);

  return (
    <div ref={containerRef} className="select-none">
      <Image
        src="https://plus.unsplash.com/premium_photo-1721268770804-f9db0ce102f8?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="After"
        // className="absolute h-full object-cover w-full"
        width={1024}
        height={512}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      />

      <Image
        src="https://plus.unsplash.com/premium_photo-1690481529191-1ad78d50daac?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="Before"
        // className="w-full h-full top-0 left-0  object-cover"
        width={1024}
        height={512}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          clipPath: `inset(0  ${100 - sliderPct}%  0  0)`,
        }}
      />
      <div
        onMouseDown={onDown}
        onTouchStart={onDown}
        style={{
          position: "absolute",
          top: 0,
          left: `${sliderPct - 0.075}%`,
          transform: "translateX(-50%)",
          height: "100%",
          cursor: "col-resize",
          zIndex: 10,
          width: "4px",
          backgroundColor: "rgba(255,255,255,0.8)",
        }}
      />
    </div>
  );
}

/** Usage Example **/
// In a Next.js page/component:
// import ImageComparison from '@/components/ImageComparison';
//
// <ImageComparison
//   beforeSrc="/images/phone-before.jpg"
//   afterSrc="/images/phone-after.jpg"
//   width={400}
//   height={800}
//   responsive={false}
// />

/**
 * Notes:
 * - `responsive` prop toggles fixed vs fluid width.
 * - Both images are always full-container width; clip-path handles the split.
 * - Touch events included for mobile.
 * - Style the handle (e.g., arrow icons) as needed.
 */
