import axios from "axios";
const BASE_URL = "https://api.themoviedb.org/3";
const TMDB_TOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3YTMxZWUzNzM4ZDkzNDZiYjVlNjQ5ZDI3ZjhjZjg1ZSIsInN1YiI6IjY1MDgyMDI5MTA5ZGVjMDE0ZjQxYzU1NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.f0Y1LFjEcHtmhOF3W83kz3DvuhD3eBFRCEp73CqJaBc";
const headers = {
    Authorization: "Bearer " + TMDB_TOKEN,
};

export const fetchDataFromApi = async(url, params) =>{
    try{
        const {data} = await axios.get(BASE_URL + url, {
            headers,
            params
        })
        return data;
    }catch(err){
        console.log(err);
        return err;
    }
}
