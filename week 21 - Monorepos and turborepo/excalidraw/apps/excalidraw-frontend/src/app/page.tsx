import Link from "next/link"
import { ArrowRight, CheckCircle, Zap, Users, Cloud, Palette } from "lucide-react"

export default function Home() {
  return (
    <div className="bg-black font-sans min-h-screen flex flex-col text-white">
      {/* Header */}
      <header className="fixed top-0 left-0 w-full backdrop-blur-md bg-black/80 border-b border-gray-800/50 shadow-lg shadow-blue-900/5 z-50">
        <nav className="container mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent">
            CanvasCraft
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button className="p-2 rounded-md bg-gray-800/50 hover:bg-gray-700/50 transition-colors">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>

          {/* Desktop navigation */}
          <div className="hidden md:flex space-x-1 lg:space-x-4 items-center">
            <Link
              href="/features"
              className="px-3 py-2 text-gray-400 hover:text-white hover:bg-gray-800/50 rounded-md transition-all"
            >
              Features
            </Link>
            <Link
              href="/pricing"
              className="px-3 py-2 text-gray-400 hover:text-white hover:bg-gray-800/50 rounded-md transition-all"
            >
              Pricing
            </Link>
            <Link
              href="/about"
              className="px-3 py-2 text-gray-400 hover:text-white hover:bg-gray-800/50 rounded-md transition-all"
            >
              About
            </Link>
            <Link
              href="/signin"
              className="ml-2 cursor-pointer bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-colors"
            >
              Sign In
            </Link>
            <Link
              href="/signup"
              className="cursor-pointer bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white px-4 py-2 rounded-md transition-all duration-300 shadow-lg shadow-blue-900/20"
            >
              Sign Up
            </Link>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-black to-gray-900 pt-32 pb-20 md:pt-40 md:pb-32 flex-grow flex items-center relative overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl"></div>
        </div>

        <div className="container flex flex-col gap-8 mx-auto px-4 sm:px-6 text-center relative z-10">
          <div className="space-y-2">
            <span className="inline-block px-3 py-1 text-xs font-medium bg-blue-900/30 text-blue-400 rounded-full mb-4">
              Whiteboarding Reimagined
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4 bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent leading-tight max-w-4xl mx-auto">
              Create, Collaborate, and Innovate with CanvasCraft
            </h1>
            <p className="text-lg md:text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
              Unleash your creativity with a simple, intuitive drawing tool designed for teams, educators, and
              individuals—anytime, anywhere.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-4 max-w-md mx-auto w-full">
            <button className="cursor-pointer bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white px-8 py-3 rounded-lg text-lg font-semibold transition-all duration-300 shadow-lg shadow-blue-900/20 flex items-center justify-center gap-2 group">
              Get Started
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <Link
              href="/canvas/8"
              className="bg-gray-900 border border-gray-700 hover:border-blue-500 text-gray-300 hover:text-white px-8 py-3 rounded-lg text-lg font-semibold transition-all duration-300 flex items-center justify-center"
            >
              Try Demo
            </Link>
          </div>

          <div className="flex flex-wrap justify-center gap-x-8 gap-y-2 mt-6">
            <p className="text-sm text-gray-500 flex items-center">
              <CheckCircle className="w-4 h-4 mr-2 text-blue-500" />
              No credit card required
            </p>
            <p className="text-sm text-gray-500 flex items-center">
              <CheckCircle className="w-4 h-4 mr-2 text-blue-500" />
              Free to start
            </p>
            <p className="text-sm text-gray-500 flex items-center">
              <CheckCircle className="w-4 h-4 mr-2 text-blue-500" />
              Join thousands of happy users
            </p>
          </div>

          {/* Hero image */}
          <div className="mt-12 mx-auto max-w-4xl w-full rounded-xl overflow-hidden border border-gray-800 shadow-2xl shadow-blue-900/10">
            {/* make div width simlaar to jpg image */}
            <div className="w-full h-full">
            <div className="relative bg-gray-900 rounded-xl overflow-hidden aspect-video">
              <div className="absolute inset-0 flex items-center justify-center">
              <video
                  src="/canvascraft.mp4"
                  autoPlay
                  muted
                  loop
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                
                {/* Play button */}
                <Link href="/canvas/8" className="absolute inset-0 text-lg m-auto w-24 h-10 gap-2 bg-blue-600 rounded-md flex items-center justify-center hover:bg-blue-500 transition-colors group">
                  <svg
                    className="w-5 h-5 text-white group-hover:scale-110 transition-transform"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M6.3 2.841A1.5 1.5 0 004 4.11v11.78a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                  </svg>
                  Demo
                </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Features Section */}
      <section className="py-24 bg-gradient-to-b from-gray-900 to-black relative">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 right-0 w-64 h-64 bg-blue-600/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 left-0 w-64 h-64 bg-indigo-600/5 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          {/* Headline */}
          <div className="text-center mb-16">
            <span className="inline-block px-3 py-1 text-xs font-medium bg-blue-900/30 text-blue-400 rounded-full mb-4">
              Powerful Features
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Why You'll Love CanvasCraft</h2>
            <p className="text-lg text-gray-400 max-w-3xl mx-auto">
              Powerful tools designed to spark creativity and streamline collaboration for everyone.
            </p>
          </div>

          {/* Feature Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {/* Feature 1 */}
            <div className="group cursor-pointer bg-gradient-to-b from-gray-800 to-gray-900 p-6 rounded-xl border border-gray-800 hover:border-blue-500/50 shadow-lg shadow-black/25 hover:shadow-blue-900/10 transition-all duration-300">
              <div className="bg-blue-900/20 text-blue-400 p-3 rounded-lg inline-block mb-4">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-blue-400 transition-colors">
                Real-Time Collaboration
              </h3>
              <p className="text-gray-400 mb-4">
                Work seamlessly with your team in real time, no matter where they are.
              </p>
              <Link
                href="/features/collaboration"
                className="inline-flex items-center text-blue-400 hover:text-blue-300 text-sm font-medium group-hover:underline"
              >
                Learn More
                <ArrowRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* Feature 2 */}
            <div className="group cursor-pointer bg-gradient-to-b from-gray-800 to-gray-900 p-6 rounded-xl border border-gray-800 hover:border-blue-500/50 shadow-lg shadow-black/25 hover:shadow-blue-900/10 transition-all duration-300">
              <div className="bg-blue-900/20 text-blue-400 p-3 rounded-lg inline-block mb-4">
                <Palette className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-blue-400 transition-colors">
                Customizable Tools
              </h3>
              <p className="text-gray-400 mb-4">Tailor your drawing experience with flexible, user-friendly tools.</p>
              <Link
                href="/features/tools"
                className="inline-flex items-center text-blue-400 hover:text-blue-300 text-sm font-medium group-hover:underline"
              >
                Learn More
                <ArrowRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* Feature 3 */}
            <div className="group cursor-pointer bg-gradient-to-b from-gray-800 to-gray-900 p-6 rounded-xl border border-gray-800 hover:border-blue-500/50 shadow-lg shadow-black/25 hover:shadow-blue-900/10 transition-all duration-300">
              <div className="bg-blue-900/20 text-blue-400 p-3 rounded-lg inline-block mb-4">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-blue-400 transition-colors">
                Advanced Analytics
              </h3>
              <p className="text-gray-400 mb-4">Track usage and gain insights with detailed, actionable reports.</p>
              <Link
                href="/features/analytics"
                className="inline-flex items-center text-blue-400 hover:text-blue-300 text-sm font-medium group-hover:underline"
              >
                Learn More
                <ArrowRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* Feature 4 */}
            <div className="group cursor-pointer bg-gradient-to-b from-gray-800 to-gray-900 p-6 rounded-xl border border-gray-800 hover:border-blue-500/50 shadow-lg shadow-black/25 hover:shadow-blue-900/10 transition-all duration-300">
              <div className="bg-blue-900/20 text-blue-400 p-3 rounded-lg inline-block mb-4">
                <Cloud className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-blue-400 transition-colors">
                Cloud Sync
              </h3>
              <p className="text-gray-400 mb-4">Access and sync your drawings across devices effortlessly.</p>
              <Link
                href="/features/cloud"
                className="inline-flex items-center text-blue-400 hover:text-blue-300 text-sm font-medium group-hover:underline"
              >
                Learn More
                <ArrowRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Visual Demo */}
          <div className="mt-20">
            <div className="bg-gradient-to-b from-gray-800 to-gray-900 rounded-xl overflow-hidden border border-gray-800 shadow-xl shadow-black/25">
              <div className="relative aspect-[16/9]">
                <div className="absolute inset-0 flex items-center justify-center">
                <video
                  src="/canvascraft.mp4"
                  autoPlay
                  muted
                  loop
                  className="w-full h-full object-cover"
                />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-8 text-left">
                  <h3 className="text-2xl font-bold text-white mb-2">See CanvasCraft in Action</h3>
                  <p className="text-gray-300 mb-4 max-w-lg">
                    Watch how teams use CanvasCraft to bring their ideas to life with our intuitive drawing tools.
                  </p>
                  <Link href="/canvas/8" className="w-fit bg-blue-600 hover:bg-blue-500 text-white px-6 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 shadow-lg shadow-blue-900/20">
                    Try CanvasCraft
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M6.3 2.841A1.5 1.5 0 004 4.11v11.78a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-20 text-center">
            <div className="bg-gradient-to-r from-gray-900 to-gray-800 p-8 md:p-12 rounded-xl border border-gray-800 shadow-xl shadow-black/25 max-w-4xl mx-auto">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Ready to transform your creative process?
              </h3>
              <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
                Join thousands of teams and individuals who have already discovered the power of CanvasCraft.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <button className="cursor-pointer bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white px-8 py-3 rounded-lg text-lg font-semibold transition-all duration-300 shadow-lg shadow-blue-900/20">
                  Try It Now
                </button>
                <Link
                  href="/pricing"
                  className="bg-gray-800 border border-gray-700 hover:border-blue-500 text-gray-300 hover:text-white px-8 py-3 rounded-lg text-lg font-semibold transition-all duration-300"
                >
                  View Pricing
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black border-t border-gray-800 py-12">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent mb-4">
                CanvasCraft
              </div>
              <p className="text-gray-500 mb-4">The collaborative drawing tool for your team's best ideas.</p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-500 hover:text-white transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                  </svg>
                </a>
                <a href="#" className="text-gray-500 hover:text-white transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                </a>
                <a href="#" className="text-gray-500 hover:text-white transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </a>
              </div>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-4">Product</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/features" className="text-gray-500 hover:text-white transition-colors">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="/pricing" className="text-gray-500 hover:text-white transition-colors">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="/integrations" className="text-gray-500 hover:text-white transition-colors">
                    Integrations
                  </Link>
                </li>
                <li>
                  <Link href="/changelog" className="text-gray-500 hover:text-white transition-colors">
                    Changelog
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-4">Resources</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/blog" className="text-gray-500 hover:text-white transition-colors">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="/documentation" className="text-gray-500 hover:text-white transition-colors">
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link href="/tutorials" className="text-gray-500 hover:text-white transition-colors">
                    Tutorials
                  </Link>
                </li>
                <li>
                  <Link href="/support" className="text-gray-500 hover:text-white transition-colors">
                    Support
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/about" className="text-gray-500 hover:text-white transition-colors">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="/careers" className="text-gray-500 hover:text-white transition-colors">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-gray-500 hover:text-white transition-colors">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="/legal" className="text-gray-500 hover:text-white transition-colors">
                    Legal
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 mb-4 md:mb-0">© 2025 CanvasCraft. All rights reserved.</p>
            <div className="flex space-x-6">
              <Link href="/terms" className="text-gray-500 hover:text-white transition-colors text-sm">
                Terms
              </Link>
              <Link href="/privacy" className="text-gray-500 hover:text-white transition-colors text-sm">
                Privacy
              </Link>
              <Link href="/cookies" className="text-gray-500 hover:text-white transition-colors text-sm">
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

