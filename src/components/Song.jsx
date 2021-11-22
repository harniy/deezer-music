import React, { useEffect, useRef, useState } from "react";

export default function Song(props) {
  const [play, setPlay] = useState(false);
  const [volume, setVolume] = useState(0.8);
  const { artist, setSongId, songId } = props;

  const music = useRef(null);

  useEffect(() => {
      if(artist.id !== songId) return stopSong()
  }, [songId])

  const playSong = () => {
    setSongId(artist.id);
    music.current.play();
    setPlay(true);
  };

  const stopSong = () => {
    music.current.pause();
    setPlay(false);
  };

  const checkActiveSong = () => {
    if (artist.id === songId) {
      return "song__active";
    }
  };

  useEffect(() => {
    music.current.volume = volume;
  }, [volume]);

  return (
    <div className="song__block">
      <img
        src={artist.album.cover_medium}
        alt=""
        className="song__block-poster"
      />
      <p className="song__block-name">{artist.title_short}</p>
      <p className="song__block-artist">{artist.artist.name}</p>
      <div className={`song__audio-block ${checkActiveSong()}`}>
        {!play ? (
          <span
            className="material-icons play"
            title="pay"
            onClick={() => playSong()}
          >
            play_circle_outline
          </span>
        ) : (
          <span
            className="material-icons stop"
            title="play"
            onClick={() => stopSong()}
          >
            pause_circle_outline
          </span>
        )}
        <input
          type="range"
          className="song__audio-volume"
          value={volume}
          min="0"
          step="0.1"
          max="1"
          onChange={(e) => setVolume(e.target.value)}
        />
        <a href={artist.link} className="song__audio-full" target="_blank">
          full song
        </a>
      </div>

      <audio ref={music} src={artist.preview} onEnded={() => stopSong()}></audio>
    </div>
  );
}
