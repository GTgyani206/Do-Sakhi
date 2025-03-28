"use client";
import { JSX, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Play, Pause } from "lucide-react";

import { useToast } from "@/hooks/use-toast";

export default function AudioUploader(): JSX.Element {
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type.startsWith("audio/")) {
        setAudioFile(file);
        const url = URL.createObjectURL(file);
        setAudioUrl(url);

        // Notify lip-sync component
        window.dispatchEvent(
          new CustomEvent("audioLoaded", { detail: { url } }),
        );

        toast({
          title: "Audio uploaded",
          description: `File "${file.name}" is ready for lip-sync`,
        });
      } else {
        toast({
          title: "Invalid file type",
          description: "Please upload an audio file (MP3, WAV, etc.)",
          variant: "destructive",
        });
      }
    }
  };

  const togglePlayback = (): void => {
    const newPlayingState = !isPlaying;

    // Notify lip-sync component instead of playing the audio directly
    window.dispatchEvent(
      new CustomEvent("audioPlaybackToggle", {
        detail: { playing: newPlayingState },
      }),
    );

    setIsPlaying(newPlayingState);
  };

  return (
    <div className="space-y-4 mt-4">
      <div className="flex items-center space-x-2">
        <Input
          id="audio-upload"
          type="file"
          accept="audio/*"
          onChange={handleFileChange}
        />
      </div>
      {audioFile && (
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground truncate">
            {audioFile.name}
          </p>
          <Button onClick={togglePlayback} variant="outline" className="w-full">
            {isPlaying ? (
              <>
                <Pause className="mr-2 h-4 w-4" />
                Pause
              </>
            ) : (
              <>
                <Play className="mr-2 h-4 w-4" />
                Play
              </>
            )}
          </Button>
        </div>
      )}
    </div>
  );
}
