import { useEffect, useRef, useState } from "react";

interface WaitlistCounterProps {
  /** Total already signed up. */
  count: number;
}

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export default function WaitlistCounter({ count }: WaitlistCounterProps) {
  const [display, setDisplay] = useState(0);
  const ref = useRef<HTMLParagraphElement>(null);
  const hasRun = useRef(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (prefersReducedMotion()) {
      setDisplay(count);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || hasRun.current) return;
        hasRun.current = true;

        const duration = 1400;
        const start = performance.now();
        const tick = (now: number) => {
          const progress = Math.min((now - start) / duration, 1);
          const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
          setDisplay(Math.round(eased * count));
          if (progress < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [count]);

  return (
    <p
      ref={ref}
      className="text-base-content/70"
      aria-label={`Join ${count.toLocaleString()} others already on the waitlist`}
    >
      Join{" "}
      <span className="text-success font-semibold tabular-nums">
        {display.toLocaleString()}
      </span>{" "}
      others already on the waitlist
    </p>
  );
}
