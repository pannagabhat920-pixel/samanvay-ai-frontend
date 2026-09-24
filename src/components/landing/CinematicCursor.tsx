import { useEffect, useRef } from "react";
import gsap from "gsap";

export function CinematicCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    const finePointer = window.matchMedia("(pointer: fine)").matches && window.matchMedia("(hover: hover)").matches;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!dot || !ring || !finePointer || reducedMotion) return;

    document.body.classList.add("samanvay-cursor-enabled");
    gsap.set([dot, ring], { xPercent: -50, yPercent: -50, autoAlpha: 0 });
    const moveDotX = gsap.quickTo(dot, "x", { duration: 0.12, ease: "power3.out" });
    const moveDotY = gsap.quickTo(dot, "y", { duration: 0.12, ease: "power3.out" });
    const moveRingX = gsap.quickTo(ring, "x", { duration: 0.42, ease: "power3.out" });
    const moveRingY = gsap.quickTo(ring, "y", { duration: 0.42, ease: "power3.out" });

    const onPointerMove = (event: PointerEvent) => {
      moveDotX(event.clientX);
      moveDotY(event.clientY);
      moveRingX(event.clientX);
      moveRingY(event.clientY);
      gsap.to([dot, ring], { autoAlpha: 1, duration: 0.2, overwrite: true });
    };
    const onPointerOver = (event: PointerEvent) => {
      const target = event.target instanceof Element ? event.target.closest("a, button, [role='button'], [data-cursor-target]") : null;
      ring.dataset.state = target ? (target.hasAttribute("data-cursor-target") ? "target" : "interactive") : "default";
    };
    const onPointerOut = (event: PointerEvent) => {
      const target = event.target instanceof Element ? event.target.closest("a, button, [role='button'], [data-cursor-target]") : null;
      if (target) ring.dataset.state = "default";
    };
    const onPointerLeave = () => gsap.to([dot, ring], { autoAlpha: 0, duration: 0.2, overwrite: true });
    const onPointerEnter = () => gsap.to([dot, ring], { autoAlpha: 1, duration: 0.2, overwrite: true });

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    document.addEventListener("pointerover", onPointerOver, { passive: true });
    document.addEventListener("pointerout", onPointerOut, { passive: true });
    document.documentElement.addEventListener("mouseleave", onPointerLeave);
    document.documentElement.addEventListener("mouseenter", onPointerEnter);

    return () => {
      document.body.classList.remove("samanvay-cursor-enabled");
      window.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("pointerover", onPointerOver);
      document.removeEventListener("pointerout", onPointerOut);
      document.documentElement.removeEventListener("mouseleave", onPointerLeave);
      document.documentElement.removeEventListener("mouseenter", onPointerEnter);
      gsap.killTweensOf([dot, ring]);
    };
  }, []);

  return <><div ref={dotRef} className="cinematic-cursor-dot" aria-hidden="true" /><div ref={ringRef} className="cinematic-cursor-ring" data-state="default" aria-hidden="true" /></>;
}
