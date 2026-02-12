export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 px-4 py-16 sm:px-6 lg:px-8 text-center">
      <div className="max-w-md w-full mx-auto">
        <h1 className="text-6xl md:text-8xl font-black text-slate-900 tracking-tight mb-4">
          404
        </h1>
        <p className="text-xl md:text-2xl text-slate-600 mb-8 leading-relaxed">
          Page not found.
        </p>
        <a
          href="/"
          className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg shadow-sm text-white bg-slate-900 hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 transition-colors duration-200"
        >
          ← Go Home
        </a>
      </div>
    </div>
  );
}
