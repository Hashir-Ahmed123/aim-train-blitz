import { useCallback, useRef } from "react";

export const useSoundEffects = (enabled: boolean) => {
  const audioContext = useRef<AudioContext | null>(null);

  const initAudio = useCallback(() => {
    if (!enabled || audioContext.current) return;
    
    try {
      audioContext.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    } catch (error) {
      console.warn("Web Audio API not supported");
    }
  }, [enabled]);

  const createTone = useCallback((frequency: number, duration: number, type: OscillatorType = "sine") => {
    if (!enabled || !audioContext.current) return;

    const oscillator = audioContext.current.createOscillator();
    const gainNode = audioContext.current.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.current.destination);

    oscillator.frequency.setValueAtTime(frequency, audioContext.current.currentTime);
    oscillator.type = type;

    gainNode.gain.setValueAtTime(0.1, audioContext.current.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.current.currentTime + duration);

    oscillator.start(audioContext.current.currentTime);
    oscillator.stop(audioContext.current.currentTime + duration);
  }, [enabled]);

  const playHitSound = useCallback(() => {
    initAudio();
    createTone(800, 0.1, "square");
  }, [initAudio, createTone]);

  const playMissSound = useCallback(() => {
    initAudio();
    createTone(200, 0.2, "sawtooth");
  }, [initAudio, createTone]);

  const playStartSound = useCallback(() => {
    initAudio();
    createTone(600, 0.15);
  }, [initAudio, createTone]);

  const playEndSound = useCallback(() => {
    initAudio();
    // Play a chord
    setTimeout(() => createTone(400, 0.5), 0);
    setTimeout(() => createTone(500, 0.5), 50);
    setTimeout(() => createTone(600, 0.5), 100);
  }, [initAudio, createTone]);

  return {
    playHitSound,
    playMissSound,
    playStartSound,
    playEndSound,
  };
};