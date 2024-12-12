"use client";

import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Toggle } from "@/components/ui/toggle";
import { useEffect, useRef, useState } from "react";
import { FaCompress, FaExpand, FaPause, FaPlay, FaVolumeMute, FaVolumeUp } from "react-icons/fa";
import ReactPlayer from "react-player";


type VideoPlayerProps = {
  videoUrl: string;
};

export function VideoPlayer({ videoUrl }: VideoPlayerProps) {
  const playerRef = useRef<ReactPlayer | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.8);
  const [isMuted, setIsMuted] = useState(false);
  const [played, setPlayed] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const handleFullscreenChange = () => {
      if (document.fullscreenElement) {
        setIsFullscreen(true);
      } else {
        setIsFullscreen(false);
      }
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);

    };
  }, []);

  const togglePlay = () => {
    setIsPlaying((prev) => !prev);
  };

  const toggleMute = () => {
    setIsMuted((prev) => !prev);
  };

  const handleVolumeChange = (value: number[]) => {
    const newVolume = value[0];
    setVolume(newVolume);
    setIsMuted(newVolume === 0);
  };

  const handleProgress = (state: { played: number }) => {
    setPlayed(state.played * 100);
  };

  const handleSeek = (value: number[]) => {
    const newPlayed = value[0] / 100;
    setPlayed(value[0]);
    if (playerRef.current) {
      playerRef.current.seekTo(newPlayed);
    }
  };

  const handleFullscreen = () => {
    const playerElement = playerRef.current?.getInternalPlayer()?.parentElement;
    if (playerElement) {
      if (playerElement.requestFullscreen) {
        playerElement.requestFullscreen();
      }
    }
  };

  const exitFullscreen = () => {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  };


  return (
    <div
      className={`relative flex flex-col ${isFullscreen ? "w-screen h-screen" : ""}`}
    >
      <ReactPlayer
        ref={playerRef}
        url={videoUrl}
        playing={isPlaying}
        volume={volume}
        muted={isMuted}
        onProgress={handleProgress}
        width="100%"
        height={isFullscreen ? "100%" : "auto"}
      />

{/* Controls */}
<div
  className={`absolute bottom-0 left-0 w-full px-4 py-2 bg-gray-800 bg-opacity-50 flex items-center justify-between ${
    isFullscreen ? "h-full px-0 py-0 z-10" : "h-16"
  }`}
>
  {/* Play/Pause Button */}
  <div className="w-auto">
    <Button onClick={togglePlay} variant="outline" size="icon">
      {isPlaying ? <FaPause /> : <FaPlay />}
    </Button>
  </div>

  {/* Progress Bar */}
  <div className={`w-[65%] mx-2 ${isFullscreen ? "w-full mx-4" : ""}`}>
    <Slider
      value={[played]}
      max={100}
      step={0.1}
      onValueChange={handleSeek}
      className="w-full"
    />
  </div>

  {/* Volume Controls */}
  <div className={`flex items-center space-x-2 ${isFullscreen ? "flex-1 justify-center" : ""}`}>
    <Toggle pressed={isMuted} onPressedChange={toggleMute} className="p-2">
      {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
    </Toggle>

    {/* Volume Slider */}
    <div className="w-20">
      <Slider
        defaultValue={[volume]}
        max={1}
        step={0.01}
        value={[volume]}
        onValueChange={handleVolumeChange}
        className="w-full"
      />
    </div>
  </div>

  {/* Fullscreen/Exit Fullscreen Button */}
  <div className="w-auto">
    {isFullscreen ? (
      <Button onClick={exitFullscreen} variant="outline" size="icon">
        <FaCompress />
      </Button>
    ) : (
      <Button onClick={handleFullscreen} variant="outline" size="icon">
        <FaExpand />
      </Button>
    )}
  </div>
</div>

    </div>
  );
}
