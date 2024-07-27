"use client";

import { MovieProps } from "@/types";
import MovieItem from "@/components/shared/movie/movie-item";

interface Props {
  title: string;
  data: MovieProps[];
}

const MovieRow = ({ title, data }: Props) => {
  return (
    <div className={"h-40 space-y-0.5 md:space-y-2 "}>
      <h2 className="cursor-pointer text-sm font-semibold transition-colors duration-200  md:text-2xl">
        {title}
      </h2>

      <div className={"group relative md:-ml-2"}>
        <div
          className={
            "flex items-center scrollbar-hide space-x-0.5 overflow-x-scroll overflow-y-hidden md:space-x-2.5 md:p-2"
          }
        >
          {data &&
            data
              .filter(
                (item) =>
                  item.backdrop_path !== null && item.poster_path !== null
              )
              .map((movie) => <MovieItem key={movie.id} movie={movie} />)}
        </div>
      </div>
    </div>
  );
};

export default MovieRow;
