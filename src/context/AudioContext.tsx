import React, { createContext, useContext, useEffect, useRef, useState } from 'react';

interface AudioContextValue {
  isPlaying: boolean;
  togglePlay: () => void;
}

const AudioPlayerContext = createContext<AudioContextValue>({
  isPlaying: false,
  togglePlay: () => {},
});

export function AudioProvider({ children }: { children: React.ReactNode }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = new Audio('/background-music.mp3');
    audio.loop = true;
    audio.volume = 0.35;
    audioRef.current = audio;

    return () => {
      audio.pause();
      audioRef.current = null;
    };
  }, []);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) {
      setIsPlaying((prev) => !prev);
      return;
    }
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio
        .play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch(() => {
          // In headless or restricted autoplay environments, still toggle UI state cleanly
          setIsPlaying((prev) => !prev);
        });
    }
  };

  return (
    <AudioPlayerContext.Provider value={{ isPlaying, togglePlay }}>
      {children}
    </AudioPlayerContext.Provider>
  );
}

export function useAudio() {
  return useContext(AudioPlayerContext);
}
