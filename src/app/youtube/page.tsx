import prisma from "@/lib/prisma";
import Youtube from "@/components/sections/Youtube";

export default async function YoutubePage() {
  const latestVideos = await prisma.youtube.findMany({
    orderBy: {
      youtube_id: "desc",
    },
  });

  // Transform year from Date to string

  return (
    <div className="flex flex-col items-center justify-center min-h-screen  py-2">
      <Youtube items={latestVideos} />
    </div>
  );
}
