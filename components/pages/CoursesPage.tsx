import Image from 'next/image';
import React from 'react';

const CoursesPage = ({ playlists }: any) => {
  return (
    <div className=" mx-auto pb-24 lg:mb-14">
      <h1 className="font-bold text-3xl  mx-1">All Courses</h1>
      <div className="flex flex-wrap gap-4 mt-6">
        {playlists.map((playlist: any) => (
          <div
            key={playlist.id}
            className="border border-gray-200 dark:border-gray-700 p-2 sm:p-3 dark:bg-gray-800 rounded-2xl overflow-hidden grid md:grid-cols-2 gap-3 hover:shadow-md transition-shadow"
          >
            {playlist.snippet.thumbnails && (
              <div className="relative overflow-hidden">
                <div className="h-full">
                  <Image
                    src={playlist.snippet.thumbnails.maxres.url}
                    width={700}
                    height={400}
                    alt={playlist.title}
                    className="w-full h-full object-cover rounded-2xl"
                  />
                </div>
                <div className="absolute top-3 left-3 bg-black bg-opacity-70 text-white px-3 py-1 rounded-full text-sm">
                  <span className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 mr-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    Playlist
                  </span>
                </div>
              </div>
            )}

            <div className="px-2 flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-semibold mb-2 line-clamp-2">
                  {playlist.snippet.title}
                </h3>

                <div className="flex flex-wrap gap-2 mb-3">
                  <div className="px-2.5 py-0.5 bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-white rounded-full text-sm">
                    Beginner Friendly
                  </div>
                  <div className="px-2.5 py-0.5 bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-white rounded-full text-sm">
                    Practical Learning
                  </div>
                </div>

                <div className="flex items-center gap-2 mb-3">
                  <div className=" text-gray-700 dark:text-gray-300 px-3 py-0.5 rounded-2xl">
                    <span className="font-semibold line-through">₹1999</span>
                  </div>
                  <div className="bg-green-500 text-white px-3 py-0.5 rounded-2xl">
                    <span className="font-semibold">100% Off</span>
                  </div>
                </div>
                {/* <p className="mb-3">{playlist.snippet.description}</p> */}
              </div>

              <a
                href={`https://www.youtube.com/playlist?list=${playlist.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-auto mb-1 font-bold rounded-3xl px-3 py-1.5 text-center bg-orange-500 hover:bg-orange-600 text-white w-full"
              >
                Enroll Now
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CoursesPage;

