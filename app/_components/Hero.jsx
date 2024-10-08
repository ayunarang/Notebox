import React from 'react'
import Image from 'next/image'

function Hero() {
  return (
    <div className="relative px-7" id="home">
      <div aria-hidden="true" className="absolute inset-0 grid grid-cols-2 -space-x-52 opacity-40 dark:opacity-20">
        <div className="blur-[106px] h-72 bg-gradient-to-br from-primary to-purple-400 dark:from-blue-700"></div>
        <div className="blur-[106px] h-44 bg-gradient-to-r from-cyan-400 to-sky-300 dark:to-indigo-600"></div>
      </div>
      <div>
        <div className="relative pt-36 ml-auto">
          <div className="lg:w-2/3 text-center mx-auto">
            <h1 className="text-gray-900 dark:text-white font-bold text-4xl sm:text-5xl md:text-6xl xl:text-7xl">Notebox is where <span className="text-primary dark:text-white">your ideas, come to life.</span></h1>
            <p className="mt-8 text-gray-700 dark:text-gray-300 md:text-base hidden md:block">Notebox makes it easy to structure your workflow just the way you want with integrated AI features to enhance productivity. Whether you're working solo or with a team, Notebox keeps everything in one place.</p>
            <div className="md:mt-16 mt-8 flex flex-wrap justify-center gap-y-4 gap-x-6">
              <a
                href="/dashboard"
                className="relative flex h-11 w-max items-center justify-center px-6 before:absolute before:inset-0 before:rounded-full before:bg-primary before:transition before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95 sm:w-max md:w-max "
              >
                <span className="relative text-base font-semibold text-white"
                >Get started</span>

              </a>

            </div>

            <Image src={'/hero.png'}
              width={390} height={390} alt='getting started'
              className="justify-center mx-auto mt-2 mb-10 md:hidden opacity-85"
            />
          </div>

        </div>
      </div>
    </div>
  )
}

export default Hero