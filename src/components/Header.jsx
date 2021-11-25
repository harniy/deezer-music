import React, { useEffect, useMemo, useState } from "react";
import { useResultContext } from "../api/deezerApi";

export default function Header() {
  const [songName, setSongName] = useState("");

  const { getSongs } = useResultContext();

  useEffect(() => {
    let timer

    if(songName !== '') {
     timer = setTimeout(() => {
      getSongs(songName);
      }, 1000);
    }

    return () => clearTimeout(timer);
  }, [songName]);

  return (
    <header className="header__container container">
      <div className="header__container-title">
        <a href="/deezer-music">
          <p>
            <span>vibe</span>MUSIC
          </p>
        </a>
      </div>
      <div className="header__container-inner">
        <input
          type="text"
          className="header__inner-input"
          placeholder="Search..."
          value={songName}
          onChange={(e) => setSongName(e.target.value)}
        />
        <span
          className="material-icons search-icon"
          title="search music"
          onClick={() => getSongs(songName)}
        >
          search
        </span>
        {songName.length ? (
          <span
            className="material-icons close-icon"
            title="Clear search"
            onClick={() => setSongName("")}
          >
            close
          </span>
        ) : (
          ""
        )}
      </div>
    </header>
  );
}
