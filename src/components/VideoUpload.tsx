"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";

type VideoUploadProps = {
  onUpload: (video: { id: string; title: string; src: string; thumbnail: string }) => void;
};

export function VideoUpload({ onUpload }: VideoUploadProps) {
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log("Upload button clicked!");

    const videoFile = event.target.files?.[0];
    const thumbnailFile = event.target.files?.[1];

    if (!videoFile || !thumbnailFile) {
      alert("Please upload both video and thumbnail files.");
      return;
    }

    if (videoFile.type !== "video/mp4" || !thumbnailFile.type.startsWith("image")) {
      alert("Please upload a valid MP4 video and an image file for the thumbnail.");
      return;
    }

    console.log("Selected files:", videoFile.name, thumbnailFile.name);

    setIsUploading(true);

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: videoFile.name,
          type: videoFile.type,
          thumbnailName: thumbnailFile.name,
          thumbnailType: thumbnailFile.type,
        }),
      });

      if (!response.ok) {
        console.error("Failed to get upload URL. Status:", response.status);
        throw new Error("Failed to get upload URL.");
      }

      const { videoUploadUrl, videoFileUrl, thumbnailUploadUrl, thumbnailFileUrl } = await response.json();
      console.log("Received signed upload URLs:", videoUploadUrl, thumbnailUploadUrl);

      console.log("Uploading video file to S3...");
      await fetch(videoUploadUrl, {
        method: "PUT",
        headers: { "Content-Type": videoFile.type },
        body: videoFile,
      });

      console.log("Uploading thumbnail file to S3...");
      await fetch(thumbnailUploadUrl, {
        method: "PUT",
        headers: { "Content-Type": thumbnailFile.type },
        body: thumbnailFile,
      });

      console.log("Files uploaded successfully!");

      const video = {
        id: Date.now().toString(),
        title: videoFile.name,
        src: videoFileUrl,
        thumbnail: thumbnailFileUrl, // URL del thumbnail subido
      };

      console.log("Calling onUpload with video:", video);
      onUpload(video);
    } catch (error) {
      console.error("Error uploading files:", error);
      alert("Failed to upload video and thumbnail.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleButtonClick = () => {
    console.log("Button clicked! Opening file selector.");
    document.getElementById("video-upload")?.click();
  };

  return (
    <div className="flex flex-col gap-2">
      <input
        type="file"
        accept="video/mp4,image/*"
        onChange={handleFileChange}
        className="hidden"
        id="video-upload"
        multiple
        disabled={isUploading}
        aria-label="Upload video" 
        title="Upload video" 
      />
      <Button onClick={handleButtonClick} disabled={isUploading}>
        {isUploading ? "Uploading..." : "Upload Video"}
      </Button>
    </div>
  );
}
