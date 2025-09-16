import React from 'react';

export const PlayerCardSkeleton: React.FC = () => {
  return (
    <div className="card p-5 animate-pulse">
      <div className="flex flex-col items-center text-center">
        {/* Avatar Skeleton */}
        <div 
          className="w-28 h-28 bg-bg-primary"
          style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }}
        ></div>

        {/* Name Skeleton */}
        <div className="mt-4 h-6 w-3/4 bg-bg-primary rounded-md"></div>
        
        {/* Twitter Icon Skeleton */}
        <div className="mt-2 h-5 w-5 bg-bg-primary rounded-full"></div>

        {/* Vote Bar Skeleton */}
        <div className="w-full mt-6">
          <div className="flex justify-between mb-1">
            <div className="h-4 w-1/4 bg-bg-primary rounded-md"></div>
            <div className="h-4 w-1/4 bg-bg-primary rounded-md"></div>
          </div>
          <div className="w-full bg-black/30 rounded-full h-2.5 border border-border-primary/50"></div>
        </div>

        {/* Button Skeleton */}
        <div className="mt-6 w-full h-11 bg-bg-primary rounded-lg"></div>
      </div>
    </div>
  );
};