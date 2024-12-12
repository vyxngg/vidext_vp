import Image from 'next/image';

type Video = {
  id: string;
  title: string;
  src: string;
  thumbnail: string; 
};

type VideoListProps = {
  videos: Video[];
  onSelect: (video: Video) => void;
};

export function VideoList({ videos, onSelect }: VideoListProps) {
  return (
    <div className="w-full lg:w-1/3">
      <h3 className="text-lg font-bold mb-2">Available Videos</h3>
      <ul className="space-y-2">
        {videos.map((video) => (
          <li
            key={video.id}
            onClick={() => onSelect(video)}
            className="cursor-pointer p-2 bg-gray-100 rounded-md hover:bg-gray-200 flex items-center"
          >
            <Image
              src={video.thumbnail} 
              alt={video.title} 
              width={64}
              height={64} 
              className="mr-4 rounded" 
              priority 
            />
            <span>{video.title}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
