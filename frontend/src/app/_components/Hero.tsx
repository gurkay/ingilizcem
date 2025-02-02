import Link from "next/link";
import Image from "next/image";

export default function Hero() {
  const img = "/images/vocabulary-learning.jpeg";
  return (
    <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white">
      <div className="mx-auto max-w-screen-xl px-4 py-24 lg:flex lg:h-screen lg:items-center">
        <div className="mx-auto max-w-3xl text-left">
          <h1 className="bg-gradient-to-r from-blue-200 via-indigo-300 to-purple-200 bg-clip-text text-4xl font-extrabold text-transparent sm:text-6xl">
            Master New Words
            <span className="sm:block mt-2">Remember Forever</span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg text-blue-100 leading-relaxed">
            Boost your vocabulary with our scientifically-proven spaced repetition system.
            Learn faster, remember longer, and track your progress effortlessly.
          </p>
          
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              className="block w-full rounded-xl bg-blue-500 px-8 py-4 text-sm font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 sm:w-auto transition-all duration-300 transform hover:scale-105"
              href="/auth/signin"
            >
              Start Learning Free
            </Link>
            <Link
              className="block w-full rounded-xl border-2 border-blue-300 px-8 py-4 text-sm font-medium text-blue-100 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-400 sm:w-auto transition-all duration-300"
              href="/pages/about"
            >
              How It Works
            </Link>
          </div>

          <div className="mt-8 flex items-center gap-4 text-sm text-blue-200">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
              </svg>
              <span>50K+ Active Users</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z"/>
              </svg>
              <span>10M+ Words Learned</span>
            </div>
          </div>
        </div>
        
        <div className="hidden lg:block lg:w-1/2">
          <div className="relative p-4 transform hover:scale-105 transition-all duration-500">
            <div className="absolute inset-0 bg-blue-500/10 rounded-3xl blur-xl"></div>
            <Image
              className="relative mx-auto rounded-3xl shadow-2xl shadow-blue-500/20 border-4 border-white/10"
              src={img}
              alt="Vocabulary Learning"
              width={600}
              height={600}
              priority
              style={{ objectFit: 'cover' }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
