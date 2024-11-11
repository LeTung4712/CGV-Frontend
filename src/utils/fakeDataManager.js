import { fakeMovies, fakeShowtimes, fakeEvents, fakePromotions, fakeSeatStatus } from '../constants/fakeData';

const useFakeData = import.meta.env.VITE_USE_FAKE_DATA === 'true';



export const fakeDataManager = {
  getMovies: (realData = []) => {
    return getFakeDataIfEnabled(fakeMovies, realData);
  },
  
  getShowtimes: (realData = []) => {
    return getFakeDataIfEnabled(fakeShowtimes, realData);
  },
  
  getEvents: (realData = []) => {
    return getFakeDataIfEnabled(fakeEvents, realData);
  },
  
  getPromotions: (realData = []) => {
    return getFakeDataIfEnabled(fakePromotions, realData);
  },
  
  getSeatStatus: (realData = []) => {
    return getFakeDataIfEnabled(fakeSeatStatus, realData);
  }
};

function getFakeDataIfEnabled(fakeData, realData) {
  if (useFakeData) {
    console.log('🚨 Đang sử dụng fake data:', fakeData.constructor.name);
    return fakeData;
  }
  return realData;
}

// Helper function để kiểm tra trạng thái fake data
export const isFakeDataEnabled = () => useFakeData; 