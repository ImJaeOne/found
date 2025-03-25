'use client';

import { PATH } from '@/constants/constants';
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

const images = [
  { src: '/images/found_main01.jpg', alt: 'main01' },
  { src: '/images/found_main02.jpg', alt: 'main02' },
  { src: '/images/found_main03.jpg', alt: 'main03' },
];

const MainCarousel = () => {
  return (
    <div className="relative h-[calc(100vh-56px)]">
      <Carousel opts={{ loop: true }} className="w-full ">
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
              />
              <Button
                asChild
                variant="logo"
                size="logo"
                className="absolute bottom-12 left-3/4 z-1"
              >
                <Link href={PATH.MATELIST} className="flex items-center">
                  <Image
                    src="/images/found_logo_white.png"
                    alt="FOUND"
                    width={100}
                    height={100}
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
