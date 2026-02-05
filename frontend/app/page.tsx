import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 px-6 py-12">
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
            Protect Yourself From Scams
          </h1>
          <p className="text-2xl md:text-3xl text-gray-700 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
            Your digital bodyguard. Check emails, links, and phone numbers before you trust them.
          </p>
        </div>

        {/* Scan Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Email Card */}
          <Link href="/scan/email" className="group">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all duration-300 border-4 border-transparent hover:border-blue-500 cursor-pointer h-full">
              <div className="flex flex-col items-center text-center space-y-6">
                {/* Icon */}
                <div className="w-24 h-24 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                  <svg className="w-12 h-12 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                {/* Title */}
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                  Check an Email
                </h2>
                {/* Description */}
                <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed">
                  Is this email really from your bank? Let us check for you.
                </p>
              </div>
            </div>
          </Link>

          {/* Link Card */}
          <Link href="/scan/link" className="group">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all duration-300 border-4 border-transparent hover:border-green-500 cursor-pointer h-full">
              <div className="flex flex-col items-center text-center space-y-6">
                {/* Icon */}
                <div className="w-24 h-24 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                  <svg className="w-12 h-12 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                  </svg>
                </div>
                {/* Title */}
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                  Check a Link
                </h2>
                {/* Description */}
                <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed">
                  Not sure if a website is safe? We'll check it before you click.
                </p>
              </div>
            </div>
          </Link>

          {/* Phone Card */}
          <Link href="/scan/phone" className="group">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all duration-300 border-4 border-transparent hover:border-purple-500 cursor-pointer h-full">
              <div className="flex flex-col items-center text-center space-y-6">
                {/* Icon */}
                <div className="w-24 h-24 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                  <svg className="w-12 h-12 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                {/* Title */}
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                  Check a Phone Number
                </h2>
                {/* Description */}
                <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed">
                  Unknown caller? Find out if it's a scam before you answer.
                </p>
              </div>
            </div>
          </Link>
        </div>

        {/* Footer Info */}
        <div className="mt-16 text-center">
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Protected by AI technology. Your safety is our priority.
          </p>
        </div>
      </div>
    </main>
  );
}
