import type { AppRouter } from "@/app/api/trpc/[trpc]/route";
import { createTRPCReact } from "@trpc/react-query";

export const trpc = createTRPCReact<AppRouter>();
