import apiClient from './apiClient';

const PREFIX = '';
export const getMoviesNowShowing = async () => {
    try {
        const response = await apiClient.get(`${PREFIX}/nowshowing`);
        return response.data; 
    } catch (error) {
        throw error; 
    }
};

export const getMoviesComingSoon = async () => {
    try {
        const response = await apiClient.get(`${PREFIX}/comingsoon`);
        return response.data; 
    } catch (error) {
        throw error; 
    }
};

export const getDetailMovie = async (title) => {
    try {
        const response = await apiClient.get(`${PREFIX}/detailmovie?title=${title}`);
        return response.data; 
    } catch (error) {
        throw error; 
    }
};

export const getMovieShowtimes = async (movieId, date) => {
    try {
      const response = await apiClient.get(`${PREFIX}/showtimes?movieId=${movieId}&date=${date}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  };
    