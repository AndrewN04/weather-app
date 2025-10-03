'use client';

export function WeatherCardSkeleton() {
  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6 md:p-8 animate-pulse">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 sm:mb-6">
        <div>
          <div className="h-8 sm:h-10 bg-gray-300 rounded w-48 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-32"></div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4 sm:gap-8 mb-4 sm:mb-8">
        <div className="flex items-center gap-3 sm:gap-6">
          <div className="w-20 h-20 sm:w-32 sm:h-32 bg-gray-300 rounded flex-shrink-0"></div>
          <div className="flex-1">
            <div className="h-12 sm:h-16 bg-gray-300 rounded w-24 mb-2"></div>
            <div className="h-5 bg-gray-200 rounded w-32 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-28"></div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="flex items-start gap-2">
              <div className="w-5 h-5 bg-gray-300 rounded mt-1"></div>
              <div className="flex-1">
                <div className="h-3 bg-gray-200 rounded w-16 mb-1"></div>
                <div className="h-4 bg-gray-300 rounded w-20"></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:gap-6 pt-4 sm:pt-6 border-t border-gray-200">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gray-300 rounded flex-shrink-0"></div>
          <div className="flex-1">
            <div className="h-3 bg-gray-200 rounded w-12 mb-1"></div>
            <div className="h-5 bg-gray-300 rounded w-16"></div>
          </div>
        </div>
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gray-300 rounded flex-shrink-0"></div>
          <div className="flex-1">
            <div className="h-3 bg-gray-200 rounded w-12 mb-1"></div>
            <div className="h-5 bg-gray-300 rounded w-16"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ForecastCardSkeleton() {
  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6 animate-pulse">
      <div className="h-6 sm:h-7 bg-gray-300 rounded w-48 mb-3 sm:mb-4"></div>
      <div className="h-32 bg-gray-200 rounded"></div>
    </div>
  );
}

export function MapCardSkeleton() {
  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6 animate-pulse">
      <div className="h-6 sm:h-7 bg-gray-300 rounded w-40 mb-3 sm:mb-4"></div>
      <div className="h-64 sm:h-96 bg-gray-200 rounded"></div>
    </div>
  );
}
