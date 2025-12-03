"use client";

import { AdImage } from "@/src/types/ads/ads";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";

const ImageGallery = ({
  images,
  title,
}: {
  images: AdImage[];
  title: string;
}) => {
  const [activeIdx, setActiveIdx] = useState(0);

  // --- Swipe state ---
  const startX = useRef(0);
  const endX = useRef(0);

  const handlePointerDown = (e: any) => {
    startX.current = e.clientX;
  };

  const handlePointerUp = (e: any) => {
    endX.current = e.clientX;
    const diff = startX.current - endX.current;

    // small movement ignore
    if (Math.abs(diff) < 40) return;

    if (diff > 40) {
      // swipe left → next image
      setActiveIdx((prev) => (prev < images.length - 1 ? prev + 1 : 0));
    } else if (diff < -40) {
      // swipe right → previous image
      setActiveIdx((prev) => (prev > 0 ? prev - 1 : images.length - 1));
    }
  };

  if (!images?.length)
    return (
      <div className="bg-gray-100 aspect-video rounded-xl flex items-center justify-center text-gray-400">
        No Images
      </div>
    );

  return (
    <div className="space-y-3">
      {/* Main Image */}
      <div
        className="relative aspect-4/3 lg:aspect-video w-full overflow-hidden bg-gray-900  group select-none"
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
      >
        <Image
          width={200}
          height={100}
          src={images[activeIdx].image_url}
          alt={title}
          className="w-full h-full object-contain md:object-cover transition-opacity duration-300"
        />

        {/* Navigation Arrows */}
        <div className="absolute inset-0 hidden lg:flex items-center justify-between p-4 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setActiveIdx((prev) => (prev > 0 ? prev - 1 : images.length - 1));
            }}
            className="bg-white/90 p-2 rounded-full shadow-lg hover:bg-white transition-transform active:scale-95"
          >
            <ChevronLeft className="w-5 h-5 text-gray-900" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              setActiveIdx((prev) => (prev < images.length - 1 ? prev + 1 : 0));
            }}
            className="bg-white/90 p-2 rounded-full shadow-lg hover:bg-white transition-transform active:scale-95"
          >
            <ChevronRight className="w-5 h-5 text-gray-900" />
          </button>
        </div>

        {/* Counter */}
        <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur text-white text-xs px-3 py-1.5 rounded-full font-medium">
          {activeIdx + 1} / {images.length}
        </div>
      </div>

      {/* Thumbnails */}
      <div className="px-4 lg:px-0 flex gap-3 overflow-x-auto py-1 scrollbar-hide snap-x">
        {images.map((img: AdImage, idx: number) => (
          <button
            key={img.id}
            onClick={() => setActiveIdx(idx)}
            className={`shrink-0 w-16 h-16 lg:w-20 lg:h-20 rounded-lg overflow-hidden border-2 transition-all snap-start ${
              activeIdx === idx
                ? "border-indigo-600 ring-2 ring-indigo-100 opacity-100"
                : "border-transparent opacity-60 hover:opacity-100"
            }`}
          >
            <Image
              width={200}
              height={100}
              alt="images"
              src={img.image_url}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default ImageGallery;
