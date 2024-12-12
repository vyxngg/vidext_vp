import { initTRPC } from '@trpc/server';
import { z } from 'zod';

const t = initTRPC.create();


export const appRouter = t.router({
  getVideos: t.procedure.query(() => {
    return [
      { id: '1', title: 'Video 1'},
      { id: '2', title: 'Video 2' },
    ];
  }),
  likeVideo: t.procedure.input(z.object({ id: z.string() })).mutation(({ input }) => {

    return { id: input.id, likes: Math.floor(Math.random() * 100) };
  }),
});


export type AppRouter = typeof appRouter;
