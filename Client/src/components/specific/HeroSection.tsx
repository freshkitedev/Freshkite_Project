import React, { useRef } from 'react';
import { Swiper, SwiperSlide, } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import SwiperCore from 'swiper';
import { useRouter } from 'next/router';
const courses = [
  {
    image: '/images/Html_Css_Js.png',
  },
  {
    image: '/images/Mern-Stack-Developer.png'
  },
  {
    image: '/images/basic_problem_solving.png'
  },
  {
    image: '/images/Dsa.webp'
  },
  {
    image: '/images/Html_Css_Js.png',
  },
  {
    image: '/images/Mern-Stack-Developer.png',
  },
  {
    image: '/images/basic_problem_solving.png'
  },
  {
    image: '/images/Dsa.webp'
  },
];

export const CourseCarousel: React.FC = () => {
  const swiperRef = useRef<SwiperCore | null>(null);
  const router = useRouter();
  const handleNav = () => {
    router.push('/course')
  }
  const handleMouseEnter = () => {
    if (swiperRef.current && swiperRef.current.autoplay) {
      swiperRef.current.autoplay.stop();
    }
  };

  const handleMouseLeave = () => {
    if (swiperRef.current && swiperRef.current.autoplay) {
      swiperRef.current.autoplay.start();
    }
  };
  return (
    <div className="py-6 m-3" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <Swiper
        spaceBetween={30} // Adds space between the slides
        slidesPerView={4} // Display two slides at a time // Adds navigation arrows // Adds pagination dots
        loop={true} // Makes the carousel loop infinitely
        autoplay={{
          delay: 500, // Slide delay in ms (3 seconds)
          disableOnInteraction: false, // Continue autoplay even after user interacts
          pauseOnMouseEnter: true, // Pause autoplay on hover
        }}
        modules={[Navigation, Pagination, Autoplay]}
        className="swiper-container"
      >
        {courses.map((course, index) => (
          <SwiperSlide key={index}>
            <div className="cursor-pointer">
              <div className="rounded-md mb-4">
                <img onClick={handleNav} src={course.image} width={500} className="rounded-md" />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};



export function HeroSection() {
  return (
    <div className=''>
      <section className=" bg-gray-200 dark:bg-gray-900 text-black dark:text-white h-screen flex flex-col justify-center">
        <div className="container mx-auto px-8 text-center m-auto">
          <h1 className="text-8xl font-bold mb-6 font-sans">Freshkite</h1>
          <p className="text-4xl mb-8 font-bold font-sans">Earn When You Learn.</p>
          <a
            href="/course"
            className="inline-block px-20 py-3 border border-green-500 text-green-500 rounded-full hover:bg-green-500 hover:text-white transition duration-300 font-sans font-bold text-xl"
          >
            View Courses
          </a>
        </div>
        <div className="">
          <CourseCarousel />
        </div>
      </section>

    </div>
  );
}


