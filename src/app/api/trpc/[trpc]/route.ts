import { initTRPC } from "@trpc/server";

const t = initTRPC.create();

type Video = {
  id: string;
  title: string;
  src: string;
  thumbnail: string;
};

export const appRouter = t.router({
  getVideos: t.procedure.query((): Video[] => {
    return [
      {
        id: "1",
        title: "Video 1",
        src: "https://www.w3schools.com/html/mov_bbb.mp4",
        thumbnail: "https://via.placeholder.com/200x150?text=Video+Thumbnail",
      },
      {
        id: "2",
        title: "Video 2",
        src: "https://www.w3schools.com/html/movie.mp4",
        thumbnail: "https://via.placeholder.com/200x150?text=Video+Thumbnail",
      },
    ];
  }),
});

export type AppRouter = typeof appRouter;
