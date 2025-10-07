import { useEffect, useRef, useState } from "react";
import styled from "styled-components";

const MIN_DESKTOP = 900;

function isMobileLike() {
  const ua = navigator.userAgent || "";
  const uaMobile = /Mobi|Android|iPhone|iPad|iPod/i.test(ua);
  const coarse = window.matchMedia?.("(pointer: coarse)")?.matches;
  const narrow = Math.min(window.innerWidth, window.innerHeight) < MIN_DESKTOP;
  return uaMobile || coarse || narrow;
}

const Gate = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9999;
  background: #fffceb;
  color: #222;
  border-bottom: 1px solid #e2d9a6;

  @media (min-width: 1024px) {
    display: none !important;
  }
`;

const GateInner = styled.div`
  max-width: 120rem; /* matches your .container max-width vibe */
  margin: 0 auto;
  padding: 10px 14px;
  display: flex;
  gap: 10px;
  align-items: center;
  flex-wrap: wrap;
  font: 1.4rem/1.35 "Lato", system-ui, -apple-system, Segoe UI, Roboto, Arial;
`;

const Sub = styled.span`
  opacity: 0.8;
`;
const Actions = styled.div`
  margin-left: auto;
  display: flex;
  gap: 8px;
`;
const Button = styled.button`
  border: 1px solid #c9ced6;
  background: #fff;
  padding: 0.45rem 0.8rem;
  border-radius: 10px;
  font: inherit;
  cursor: pointer;
  &:active {
    transform: translateY(1px);
  }
`;

export default function DesktopGate() {
  const [show, setShow] = useState(false);
  const gateRef = useRef(null);
  const baseTopRef = useRef(0); // remember the body’s existing top padding (your 3rem)

  useEffect(() => {
    // if (sessionStorage.getItem('dg-dismissed') === '1') return;
    if (!isMobileLike()) return;

    // Record the current computed top padding (e.g., your 3rem)
    baseTopRef.current =
      parseFloat(getComputedStyle(document.body).paddingTop || "0") || 0;

    // Lock layout + mark as open
    document.documentElement.classList.add("mobile-locked", "dg-open");
    document.body.classList.add("mobile-locked");

    setShow(true);

    const applyOffset = () => {
      const banner = gateRef.current?.offsetHeight || 0;
      // Add banner height to the original top padding so we don’t lose your 3rem
      document.body.style.paddingTop = `${baseTopRef.current + banner}px`;
    };

    applyOffset();
    window.addEventListener("resize", applyOffset);

    return () => {
      window.removeEventListener("resize", applyOffset);
      document.documentElement.classList.remove("dg-open");
      document.body.style.paddingTop = ""; // revert to original 3rem from GlobalStyles
      // keep mobile-locked so the desktop width remains forced on mobile
      // (remove classes here if you prefer to unlock on unmount)
    };
  }, []);

  if (!show) return null;

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(location.href);
      alert("Link copied");
    } catch {
      prompt("Copy link:", location.href);
    }
  };

  const continueFn = () => {
    setShow(false);
    document.documentElement.classList.remove("dg-open");
    document.body.style.paddingTop = ""; // fall back to base padding
    // sessionStorage.setItem('dg-dismissed', '1');
  };

  return (
    <Gate id="desktop-gate" ref={gateRef} role="status" aria-live="polite">
      <GateInner>
        <strong>Best viewed on a desktop</strong>
        <Sub>This page isn’t optimized for phones/tablets.</Sub>
        <Actions>
          <Button onClick={copy} type="button">
            Copy link
          </Button>
          <Button onClick={continueFn} type="button">
            Continue
          </Button>
        </Actions>
      </GateInner>
    </Gate>
  );
}
