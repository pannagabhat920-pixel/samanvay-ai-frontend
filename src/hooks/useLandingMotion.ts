import { useLayoutEffect, type RefObject } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type MotionLayer = { element: HTMLElement; x: number; y: number };

export function useLandingMotion(rootRef: RefObject<HTMLElement | null>) {
  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const finePointer = window.matchMedia("(pointer: fine)").matches && window.matchMedia("(hover: hover)").matches;
    const enhancedPointer = window.matchMedia("(min-width: 768px)").matches;
    const canPin = window.matchMedia("(min-width: 1024px)").matches;

    if (reducedMotion) {
      root.dataset.motion = "reduced";
      return () => {
        delete root.dataset.motion;
      };
    }

    root.dataset.motion = "enabled";
    root.classList.add("motion-enabled");

    const query = <T extends Element>(selector: string) => Array.from(root.querySelectorAll<T>(selector));
    const lenis = new Lenis({
      autoRaf: false,
      duration: enhancedPointer ? 1.05 : 0.78,
      smoothWheel: true,
      syncTouch: false,
      touchMultiplier: 1,
      wheelMultiplier: enhancedPointer ? 0.92 : 1,
      anchors: true,
      autoResize: true,
      respectReducedMotion: true,
    });
    const stopLenisScrollSync = lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);

    const cleanupCallbacks: Array<() => void> = [];
    const context = gsap.context(() => {
      const hero = root.querySelector<HTMLElement>("[data-hero-section]");
      const heroCopy = root.querySelector<HTMLElement>(".hero-copy");
      const heroVisual = root.querySelector<HTMLElement>(".hero-visual");
      const heroGrid = root.querySelector<HTMLElement>(".hero-grid");
      const heroCoordinates = query<HTMLElement>(".hero-coordinates");
      const heroTracks = root.querySelector<HTMLElement>(".hero-tracks");
      const heroNodes = query<HTMLElement>("[data-hero-node]");
      const heroShared = root.querySelector<HTMLElement>(".hero-shared");
      const heroWords = query<HTMLElement>("[data-hero-word]");

      if (heroWords.length) {
        gsap.set(heroWords, { autoAlpha: 0, y: 80, filter: "blur(10px)" });
        gsap.to(heroWords, {
          autoAlpha: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.95,
          stagger: 0.065,
          ease: "power3.out",
          overwrite: true,
        });
      }

      if (hero && heroVisual) {
        const heroTimeline = gsap.timeline({
          scrollTrigger: {
            trigger: hero,
            start: "top top",
            end: canPin ? "+=115%" : "bottom top",
            pin: canPin,
            pinSpacing: canPin,
            scrub: 1,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        if (canPin) {
          heroTimeline
            .to(heroCopy, { y: -92, scale: 0.94, autoAlpha: 0, duration: 1, ease: "power2.inOut" }, 0.12)
            .to(heroVisual, { scale: 1.45, xPercent: 7, yPercent: -3, transformOrigin: "center right", duration: 1, ease: "power2.inOut" }, 0)
            .to(heroGrid, { scale: 1.28, autoAlpha: 0.78, transformOrigin: "center center", duration: 1, ease: "none" }, 0)
            .to(heroCoordinates, { xPercent: -12, yPercent: 18, autoAlpha: 0.35, duration: 1, ease: "none" }, 0)
            .to(heroTracks, { scale: 1.24, xPercent: 5, duration: 1, ease: "power2.inOut" }, 0)
            .to(heroNodes, { xPercent: 5, yPercent: -5, duration: 0.85, stagger: 0.08, ease: "power2.inOut" }, 0.04)
            .to(heroShared, { scale: 1.28, yPercent: -10, transformOrigin: "center center", duration: 0.9, ease: "power2.inOut" }, 0.18);
        } else {
          heroTimeline
            .to(heroCopy, { y: -34, autoAlpha: 0.35, duration: 0.65, ease: "power1.out" }, 0.1)
            .to(heroVisual, { scale: 1.06, y: -18, duration: 0.8, ease: "power1.out" }, 0)
            .to(heroGrid, { scale: 1.08, duration: 0.8, ease: "none" }, 0);
        }
      }

      const heroPaths = query<SVGPathElement>("[data-hero-path]");
      if (heroPaths.length) {
        gsap.set(heroPaths, { strokeDasharray: "5 10", strokeDashoffset: 34, opacity: 0.72 });
        gsap.to(heroPaths, {
          strokeDashoffset: 0,
          opacity: 1,
          duration: 1.1,
          stagger: 0.12,
          ease: "power2.out",
          scrollTrigger: { trigger: hero ?? root, start: "top 78%", end: "top 12%", scrub: 1 },
        });
      }

      if (finePointer && enhancedPointer && hero) {
        const layers: MotionLayer[] = [
          ...(heroGrid ? [{ element: heroGrid, x: 2, y: 2 }] : []),
          ...heroCoordinates.map((element) => ({ element, x: -3, y: 3 })),
          ...(heroTracks ? [{ element: heroTracks, x: 4, y: -3 }] : []),
          ...heroNodes.map((element) => ({ element, x: -5, y: 4 })),
          ...(heroShared ? [{ element: heroShared, x: 6, y: -5 }] : []),
        ];
        const setters = layers.map(({ element, x, y }) => ({
          x: gsap.quickTo(element, "x", { duration: 0.8, ease: "power3.out" }),
          y: gsap.quickTo(element, "y", { duration: 0.8, ease: "power3.out" }),
          xAmount: x,
          yAmount: y,
        }));
        const onPointerMove = (event: PointerEvent) => {
          const bounds = hero.getBoundingClientRect();
          const normalizedX = (event.clientX - bounds.left) / bounds.width - 0.5;
          const normalizedY = (event.clientY - bounds.top) / bounds.height - 0.5;
          setters.forEach(({ x, y, xAmount, yAmount }) => {
            x(normalizedX * xAmount);
            y(normalizedY * yAmount);
          });
        };
        const resetPointer = () => setters.forEach(({ x, y }) => { x(0); y(0); });
        hero.addEventListener("pointermove", onPointerMove, { passive: true });
        hero.addEventListener("pointerleave", resetPointer, { passive: true });
        cleanupCallbacks.push(() => {
          hero.removeEventListener("pointermove", onPointerMove);
          hero.removeEventListener("pointerleave", resetPointer);
        });
      }

      const problem = root.querySelector<HTMLElement>("[data-story-section='problem']");
      const problemCards = query<HTMLElement>("[data-problem-card]");
      const problemPaths = query<SVGPathElement>("[data-problem-path]");
      const problemLabels = query<HTMLElement>("[data-problem-label]");
      const problemConflicts = query<HTMLElement>("[data-problem-conflicts]");
      const problemConnector = root.querySelector<HTMLElement>("[data-problem-connector]");
      if (problem && problemCards.length) {
        gsap.set(problemPaths, { strokeDasharray: "10 16", strokeDashoffset: 120, opacity: 0 });
        gsap.set(problemLabels, { autoAlpha: 0, y: 10 });
        gsap.set(problemConflicts, { autoAlpha: 0, y: 12 });
        gsap.timeline({
          scrollTrigger: { trigger: problem, start: "top 72%", end: "bottom 38%", scrub: 1 },
        })
          .fromTo(problemCards, { x: (index) => (index - 1) * 28, y: (index) => (index === 1 ? 18 : -8), rotate: (index) => (index - 1) * 1.5 }, { x: 0, y: 0, rotate: 0, duration: 0.8, stagger: 0.12, ease: "power2.out" }, 0)
          .to(problemPaths, { strokeDashoffset: 0, opacity: 0.58, duration: 0.75, stagger: 0.12, ease: "none" }, 0.2)
          .to(problemLabels, { autoAlpha: 0.72, y: 0, duration: 0.45, stagger: 0.1, ease: "power2.out" }, 0.5)
          .fromTo(problemConnector, { scaleX: 0.7, autoAlpha: 0.4 }, { scaleX: 1, autoAlpha: 1, duration: 0.45, ease: "power2.out", transformOrigin: "center" }, 0.62)
          .to(problemConflicts, { autoAlpha: 1, y: 0, duration: 0.5, stagger: 0.08, ease: "power2.out" }, 0.7);
      }

      const platform = root.querySelector<HTMLElement>("[data-story-section='platform']");
      const dashboard = root.querySelector<HTMLElement>("[data-dashboard-preview]");
      const dashboardWidgets = query<HTMLElement>("[data-dashboard-widget]");
      if (platform && dashboard) {
        const dashboardTimeline = gsap.timeline({ scrollTrigger: { trigger: platform, start: "top 78%", end: "top 24%", scrub: 1 } });
        dashboardTimeline
          .fromTo(dashboard, { autoAlpha: 0, scale: 0.76, y: 58, rotateX: 8, transformPerspective: 1200, transformOrigin: "center center" }, { autoAlpha: 1, scale: 1, y: 0, rotateX: 0, duration: 1, ease: "power3.out" }, 0)
          .fromTo(dashboardWidgets, { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, duration: 0.65, stagger: 0.16, ease: "power2.out" }, 0.24);
        query<HTMLElement>("[data-dashboard-number]").forEach((element) => {
          const target = Number(element.dataset.dashboardNumber);
          if (!Number.isFinite(target)) return;
          gsap.fromTo(element, { innerText: 0 }, { innerText: target, duration: 1.15, ease: "power2.out", snap: { innerText: 1 }, scrollTrigger: { trigger: element, start: "top 92%", once: true } } as gsap.TweenVars);
        });
      }

      const workflowSection = root.querySelector<HTMLElement>("[data-story-section='workflow']");
      const workflowRail = root.querySelector<HTMLElement>("[data-workflow-rail]");
      const workflowTrack = root.querySelector<HTMLElement>("[data-workflow-track]");
      const workflowLine = root.querySelector<HTMLElement>("[data-workflow-line]");
      const workflowProgress = root.querySelector<HTMLElement>("[data-workflow-progress]");
      const workflowSteps = query<HTMLElement>("[data-workflow-step]");
      if (workflowRail && workflowTrack && enhancedPointer) {
        const distance = () => Math.max(0, workflowTrack.scrollWidth - window.innerWidth + 80);
        gsap.to(workflowTrack, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: { trigger: workflowSection ?? workflowRail, start: "top top", end: () => `+=${Math.max(window.innerHeight * 1.35, distance() * 0.72)}`, pin: canPin, pinSpacing: canPin, scrub: 1, anticipatePin: 1, invalidateOnRefresh: true },
        });
        gsap.fromTo(workflowSteps, { autoAlpha: 0.42, scale: 0.96 }, { autoAlpha: 1, scale: 1, duration: 0.6, stagger: 0.16, ease: "power2.out", scrollTrigger: { trigger: workflowRail, start: "top 76%", end: "top 30%", scrub: 1 } });
        if (workflowLine) gsap.fromTo(workflowLine, { scaleX: 0 }, { scaleX: 1, ease: "none", transformOrigin: "left center", scrollTrigger: { trigger: workflowRail, start: "top 78%", end: "bottom 42%", scrub: 1 } });
        if (workflowProgress) gsap.fromTo(workflowProgress, { scaleX: 0 }, { scaleX: 1, ease: "none", transformOrigin: "left center", scrollTrigger: { trigger: workflowRail, start: "top 78%", end: "bottom 42%", scrub: 1 } });
      }

      const corridor = root.querySelector<HTMLElement>("[data-corridor-rail]");
      if (corridor) {
        const targets = Array.from(corridor.querySelectorAll<HTMLElement>("[data-corridor-target]"));
        const detail = corridor.querySelector<HTMLElement>("[data-corridor-detail]");
        const activate = (target: HTMLElement) => {
          targets.forEach((item) => item.classList.toggle("is-corridor-target", item === target));
          if (detail) gsap.fromTo(detail, { autoAlpha: 0.65, y: 8 }, { autoAlpha: 1, y: 0, duration: 0.35, ease: "power2.out", overwrite: true });
        };
        const reset = () => targets.forEach((item) => item.classList.remove("is-corridor-target"));
        const listeners: Array<() => void> = [];
        targets.forEach((target) => {
          const onEnter = () => activate(target);
          const onLeave = () => reset();
          const onClick = () => activate(target);
          target.addEventListener("pointerenter", onEnter, { passive: true });
          target.addEventListener("focus", onEnter);
          target.addEventListener("click", onClick);
          target.addEventListener("pointerleave", onLeave, { passive: true });
          listeners.push(() => {
            target.removeEventListener("pointerenter", onEnter);
            target.removeEventListener("focus", onEnter);
            target.removeEventListener("click", onClick);
            target.removeEventListener("pointerleave", onLeave);
          });
        });
        cleanupCallbacks.push(() => listeners.forEach((remove) => remove()));
      }

      const standards = root.querySelector<HTMLElement>("[data-story-section='standards']");
      const standardCards = query<HTMLElement>("[data-standard-card]");
      if (standards && standardCards.length) {
        gsap.fromTo(standardCards, { y: 18, autoAlpha: 0.55 }, { y: 0, autoAlpha: 1, duration: 0.65, stagger: 0.08, ease: "power2.out", scrollTrigger: { trigger: standards, start: "top 76%", end: "top 38%", scrub: 1 } });
      }

      const cta = root.querySelector<HTMLElement>("[data-cta-section]");
      if (cta) {
        const ctaHeading = cta.querySelector<HTMLElement>("[data-cta-heading]");
        const ctaButton = cta.querySelector<HTMLElement>("[data-cta-button]");
        const ctaLine = cta.querySelector<HTMLElement>("[data-cta-line]");
        gsap.timeline({ scrollTrigger: { trigger: cta, start: "top 72%", end: "center center", scrub: 1 } })
          .fromTo(ctaHeading, { y: 54, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.8, ease: "power2.out" }, 0)
          .fromTo(ctaButton, { scale: 0.72, autoAlpha: 0 }, { scale: 1, autoAlpha: 1, duration: 0.65, ease: "back.out(1.4)" }, 0.35)
          .to(ctaLine, { xPercent: 18, scaleX: 1.15, duration: 1, ease: "none", transformOrigin: "left center" }, 0);
      }

      const progressFill = root.querySelector<HTMLElement>("[data-scroll-progress-fill]");
      if (progressFill) gsap.fromTo(progressFill, { scaleY: 0 }, { scaleY: 1, ease: "none", transformOrigin: "top center", scrollTrigger: { trigger: root, start: "top top", end: "bottom bottom", scrub: 0.25 } });
    }, root);

    let disposed = false;
    const refresh = () => { if (!disposed) ScrollTrigger.refresh(); };
    const onResize = () => refresh();
    window.addEventListener("resize", onResize, { passive: true });
    if (document.fonts) document.fonts.ready.then(refresh).catch(() => undefined);
    window.requestAnimationFrame(refresh);

    return () => {
      disposed = true;
      window.removeEventListener("resize", onResize);
      cleanupCallbacks.forEach((cleanup) => cleanup());
      stopLenisScrollSync();
      lenis.destroy();
      gsap.ticker.remove(tick);
      const triggers = ScrollTrigger.getAll().filter((trigger) => trigger.trigger instanceof Element && root.contains(trigger.trigger));
      triggers.forEach((trigger) => trigger.kill());
      context.revert();
      root.classList.remove("motion-enabled");
      delete root.dataset.motion;
    };
  }, [rootRef]);
}
