"use client";

import React, { useState } from "react";

type DataProps = {
  Title: string;
  Year: number;
  imdbID: string;
};

const HomePage = () => {
  const [searchInput, setSearchInput] = useState("");
  const [data, setData] = useState<{
    data: DataProps[];
    page: number;
    per_page: number;
    total: number;
    total_pages: number;
  }>();

  async function fetchData(param: string) {
    try {
      const res = await fetch(
        `https://jsonmock.hackerrank.com/api/movies?Year=${param}`
      );
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data = await res.json();
      setData(data);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  }

  return (
    <div>
      <nav className="fixed top-0 w-screen h-[50px] flex items-center justify-center bg-slate-700 space-x-1">
        <div className="bg-foreground text-background p-1">
          H<span className="bg-green-500 text-green-500">8</span>
        </div>
        <h1 className="text-green-600 font-bold">Movie List</h1>
      </nav>
      <main className="w-screen min-h-screen flex flex-col gap-4 items-center bg-zinc-100 pt-[100px]">
        <section>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              fetchData(searchInput);
            }}
            className="flex items-center gap-2">
            <input
              data-testid="app-input"
              type="number"
              inputMode="numeric"
              className="border h-[40px] px-2 bg-zinc-200"
              onChange={(e) => setSearchInput(e.target.value)}
            />
            <button
              data-testid="submit-button"
              type="submit"
              className="bg-green-500 text-background h-[40px] w-[100px] cursor-pointer hover:bg-green-700">
              Search
            </button>
          </form>
        </section>
        <section>
          <ul data-testid="movieList" className="flex flex-col gap-3">
            {data &&
              (data.data.length > 0 ? (
                data.data.map((item, index) => (
                  <li className="bg-white w-[300px] p-1 shadow" key={index}>
                    {item.Title}
                  </li>
                ))
              ) : (
                <>No Result Found</>
              ))}
          </ul>
        </section>
      </main>
    </div>
  );
};

export default HomePage;
