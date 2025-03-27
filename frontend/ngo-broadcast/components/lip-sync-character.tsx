"use client";

import { JSX, useEffect, useRef, useState } from "react";

// Define enum for mouth states
enum MOUTH_STATES {
  closed = 0,
  slightlyOpen = 1,
  halfOpen = 2,
  fullyOpen = 3,
}

// Define custom event types
interface AudioLoadedEvent extends CustomEvent {
  detail: {
    url: string;
  };
}

interface AudioPlaybackToggleEvent extends CustomEvent {
  detail: {
    playing: boolean;
  };
}

export default function LipSyncCharacter(): JSX.Element {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const [mouthState, setMouthState] = useState<MOUTH_STATES>(
    MOUTH_STATES.closed,
  );
  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    // Create audio element
    const audio = new Audio();
    audio.crossOrigin = "anonymous";
    audioRef.current = audio;

    // Set up audio context and analyzer
    const setupAudioAnalysis = (): void => {
      const AudioContextClass =
        window.AudioContext || (window as any).webkitAudioContext;
      const audioContext = new AudioContextClass();
      const analyser = audioContext.createAnalyser();
      analyser.fftSize = 256;

      const source = audioContext.createMediaElementSource(audio);
      source.connect(analyser);
      analyser.connect(audioContext.destination);

      audioContextRef.current = audioContext;
      analyserRef.current = analyser;
    };

    // Handle audio loaded event
    const handleAudioLoaded = (e: Event): void => {
      const event = e as unknown as AudioLoadedEvent;
      if (audioRef.current) {
        audioRef.current.src = event.detail.url;
        audioRef.current.load();

        // Initialize audio analysis if not already done
        if (!audioContextRef.current) {
          setupAudioAnalysis();
        }
      }
    };

    // Handle play/pause toggle
    const handlePlaybackToggle = (e: Event): void => {
      const event = e as unknown as AudioPlaybackToggleEvent;
      if (audioRef.current) {
        if (event.detail.playing) {
          // Resume audio context if it was suspended
          if (audioContextRef.current?.state === "suspended") {
            audioContextRef.current.resume();
          }

          audioRef.current.play();
          startLipSyncAnimation();
        } else {
          audioRef.current.pause();
          stopLipSyncAnimation();
        }
      }
    };

    // Add event listeners
    window.addEventListener("audioLoaded", handleAudioLoaded);
    window.addEventListener("audioPlaybackToggle", handlePlaybackToggle);

    return () => {
      // Clean up
      window.removeEventListener("audioLoaded", handleAudioLoaded);
      window.removeEventListener("audioPlaybackToggle", handlePlaybackToggle);

      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }

      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }

      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  const startLipSyncAnimation = (): void => {
    if (!analyserRef.current) return;

    const analyser = analyserRef.current;
    const dataArray = new Uint8Array(analyser.frequencyBinCount);

    const animate = (): void => {
      analyser.getByteFrequencyData(dataArray);

      // Calculate average volume from a specific frequency range (human voice)
      // Typically human voice is between 300Hz-3000Hz
      const voiceStart = Math.floor(300 / (44100 / analyser.fftSize));
      const voiceEnd = Math.floor(3000 / (44100 / analyser.fftSize));

      let sum = 0;
      for (let i = voiceStart; i < voiceEnd; i++) {
        sum += dataArray[i];
      }

      const average = sum / (voiceEnd - voiceStart);

      // Map the average volume to mouth states
      if (average < 20) {
        setMouthState(MOUTH_STATES.closed);
      } else if (average < 60) {
        setMouthState(MOUTH_STATES.slightlyOpen);
      } else if (average < 120) {
        setMouthState(MOUTH_STATES.halfOpen);
      } else {
        setMouthState(MOUTH_STATES.fullyOpen);
      }

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);
  };

  const stopLipSyncAnimation = (): void => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
    setMouthState(MOUTH_STATES.closed);
  };

  return (
    <div className="flex justify-center items-center h-64 bg-transparent rounded-lg">
      <div className=" w-64 h-full ">
        {/* Base character image */}
        <img
          src={"/assets/char-without-mouth.png"}
          alt="Character"
          className=" top-0 left-0 w-full h-50%"
        />

        {/* Mouth overlay */}
        <img
          src={
            mouthState === MOUTH_STATES.closed
              ? "assets/diff/closed.svg"
              : mouthState === MOUTH_STATES.slightlyOpen
                ? "assets/diff/slightly-open.svg"
                : mouthState === MOUTH_STATES.halfOpen
                  ? "assets/diff/half-open.svg"
                  : "assets/diff/open.svg"
          }
          alt="Mouth"
          className="absolute"
          style={{
            top: "25%",
            left: "41%",
            transform: "translate(-50%, -50%)",
            width: "20%",
            height: "auto",
          }}
        />
      </div>
    </div>
  );
}
