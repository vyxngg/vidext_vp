"use client";
import { Header } from "@/components/Header";
import { VideoList } from "@/components/VideoList";
import { VideoPlayer } from "@/components/VideoPlayer";
import { useState } from "react";

export default function HomePage() {
  const [videos, setVideos] = useState([
    {
      id: "1",
      title: "Video Conejo",
      src: "https://www.w3schools.com/html/mov_bbb.mp4",
      thumbnail: "https://via.placeholder.com/200x150?text=Video+Thumbnail",
    },
    {
      id: "2",
      title: "Video Oso",
      src: "https://www.w3schools.com/html/movie.mp4",
      thumbnail: "https://via.placeholder.com/200x150?text=Video+Thumbnail",
    },
  ]);

  const [currentVideo, setCurrentVideo] = useState(videos[0]);

  const handleUpload = (video: { id: string; title: string; src: string; thumbnail: string }) => {
    setVideos((prevVideos) => [...prevVideos, video]);
  };

  return (
    <main className="min-h-screen bg-gray-100">

      <div className="w-full fixed top-0 left-0 z-10">
        <Header onUpload={handleUpload} />
      </div>

      <div className="pt-[60px] flex flex-col lg:flex-row gap-4 mt-10">

        <div
          className="relative w-full"
          style={{
            maxWidth: "1020px", 
            height: "80vh",
          }}
        >

          <VideoPlayer videoUrl={currentVideo.src} />
        </div>

        <div className="w-full lg:w-1/4">
          <VideoList videos={videos} onSelect={setCurrentVideo} />
        </div>
      </div>
    </main>
  );
}
