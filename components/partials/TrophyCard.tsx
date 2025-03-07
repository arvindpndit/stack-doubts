import { getMostReputedUser } from '@/lib/actions/user.action';
import Image from 'next/image';
import React from 'react';

const TrophyCard = async () => {
  const user = await getMostReputedUser();
  return (
    <div className="group relative h-[150px] mt-5 transition-all duration-500 overflow-hidden hover:h-[270px] bg-transparent">
      <div className="relative bg-gradient-to-tr from-[#fffbf0] to-[#ffdd87] dark:gradient-to-tr dark:from-[#2a1f0f] dark:to-[#6b4e1e] w-full h-[150px] rounded-[25px] transition-all duration-500 z-10 group-hover:shadow-[0_10px_15px_#b1985e]">
        <svg
          className="absolute right-0 top-1 z-20"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          width={160}
          height={160}
        >
          <path
            d="M469.333333 682.666667h85.333334v128h-85.333334zM435.2 810.666667h153.6c4.693333 0 8.533333 3.84 8.533333 8.533333v34.133333h-170.666666v-34.133333c0-4.693333 3.84-8.533333 8.533333-8.533333z"
            fill="#ea9518"
          />
          <path
            d="M384 853.333333h256a42.666667 42.666667 0 0 1 42.666667 42.666667v42.666667H341.333333v-42.666667a42.666667 42.666667 0 0 1 42.666667-42.666667z"
            fill="#6e4a32"
          />
          <path
            d="M213.333333 256v85.333333a42.666667 42.666667 0 0 0 85.333334 0V256H213.333333zM170.666667 213.333333h170.666666v128a85.333333 85.333333 0 1 1-170.666666 0V213.333333zM725.333333 256v85.333333a42.666667 42.666667 0 0 0 85.333334 0V256h-85.333334z m-42.666666-42.666667h170.666666v128a85.333333 85.333333 0 1 1-170.666666 0V213.333333z"
            fill="#f4ea2a"
          />
          <path
            d="M298.666667 85.333333h426.666666a42.666667 42.666667 0 0 1 42.666667 42.666667v341.333333a256 256 0 1 1-512 0V128a42.666667 42.666667 0 0 1 42.666667-42.666667z"
            fill="#f2be45"
          />
          <path
            d="M512 469.333333l-100.309333 52.736 19.157333-111.701333-81.152-79.104 112.128-16.298667L512 213.333333l50.176 101.632 112.128 16.298667-81.152 79.104 19.157333 111.701333z"
            fill="#FFF2A0"
          />
        </svg>
        <p className="relative text-[#ffc64b]  font-sans font-bold text-[80px] left-5 p-0 m-0 -top-1">
          1
          <span className="relative text-[40px] text-[#424c50] dark:text-[#a1bdc9]">
            st
          </span>
        </p>
        <div className="absolute w-[200px] h-[10px] top-[100px] bg-gradient-to-r from-transparent via-[#f7b733] to-transparent z-10">
          <Image
            className="absolute bottom-[-30px] left-5 rounded-full"
            src={user?.picture as string}
            width={25}
            height={25}
            alt="most reputed user"
          />
          <p className="relative font-semibold text-[#6b7578] dark:text-[#bcced4] left-14 text-sm top-[17px]">
            {user?.name}
          </p>
        </div>
      </div>
      <div className="relative hidden w-full h-[120px] bg-orange-50 dark:bg-orange-100 -top-5 z-0 transition-all duration-1000 rounded-b-[25px] overflow-hidden items-center justify-start group-hover:flex">
        <svg
          className="absolute top-4 right-[5px] animate-[slide-in-top_1s_cubic-bezier(0.65,0.05,0.36,1)_both]"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          width={80}
          height={80}
        >
          <path
            d="M896 42.666667h-128l-170.666667 213.333333h128z"
            fill="#FF4C4C"
          />
          <path
            d="M768 42.666667h-128l-170.666667 213.333333h128z"
            fill="#3B8CFF"
          />
          <path d="M640 42.666667h-128L341.333333 256h128z" fill="#F1F1F1" />
          <path
            d="M128 42.666667h128l170.666667 213.333333H298.666667z"
            fill="#FF4C4C"
          />
          <path
            d="M256 42.666667h128l170.666667 213.333333h-128z"
            fill="#3B8CFF"
          />
          <path
            d="M384 42.666667h128l170.666667 213.333333h-128z"
            fill="#FBFBFB"
          />
          <path
            d="M298.666667 256h426.666666v213.333333H298.666667z"
            fill="#E3A815"
          />
          <path
            d="M512 661.333333m-320 0a320 320 0 1 0 640 0 320 320 0 1 0-640 0Z"
            fill="#FDDC3A"
          />
          <path
            d="M512 661.333333m-256 0a256 256 0 1 0 512 0 256 256 0 1 0-512 0Z"
            fill="#E3A815"
          />
          <path
            d="M512 661.333333m-213.333333 0a213.333333 213.333333 0 1 0 426.666666 0 213.333333 213.333333 0 1 0-426.666666 0Z"
            fill="#F5CF41"
          />
          <path
            d="M277.333333 256h469.333334a21.333333 21.333333 0 0 1 0 42.666667h-469.333334a21.333333 21.333333 0 0 1 0-42.666667z"
            fill="#D19A0E"
          />
          <path
            d="M277.333333 264.533333a12.8 12.8 0 1 0 0 25.6h469.333334a12.8 12.8 0 1 0 0-25.6h-469.333334z m0-17.066666h469.333334a29.866667 29.866667 0 1 1 0 59.733333h-469.333334a29.866667 29.866667 0 1 1 0-59.733333z"
            fill="#F9D525"
          />
          <path
            d="M512 746.666667l-100.309333 52.736 19.157333-111.701334-81.152-79.104 112.128-16.298666L512 490.666667l50.176 101.632 112.128 16.298666-81.152 79.104 19.157333 111.701334z"
            fill="#FFF2A0"
          />
        </svg>
        <div className="relative h-[75px] top-[10px] mr-[10px] ml-4">
          <svg
            className="absolute top-[10px]"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            width={60}
            height={60}
          >
            <path
              d="M382.6 805H242.2c-6.7 0-12.2-5.5-12.2-12.2V434.3c0-6.7 5.5-12.2 12.2-12.2h140.4c6.7 0 12.2 5.5 12.2 12.2v358.6c0 6.6-5.4 12.1-12.2 12.1z"
              fill="#ea9518"
            />
            <path
              d="M591.1 805H450.7c-6.7 0-12.2-5.5-12.2-12.2V254.9c0-6.7 5.5-12.2 12.2-12.2h140.4c6.7 0 12.2 5.5 12.2 12.2v537.9c0 6.7-5.5 12.2-12.2 12.2z"
              fill="#f2be45"
            />
            <path
              d="M804.4 805H663.9c-6.7 0-12.2-5.5-12.2-12.2v-281c0-6.7 5.5-12.2 12.2-12.2h140.4c6.7 0 12.2 5.5 12.2 12.2v281c0.1 6.7-5.4 12.2-12.1 12.2z"
              fill="#ea9518"
            />
          </svg>
          <p className="relative block ml-[60px] text-[#424c50] tracking-[6px] font-sans mt-5 font-extrabold text-[13px]">
            SCORE
          </p>
          <p className="relative block text-[25px] font-extrabold ml-[60px] text-[#ea9518] -top-[5px]">
            {user?.reputation}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TrophyCard;

