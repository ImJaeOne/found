'use client';

import { CATEGORIES, PATH, QUERY_KEY } from '@/constants/constants';
import { Button } from '@/ui/shadcn/button';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/ui/shadcn/carousel';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { FaChevronRight } from 'react-icons/fa6';
import Autoplay from 'embla-carousel-autoplay';
import { usePrefetchUser } from '@/hooks/queries/usePrefetchUser';
import { useAuthStore } from '@/providers/AuthProvider';

const images = [
  { src: '/images/found_main01.jpg', alt: 'main01' },
  { src: '/images/found_main02.jpg', alt: 'main02' },
  { src: '/images/found_main03.jpg', alt: 'main03' },
];
const autoplayOptions = { delay: 1000 * 2, stopOnInteraction: false };

const MainCarousel = () => {
  const user = useAuthStore((state) => state.user);
  const handleHover = usePrefetchUser(user ? user.id : undefined);

  return (
    <div className="relative h-[calc(100vh-56px)]">
      <Carousel
        opts={{ loop: true }}
        plugins={[Autoplay(autoplayOptions)]}
        className="w-full "
      >
        <CarouselContent className="m-0">
          {images.map((img, idx) => (
            <CarouselItem
              key={idx}
              className="w-full relative h-[calc(100vh-56px)]"
            >
              <Image
                fill
                src={img.src}
                alt={img.alt}
                className="object-cover"
                priority={idx === 0}
              />
              <Button
                asChild
                variant="logo"
                size="logo"
                className="absolute bottom-12 left-3/4 z-1"
              >
                <Link
                  href={PATH.MATELIST}
                  className="flex items-center"
                  onMouseEnter={handleHover}
                >
                  <Image
                    src="/images/found_logo_white.png"
                    alt="FOUND"
                    width={100}
                    height={100}
                    style={{ width: 'auto', height: 'auto' }}
                    className="object-contain"
                  />
                  <FaChevronRight />
                </Link>
              </Button>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="fixed left-10 bottom-1/2 z-1 transform text-white" />
        <CarouselNext className="fixed right-10 bottom-1/2 z-1 transform text-white" />
      </Carousel>
    </div>
  );
};

export default MainCarousel;
