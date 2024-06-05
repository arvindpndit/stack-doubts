import Image from "next/image";
import React from "react";

const CoursesPage = ({ playlists }: any) => {
  return (
    <div className="container mx-auto p-4 mt-8 mb-24 lg:mb-14">
      <h1 className="font-bold text-3xl">All Courses</h1>
      <div className="flex  flex-wrap gap-4 mt-6">
        {playlists.map((playlist: any) => (
          <div
            key={playlist.id}
            className=" border p-2 bg-gray-50 rounded-2xl overflow-hidden grid md:grid-cols-2"
          >
            {playlist.snippet.thumbnails && (
              <div className="relative ">
                <Image
                  src={playlist.snippet.thumbnails.maxres.url}
                  width={700}
                  height={400}
                  alt={playlist.title}
                  className="w-full object-cover rounded-2xl "
                />
              </div>
            )}
            <div className="px-2 flex-grow">
              <h3 className="text-lg font-semibold mb-2">
                {playlist.snippet.title}
              </h3>
              <div className="flex items-center gap-5 mb-4">
                <div className="bg-gray-200 text-gray-700 px-3 py-1 rounded-2xl">
                  <span className=" font-semibold line-through">₹1999</span>
                </div>
                <div className="bg-green-500 text-white px-3 py-1 rounded-2xl">
                  <span className="font-bold">FREE</span>
                </div>
              </div>

              {/* <p className="text-gray-600">{playlist.snippet.description}</p> */}
              <div className="flex flex-col text-gray-700 ">
                <div className="flex h-fit space-x-2 text-sm font-medium">
                  <div className="rounded-full bg-green-100 px-2 py-0.5 text-green-700">
                    Beginner Friendly
                  </div>

                  <div className="rounded-full bg-blue-100 px-2 py-0.5 text-blue-700">
                    Practical Learning
                  </div>
                </div>
                <a
                  href={`https://www.youtube.com/playlist?list=${playlist.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="my-3 font-semibold rounded-2xl px-3 py-1 text-center transition hover:scale-105 bg-orange-500 hover:bg-orange-600 text-white sm:ml-auto"
                >
                  Enroll Now
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CoursesPage;
