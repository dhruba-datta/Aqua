import { useCallback, useEffect, useRef, useState } from 'react';

export default function OceanSound() {
  const [playing, setPlaying] = useState(false);
  const ctxRef = useRef(null);
  const nodesRef = useRef(null);
  const userMutedRef = useRef(false);
  const buttonRef = useRef(null);

  const start = useCallback(async () => {
    if (nodesRef.current) return;

    let ctx = ctxRef.current;
    if (!ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      ctx = new AudioCtx();
      ctxRef.current = ctx;
    }

    try {
      if (ctx.state === 'suspended') {
        await ctx.resume();
      }
    } catch (_) { /* noop */ }

    if (ctx.state !== 'running') {
      return;
    }

    if (nodesRef.current) return;

    const bufferSize = 2 * ctx.sampleRate;
    const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    let lastOut = 0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      output[i] = (lastOut + 0.02 * white) / 1.02;
      lastOut = output[i];
      output[i] *= 3.5;
    }

    const noise = ctx.createBufferSource();
    noise.buffer = noiseBuffer;
    noise.loop = true;

    const lowpass = ctx.createBiquadFilter();
    lowpass.type = 'lowpass';
    lowpass.frequency.value = 700;
    lowpass.Q.value = 0.7;

    const highpass = ctx.createBiquadFilter();
    highpass.type = 'highpass';
    highpass.frequency.value = 120;

    const gain = ctx.createGain();
    gain.gain.value = 0;

    const lfo = ctx.createOscillator();
    lfo.frequency.value = 0.12;
    const lfoGain = ctx.createGain();
    lfoGain.gain.value = 0.18;
    const baseGain = ctx.createConstantSource();
    baseGain.offset.value = 0;

    lfo.connect(lfoGain);
    baseGain.connect(gain.gain);
    lfoGain.connect(gain.gain);

    noise.connect(highpass);
    highpass.connect(lowpass);
    lowpass.connect(gain);
    gain.connect(ctx.destination);

    const now = ctx.currentTime;
    baseGain.offset.setValueAtTime(0, now);
    baseGain.offset.linearRampToValueAtTime(0.22, now + 1.5);

    noise.start();
    lfo.start();
    baseGain.start();

    nodesRef.current = { noise, lfo, baseGain, gain };
    setPlaying(true);
  }, []);

  const stop = useCallback(() => {
    const ctx = ctxRef.current;
    const nodes = nodesRef.current;
    if (!ctx || !nodes) {
      setPlaying(false);
      return;
    }

    const now = ctx.currentTime;
    try {
      nodes.baseGain.offset.cancelScheduledValues(now);
      nodes.baseGain.offset.linearRampToValueAtTime(0, now + 0.8);
      nodes.gain.gain.cancelScheduledValues(now);
      nodes.gain.gain.linearRampToValueAtTime(0, now + 0.8);
    } catch (_) {}

    const nodesToStop = nodes;
    nodesRef.current = null;

    setTimeout(() => {
      try {
        nodesToStop.noise.stop();
        nodesToStop.lfo.stop();
        nodesToStop.baseGain.stop();
      } catch (_) { /* noop */ }
    }, 900);

    setPlaying(false);
  }, []);

  useEffect(() => {
    let cancelled = false;

    const tryStart = () => {
      if (cancelled || userMutedRef.current || nodesRef.current) return;
      start();
    };

    tryStart();

    const onInteract = (e) => {
      if (buttonRef.current && e.target && buttonRef.current.contains(e.target)) return;
      if (userMutedRef.current || nodesRef.current) return;
      start();
    };

    const events = ['pointerdown', 'keydown', 'touchstart'];
    events.forEach((e) => window.addEventListener(e, onInteract, { passive: true }));

    return () => {
      cancelled = true;
      events.forEach((e) => window.removeEventListener(e, onInteract));
    };
  }, [start]);

  useEffect(() => {
    return () => {
      if (ctxRef.current) {
        ctxRef.current.close().catch(() => {});
        ctxRef.current = null;
        nodesRef.current = null;
      }
    };
  }, []);

  const toggle = () => {
    if (nodesRef.current || playing) {
      userMutedRef.current = true;
      stop();
    } else {
      userMutedRef.current = false;
      start();
    }
  };

  return (
    <button
      ref={buttonRef}
      type="button"
      onClick={toggle}
      aria-label={playing ? 'Mute ocean sound' : 'Play ocean sound'}
      aria-pressed={playing}
      className="fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-aqua-deep text-white shadow-lg shadow-black/40 backdrop-blur transition hover:scale-105 hover:bg-orange-accent hover:text-dark focus:outline-none focus:ring-2 focus:ring-orange-accent/60"
    >
      {playing ? (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
          <path d="M3 10v4a1 1 0 0 0 1 1h3l4 4a1 1 0 0 0 1.7-.7V5.7A1 1 0 0 0 11 5l-4 4H4a1 1 0 0 0-1 1Zm13.5 2a4.5 4.5 0 0 0-2.5-4v8a4.5 4.5 0 0 0 2.5-4Zm-2.5-8.9v2.06a7 7 0 0 1 0 13.68v2.06a9 9 0 0 0 0-17.8Z" />
        </svg>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
          <path d="M3 10v4a1 1 0 0 0 1 1h3l4 4a1 1 0 0 0 1.7-.7V5.7A1 1 0 0 0 11 5l-4 4H4a1 1 0 0 0-1 1Zm17.3-1.3-2.1 2.1-2.1-2.1-1.4 1.4 2.1 2.1-2.1 2.1 1.4 1.4 2.1-2.1 2.1 2.1 1.4-1.4-2.1-2.1 2.1-2.1-1.4-1.4Z" />
        </svg>
      )}
    </button>
  );
}
