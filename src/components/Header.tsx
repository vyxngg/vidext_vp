"use client";

import { VideoUpload } from "@/components/VideoUpload";

type HeaderProps = {
  onUpload: (video: { id: string; title: string; src: string; thumbnail: string }) => void;
};


export const Header = ({ onUpload }: HeaderProps) => {
  return (
    <header className="w-full z-40 fixed top-0 left-0 bg-background ">
      <div className="container relative mx-auto min-h-20 flex gap-4 flex-row lg:grid lg:grid-cols-3 items-center">
        <div className="justify-start items-center gap-4 lg:flex hidden flex-row">
          
        </div>
        <div className="flex lg:justify-center">
          <p className="font-semibold">VIDEO PLAYER</p>
        </div>
        <div className="flex justify-end w-full gap-4">
          <VideoUpload onUpload={onUpload} />
        </div>
      </div>
    </header>
  );
};
