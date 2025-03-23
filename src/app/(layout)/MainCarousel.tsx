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

const MainCarousel = () => {
  return (
    <div className="relative h-[calc(100vh-100px)] overflow-hidden">
      <Carousel opts={{ loop: true }} className="w-full">
        <CarouselContent className="m-0">
          <CarouselItem className=" w-full relative h-screen">
            <Image
              fill
              src="/images/found_main01.jpg"
              alt="img"
              className="object-cover"
            />
          </CarouselItem>
          <CarouselItem className="w-full relative h-screen">
            <Image
              fill
              src="/images/found_main02.jpg"
              alt="Image 2"
              className="object-cover"
            />
          </CarouselItem>
          <CarouselItem className="w-full relative h-screen">
            <Image
              fill
              src="/images/found_main03.jpg"
              alt="Image 3"
              className="object-cover"
            />
          </CarouselItem>
        </CarouselContent>
        <CarouselPrevious className="fixed left-10 bottom-1/2 z-1 transform text-white" />
        <CarouselNext className="fixed right-10 bottom-1/2 z-1 transform text-white" />
      </Carousel>
      <Button
        asChild
        variant="logo"
        size="logo"
        className="fixed bottom-10 right-28 z-1"
      >
        <Link href={PATH.MATELIST}>
          <span className="italic mr-2">FOUND</span> &gt;
        </Link>
      </Button>
    </div>
  );
};

export default MainCarousel;
