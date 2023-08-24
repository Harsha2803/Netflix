import React, { useCallback } from 'react';
import { useRouter } from 'next/router';
import { PlayIcon } from '@heroicons/react/24/solid';

import { MovieInterface } from '@/types';
import FavoriteButton from '@/components/FavoriteButton';
import useInfoModalStore from '@/hooks/useInfoModalStore';

// creating interface for Search Results
interface SearchResultProps {
  data: MovieInterface;
}

const SearchResult: React.FC<SearchResultProps> = ({ data }) => {
  const router = useRouter();
  const { openModal } = useInfoModalStore();

  const redirectToWatch = useCallback(() => router.push(`/watch/${data.id}`), [router, data.id]);

  return (
        <div className="
          z-10
          bg-zinc-800
          p-2
          lg:p-4
          relative
          shadow-md
          rounded-md
          mt-10
          ">
          <div className="flex flex-row items-left gap-3">
            <img onClick={redirectToWatch} src={data.thumbnailUrl} alt="Movie" draggable={false} className="
              cursor-pointer
              object-cover
              transition
              duration
              shadow-xl
              rounded-md
              group-hover:opacity-100
              sm:group-hover:opacity-0
              delay-300
              w-[30vw]
              h-[15vw]
            " />
          </div>
          <div className='flex flex-row gap-3 mt-3'>
            <div onClick={redirectToWatch} className="cursor-pointer w-6 h-6 lg:w-10 lg:h-10 bg-white rounded-full flex justify-center items-center transition hover:bg-neutral-300">
              <PlayIcon className="text-black w-4 lg:w-6" />
            </div>
              <FavoriteButton movieId={data.id} />
          </div>
          <p className='text-white mt-1 mb-2'>{data.title}</p>
          <p className="text-green-400 font-semibold mt-1">
            New <span className="text-white">2023</span>
          </p>
          <p className="text-white text-[15px] mt-1 lg:text-sm">{data.duration}</p>
          <p className="flex flex-row items-center gap-2 mt-1 text-[15px] text-white lg:text-sm">{data.genre}</p>
      </div>
  )
}

export default SearchResult;
