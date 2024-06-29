import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchTrendingMovies = createAsyncThunk(
  "fetchTrending",
  async () => {
    try {
      const [day, week] = await Promise.all([
        axios.get(
          "https://api.themoviedb.org/3/trending/movie/day?language=en-US&api_key=" +
            import.meta.env.VITE_TMDB_API_KEY
        ),
        axios.get(
          "https://api.themoviedb.org/3/trending/movie/week?language=en-US&api_key=" +
            import.meta.env.VITE_TMDB_API_KEY
        ),
      ]);
      return {
        trendingMoviesByDay: day.data.results,
        trendingMoviesByWeek: week.data.results,
      };
    } catch (err) {
      return err;
    }
  }
);

export const fetchPopularMovies = createAsyncThunk("fetchPopular", async () => {
  try {
    const [movies, tv] = await Promise.all([
      axios.get(
        "https://api.themoviedb.org/3/movie/popular?language=en-US&api_key=" +
          import.meta.env.VITE_TMDB_API_KEY
      ),
      axios.get(
        "https://api.themoviedb.org/3/tv/popular?language=en-US&api_key=" +
          import.meta.env.VITE_TMDB_API_KEY
      ),
    ]);
    return {
      popularMovies: movies.data.results,
      popularTVShows: tv.data.results,
    };
  } catch (err) {
    return err;
  }
});

export const fetchTopRatedMovies = createAsyncThunk(
  "fetchTopRated",
  async () => {
    try {
      const [movies, tv] = await Promise.all([
        axios.get(
          "https://api.themoviedb.org/3/movie/top_rated?language=en-US&api_key=" +
            import.meta.env.VITE_TMDB_API_KEY
        ),
        axios.get(
          "https://api.themoviedb.org/3/tv/top_rated?language=en-US&api_key=" +
            import.meta.env.VITE_TMDB_API_KEY
        ),
      ]);
      return {
        topRatedMovies: movies.data.results,
        topRatedTVShows: tv.data.results,
      };
    } catch (err) {
      return err;
    }
  }
);

export const searchMovies = createAsyncThunk(
  "searchMovie",
  async (searchTerm) => {
    try {
      const result = await axios.get(
        "https://api.themoviedb.org/3/search/movie?query= " +
          searchTerm +
          "&include_adult=false&language=en-US&api_key=" +
          import.meta.env.VITE_TMDB_API_KEY
      );
      return result.data.results;
    } catch (err) {
      return err;
    }
  }
);


export const fetchAllMovies = createAsyncThunk("fetchAllMovies", async () => {
  try {
    const moviesResult = await axios.get("https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&api_key=" + import.meta.env.VITE_TMDB_API_KEY);

    console.log(moviesResult.data.results);
    return moviesResult.data.results;
  } catch (err) {
    return err;
  }
});

// https://api.themoviedb.org/3/genre/movie/list?language=en&api_key=6a20de0fdcb63326f58d95feefcfed77  := genres
// https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.des

const slice = createSlice({
  name: "moviesSlice",
  initialState: {
    trendingMoviesByDay: [],
    trendingMoviesByWeek: [],
    popularMovies: [],
    popularTVShows: [],
    topRatedMovies: [],
    topRatedTVShows: [],
    searchResults: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTrendingMovies.pending, (state, action) => {
        state.status = "Loading...";
      })
      .addCase(fetchTrendingMovies.fulfilled, (state, action) => {
        state.trendingMoviesByDay = action.payload.trendingMoviesByDay;
        state.trendingMoviesByWeek = action.payload.trendingMoviesByWeek;
      })
      .addCase(fetchTrendingMovies.rejected, (state, action) => {
        state.status = "There is an error";
        state.error = action.payload;
      })
      .addCase(fetchPopularMovies.pending, (state, action) => {
        state.status = "Loading...";
      })
      .addCase(fetchPopularMovies.fulfilled, (state, action) => {
        state.popularMovies = action.payload.popularMovies;
        state.popularTVShows = action.payload.popularTVShows;
      })
      .addCase(fetchPopularMovies.rejected, (state, action) => {
        state.status = "There is an error";
        state.error = action.payload;
      })
      .addCase(fetchTopRatedMovies.pending, (state, action) => {
        state.status = "Loading...";
      })
      .addCase(fetchTopRatedMovies.fulfilled, (state, action) => {
        state.topRatedMovies = action.payload.topRatedMovies;
        state.topRatedTVShows = action.payload.topRatedTVShows;
      })
      .addCase(fetchTopRatedMovies.rejected, (state, action) => {
        state.status = "There is an error";
        state.error = action.payload;
      })
      .addCase(searchMovies.pending, (state, action) => {
        state.status = "Loading...";
      })
      .addCase(searchMovies.fulfilled, (state, action) => {
        state.searchResults = action.payload;
      })
      .addCase(searchMovies.rejected, (state, action) => {
        state.status = "There is an error";
        state.error = action.payload;
      });
  },
});

export const sliceReducer = slice.reducer;
