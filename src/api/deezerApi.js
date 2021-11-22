import React, { useState, useContext } from "react";
import { SongsContext } from "../context/songsContext";

const baseUrl = 'https://deezerdevs-deezer.p.rapidapi.com/'

export const SongsFetchContext = ({children}) => {
    const [results, setResults] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState({})

    const getSongs = (name) => {
      setIsLoading(true)
      setError({})

      fetch(`${baseUrl}search?q=${name}`, {
      method: "GET",
      headers: {
        "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
        "x-rapidapi-key": "5004efafb9msh4bc462359e588c3p145a3cjsn5a13394dc6ae",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {

        if(data.error) {
          setIsLoading(false)
          setError(data)
        } else {
          setResults(data.data)
          setIsLoading(false)
        }

      })
      .catch((err) => {
        setIsLoading(false)
        setError(err)
      });

    } 
    
    return (
      <SongsContext.Provider value={{getSongs, results, setResults, isLoading, error}} >
        {children}
      </SongsContext.Provider>
    )
}


export const useResultContext = () => useContext(SongsContext) 