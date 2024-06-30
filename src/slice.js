import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const apiKey = import.meta.env.VITE_TMDB_API_KEY;

export const fetchTrendingMovies = createAsyncThunk(
  "fetchTrending",
  async () => {
    const [day, week] = await Promise.all([
      axios.get(
        `https://api.themoviedb.org/3/trending/movie/day?language=en-US&api_key=${apiKey}`
      ),
      axios.get(
        `https://api.themoviedb.org/3/trending/movie/week?language=en-US&api_key=${apiKey}`
      ),
    ]);
    return {
      trendingMoviesByDay: day.data.results,
      trendingMoviesByWeek: week.data.results,
    };
  }
);

export const fetchPopularMovies = createAsyncThunk("fetchPopular", async () => {
  const [movies, tv] = await Promise.all([
    axios.get(
      `https://api.themoviedb.org/3/movie/popular?language=en-US&api_key=${apiKey}`
    ),
    axios.get(
      `https://api.themoviedb.org/3/tv/popular?language=en-US&api_key=${apiKey}`
    ),
  ]);
  return {
    popularMovies: movies.data.results,
    popularTVShows: tv.data.results,
  };
});

export const fetchTopRatedMovies = createAsyncThunk(
  "fetchTopRated",
  async () => {
    const [movies, tv] = await Promise.all([
      axios.get(
        `https://api.themoviedb.org/3/movie/top_rated?language=en-US&api_key=${apiKey}`
      ),
      axios.get(
        `https://api.themoviedb.org/3/tv/top_rated?language=en-US&api_key=${apiKey}`
      ),
    ]);
    return {
      topRatedMovies: movies.data.results,
      topRatedTVShows: tv.data.results,
    };
  }
);

export const searchMovies = createAsyncThunk(
  "searchMovie",
  async (searchTerm) => {
    const result = await axios.get(
      `https://api.themoviedb.org/3/search/movie?query=${searchTerm}&include_adult=false&language=en-US&api_key=${apiKey}`
    );
    return result.data.results;
  }
);


export const fetchAllDiscover = createAsyncThunk("fetchAllDiscover", async ({ page }) => {
  const [Allmovies, Alltv] = await Promise.all([
    axios.get(
      `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=popularity.desc&api_key=${apiKey}`
    ),
    axios.get(
      `https://api.themoviedb.org/3/discover/tv?include_adult=false&include_null_first_air_dates=false&language=en-US&page=${page}&sort_by=popularity.desc&api_key=${apiKey}`
    ),
  ]);
  return {
    AllMovies: Allmovies.data.results,
    AllTv: Alltv.data.results,
    page
  };
});

const slice = createSlice({
  name: "moviesSlice",
  initialState: {
    AllMovies: [],
    AllTv: [],
    page: 1,
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllDiscover.pending, (state) => {
        state.status = "Loading...";
      })
      .addCase(fetchAllDiscover.fulfilled, (state, action) => {
        state.status = "idle";
        state.AllMovies = [...state.AllMovies, ...action.payload.AllMovies];
        state.AllTv = [...state.AllTv, ...action.payload.AllTv];
        state.page = action.payload.page;
      })
      .addCase(fetchAllDiscover.rejected, (state, action) => {
        state.status = "There is an error";
        state.error = action.error.message;
      });
  },
});

export const sliceReducer = slice.reducer;