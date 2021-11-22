import React, { useState, useEffect, useRef } from "react";
import Song from "./Song";

import { useResultContext } from "../api/deezerApi";
import Loader from "react-loader-spinner";

export default function Main() {
  const [songId, setSongId] = useState(null);

  const { results, isLoading, error } = useResultContext();



  return (
    <main className="main__container container">
      <h3 className="main__container-title">Original Soundtrack</h3>

      {!isLoading && !error?.error?.message && (
        <div className="main__container-songs">
          {results?.map((artist, i) => (
            <div key={artist.id}className="song__container-block" >
            <Song artist={artist} setSongId={setSongId} songId={songId} />
              </div>
          ))}
        </div>
      )}

      {isLoading && (
        <Loader
          style={{ textAlign: "center", margin: "100px" }}
          type="Puff"
          color="#ffd11a94"
          height={100}
          width={100}
        />
      )}

      {error?.error?.message && (
        <p className="error">Error: {error?.error?.message}</p>
      )}
    </main>
  );
}
