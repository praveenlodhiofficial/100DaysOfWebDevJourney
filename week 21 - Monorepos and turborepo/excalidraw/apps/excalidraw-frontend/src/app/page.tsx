import Link from "next/link";

export default function Home() {
  return (
    <div className="bg-gray-100 font-sans min-h-screen flex flex-col">
      {/* Header (unchanged) */}
      <header className="fixed top-0 left-0 w-full backdrop-blur bg-white/60 shadow-md z-50">
        <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-gray-800">Excalidraw</div>
          <div className="space-x-4 flex gap-4 items-center">
            <Link href="/features" className="text-gray-600 hover:text-gray-800">
              Features
            </Link>
            <Link href="/pricing" className="text-gray-600 hover:text-gray-800">
              Pricing
            </Link>
            <Link href="/about" className="text-gray-600 hover:text-gray-800">
              About
            </Link>
            <Link href="/signin" className="cursor-pointer bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300">
              Sign In
            </Link>
            <Link href="/signup" className="cursor-pointer bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
              Sign Up
            </Link>
          </div>
        </nav>
      </header>

      {/* Hero Section (unchanged) */}
      <section className="bg-blue-50 py-24 md:py-32 flex-grow flex items-center relative overflow-hidden">
        <div className="items-center jus container flex flex-col gap-5 mx-auto px-6 text-center relative z-10">
          <h1 className="w-2/3 text-center text-4xl md:text-6xl font-extrabold mb-4 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Create, Collaborate, and Innovate with Excalidraw
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Unleash your creativity with a simple, intuitive drawing tool designed for teams, educators, and individuals—anytime, anywhere.
          </p>
          <div className="flex justify-center gap-4">
            <button className="cursor-pointer bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-all duration-300 shadow-md">
              Get Started
            </button>
            <Link href="/demo" className="bg-transparent border-2 border-blue-600 text-blue-600 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-600 hover:text-white transition-all duration-300">
              Try Demo
            </Link>
          </div>
          <p className="text-sm text-gray-500 mt-6">
            No credit card required • Free to start • Join thousands of happy users
          </p>
        </div>
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <circle cx="50" cy="50" r="40" fill="url(#gradient)" />
            <defs>
              <radialGradient id="gradient" cx="50%" cy="50%" r="50%">
                <stop offset="0%" style={{ stopColor: "#3b82f6" }} />
                <stop offset="100%" style={{ stopColor: "#ffffff" }} />
              </radialGradient>
            </defs>
          </svg>
        </div>
      </section>

      {/* Enhanced Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          {/* Headline */}
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-4">
            Why You’ll Love Excalidraw
          </h2>
          {/* Subheadline */}
          <p className="text-lg text-gray-600 text-center mb-12 max-w-3xl mx-auto">
            Powerful tools designed to spark creativity and streamline collaboration for everyone.
          </p>
          {/* Feature Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Feature 1 */}
            <div className="cursor-pointer bg-gray-50 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 text-center">
              <div className="text-blue-600 text-5xl mb-4">✏️</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Real-Time Collaboration</h3>
              <p className="text-gray-600 mb-4">
                Work seamlessly with your team in real time, no matter where they are.
              </p>
              <Link href="/features/collaboration" className="text-blue-600 hover:underline text-sm">
                Learn More
              </Link>
            </div>
            {/* Feature 2 */}
            <div className="cursor-pointer bg-gray-50 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 text-center">
              <div className="text-blue-600 text-5xl mb-4">🎨</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Customizable Tools</h3>
              <p className="text-gray-600 mb-4">
                Tailor your drawing experience with flexible, user-friendly tools.
              </p>
              <Link href="/features/tools" className="text-blue-600 hover:underline text-sm">
                Learn More
              </Link>
            </div>
            {/* Feature 3 */}
            <div className="cursor-pointer bg-gray-50 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 text-center">
              <div className="text-blue-600 text-5xl mb-4">📊</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Advanced Analytics</h3>
              <p className="text-gray-600 mb-4">
                Track usage and gain insights with detailed, actionable reports.
              </p>
              <Link href="/features/analytics" className="text-blue-600 hover:underline text-sm">
                Learn More
              </Link>
            </div>
            {/* Feature 4 */}
            <div className="cursor-pointer bg-gray-50 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 text-center">
              <div className="text-blue-600 text-5xl mb-4">☁️</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Cloud Sync</h3>
              <p className="text-gray-600 mb-4">
                Access and sync your drawings across devices effortlessly.
              </p>
              <Link href="/features/cloud" className="text-blue-600 hover:underline text-sm">
                Learn More
              </Link>
            </div>
          </div>
          {/* Visual Placeholder */}
          <div className="mt-12 text-center">
            <div className="bg-gray-200 h-64 rounded-lg flex items-center justify-center text-gray-500">
              [Insert Screenshot or Demo Animation Here]
            </div>
          </div>
          {/* CTA */}
          <div className="mt-12 text-center">
            <button className="cursor-pointer bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-all duration-300 shadow-md">
              Try It Now
            </button>
          </div>
        </div>
      </section>

      {/* Footer (unchanged) */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-6 text-center">
          <div className="mb-4 space-x-4">
            <Link href="/" className="text-gray-400 hover:text-white">Home</Link>
            <Link href="/features" className="text-gray-400 hover:text-white">Features</Link>
            <Link href="/pricing" className="text-gray-400 hover:text-white">Pricing</Link>
            <Link href="/contact" className="text-gray-400 hover:text-white">Contact</Link>
          </div>
          <p className="text-gray-400">© 2025 Excalidraw. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}