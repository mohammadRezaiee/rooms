import {createSlice} from '@reduxjs/toolkit';
import moment from 'moment-jalaali';
import axios from 'axios';
//import {apiCallBegan} from './api';

const slice = createSlice({
  name: 'hotles',
  initialState: {
    searchField: '',
    allCities: [],
    city: {},
    arrangBy: '',
    isChanged: false,

    mainList: [],

    filteredList: [],

    filters: {
      price: 5000000,

      stars: 0,

      rating: 0,

      roomCapacity: [],

      datePeriod: {
        startDate: null,
        endDate: null,
      },

      distance: 15,

      wifi: false,

      pool: false,

      spa: false,

      breakfast: false,

      accomodation: 'همه',
    },
  },
  reducers: {
    hotelsRequested: (hotels, action) => {
      hotels.mainList = action.payload;
      hotels.filteredList = action.payload;
    },
    resetFilters: (hotels, action) => {
      hotels.filters = {
        price: 5000000,

        stars: 0,

        rating: 0,

        roomCapacity: [],

        datePeriod: {
          startDate: null,
          endDate: null,
        },

        distance: 15,

        wifi: false,

        pool: false,

        spa: false,

        breakfast: false,

        accomodation: 'همه',
      };
    },
    arrangeHotels: (hotels, action) => {
      switch (action.payload) {
        case 'تعداد ستاره‌ها':
          hotels.filteredList.sort((a, b) => b.stars - a.stars);
          //hotels.mainList = hotels.filteredList;
          hotels.isChanged = !hotels.isChanged;
          break;
        case 'قیمت':
          hotels.filteredList.sort((a, b) => b.room.price - a.room.price);
          //hotels.mainList = hotels.filteredList;
          hotels.isChanged = !hotels.isChanged;
          break;
        case 'فاصله تا مکان شما':
          hotels.filteredList.sort((a, b) => a.distance - b.distance);
          //hotels.mainList = hotels.filteredList;
          hotels.isChanged = !hotels.isChanged;
          break;
        case 'امتیاز':
          hotels.filteredList.sort((a, b) => b.rating - a.rating);
          //hotels.mainList = hotels.filteredList;
          hotels.isChanged = !hotels.isChanged;
          break;
        default:
          return hotels.filteredList;
      }
    },
    filterHotelsBySearching: (hotels, action) => {
      hotels.filteredList = filterPrice(
        hotels.filteredList,
        hotels.filters.price,
      );

      hotels.filteredList = filterRating(
        hotels.filteredList,
        hotels.filters.rating,
      );

      hotels.filteredList = filterStars(
        hotels.filteredList,
        hotels.filters.stars,
      );

      hotels.filteredList = filterFeatures(hotels.filteredList, hotels.filters);

      hotels.filteredList = filterAccomodation(
        hotels.filteredList,
        hotels.filters.accomodation,
      );

      if (hotels.filters.roomCapacity.length > 0)
        hotels.filteredList = filterByCapacity(
          hotels.filteredList,
          hotels.filters.roomCapacity,
        );

      if (hotels.filters.datePeriod.startDate !== null)
        hotels.filteredList = filterByDate(
          hotels.filteredList,
          hotels.filters.datePeriod,
        );

      hotels.filteredList.sort((a, b) => a.hotelID - b.hotelID);
    },
    filterHotels: (hotels, action) => {
      hotels.filters = action.payload;
      hotels.filteredList = hotels.mainList;

      hotels.filteredList = filterPrice(
        hotels.filteredList,
        hotels.filters.price,
      );

      hotels.filteredList = filterRating(
        hotels.filteredList,
        hotels.filters.rating,
      );

      hotels.filteredList = filterStars(
        hotels.filteredList,
        hotels.filters.stars,
      );

      hotels.filteredList = filterFeatures(hotels.filteredList, hotels.filters);

      hotels.filteredList = filterAccomodation(
        hotels.filteredList,
        hotels.filters.accomodation,
      );

      if (hotels.filters.roomCapacity.length > 0)
        hotels.filteredList = filterByCapacity(
          hotels.filteredList,
          hotels.filters.roomCapacity,
        );

      if (hotels.filters.datePeriod.startDate !== null)
        hotels.filteredList = filterByDate(
          hotels.filteredList,
          hotels.filters.datePeriod,
        );
    },

    setCapacity: (hotels, action) => {
      //hotels.filters.roomCapacity = action.payload;
      hotels.filters.roomCapacity = [];

      const cap = action.payload[0].adult + action.payload[0].children;
      if (cap !== 0) {
        hotels.filters.roomCapacity.push({
          cap,
          count: 1,
        });
        for (let i = 1; i < action.payload.length; i++) {
          const cap = action.payload[i].adult + action.payload[i].children;
          const index = hotels.filters.roomCapacity.findIndex(
            item => item.cap === cap,
          );
          if (index === -1) {
            hotels.filters.roomCapacity.push({
              cap,
              count: 1,
            });
          } else {
            let count = hotels.filters.roomCapacity[index].count;
            hotels.filters.roomCapacity[index].count = count + 1;
          }
        }
      }

      hotels.filteredList = hotels.mainList;

      hotels.filteredList = filterPrice(
        hotels.filteredList,
        hotels.filters.price,
      );

      hotels.filteredList = filterRating(
        hotels.filteredList,
        hotels.filters.rating,
      );

      hotels.filteredList = filterStars(
        hotels.filteredList,
        hotels.filters.stars,
      );

      hotels.filteredList = filterFeatures(hotels.filteredList, hotels.filters);

      hotels.filteredList = filterAccomodation(
        hotels.filteredList,
        hotels.filters.accomodation,
      );

      if (hotels.filters.roomCapacity.length > 0)
        hotels.filteredList = filterByCapacity(
          hotels.filteredList,
          hotels.filters.roomCapacity,
        );

      if (hotels.filters.datePeriod.startDate !== null)
        hotels.filteredList = filterByDate(
          hotels.filteredList,
          hotels.filters.datePeriod,
        );

      hotels.filteredList.sort((a, b) => a.hotelID - b.hotelID);
    },

    filterByDateAndCount: (hotels, action) => {
      if (hotels.filters.roomCapacity.length > 0) {
        hotels.filteredList = filterByCapacity(
          hotels.filteredList,
          hotels.filters.roomCapacity,
        );
      }

      if (hotels.filters.datePeriod.startDate !== null) {
        hotels.filteredList = filterByDate(
          hotels.filteredList,
          hotels.filters.datePeriod,
        );
      }

      hotels.filteredList.sort((a, b) => a.hotelID - b.hotelID);
    },

    setSearchField: (hotels, action) => {
      hotels.searchField = action.payload;

      const city = hotels.allCities.find(
        item => item.cityName === hotels.searchField,
      );

      if (city !== undefined) {
        hotels.city = city;
      }
    },

    selectedDate: (hotels, action) => {
      hotels.filters.datePeriod = action.payload;
      hotels.filteredList = hotels.mainList;

      hotels.filteredList = filterPrice(
        hotels.filteredList,
        hotels.filters.price,
      );

      hotels.filteredList = filterRating(
        hotels.filteredList,
        hotels.filters.rating,
      );

      hotels.filteredList = filterStars(
        hotels.filteredList,
        hotels.filters.stars,
      );

      hotels.filteredList = filterFeatures(hotels.filteredList, hotels.filters);

      hotels.filteredList = filterAccomodation(
        hotels.filteredList,
        hotels.filters.accomodation,
      );

      if (hotels.filters.roomCapacity.length > 0)
        hotels.filteredList = filterByCapacity(
          hotels.filteredList,
          hotels.filters.roomCapacity,
        );

      if (hotels.filters.datePeriod.startDate !== null)
        hotels.filteredList = filterByDate(
          hotels.filteredList,
          hotels.filters.datePeriod,
        );

      hotels.filteredList.sort((a, b) => a.hotelID - b.hotelID);
    },

    citySelected: (hotels, action) => {
      hotels.city = action.payload;
    },

    allCities: (hotels, action) => {
      hotels.allCities = action.payload;
    },
  },
});

const filterPrice = (list, price) => {
  const arr = list.filter(item => item.room.price <= price);
  return arr;
};

const filterRating = (list, rating) => {
  let rate,
    arr = [];
  switch (rating) {
    case 0:
      rate = 0;
      break;
    case 1:
      rate = 7;
      break;
    case 2:
      rate = 7.5;
      break;
    case 3:
      rate = 8;
      break;
    case 4:
      rate = 8.5;
    default:
      rate = 0;
  }

  arr = list.filter(item => item.rating >= rating);

  return arr;
};

const filterStars = (list, stars) => {
  const arr = list.filter(item => item.stars >= stars);
  return arr;
};

const filterFeatures = (list, filters) => {
  let arr = list;

  if (filters.wifi) arr = arr.filter(item => item.freeWifi === true);
  if (filters.pool) arr = arr.filter(item => item.pool === true);
  if (filters.breakfast) arr = arr.filter(item => item.breakfast === true);
  if (filters.spa) arr = arr.filter(item => item.spa === true);

  return arr;
};

const filterAccomodation = (list, accomodation) => {
  let arr = list;

  if (accomodation === 'همه') return arr;
  else {
    arr = arr.filter(item => item.hotelType === accomodation);
    return arr;
  }
};

const filterByCapacity = (list, rooms) => {
  let arr = [];
  let arrIDs = [];
  let id;

  for (let i = 0; i < rooms.length; i++) {
    let temp = list.filter(item => item.room.capacity === rooms[i].cap);
    temp.forEach(item => {
      arr.push(item);
      id = item.hotelID;
      if (arr.length === 0) arrIDs.push(id);
      else {
        const index = arrIDs.findIndex(item => item === id);
        if (index === -1) arrIDs.push(id);
      }
    });
  }
  for (let j = 0; j < arrIDs.length; j++) {
    let temp = arr.filter(item => item.hotelID === arrIDs[j]);

    rooms.forEach(item => {
      const check = temp.filter(
        tempItem => tempItem.room.capacity === item.cap,
      );

      if (check.length < item.count)
        arr = arr.filter(arrItem => arrItem.hotelID !== arrIDs[j]);
    });
  }

  return arr;
};

const filterByDate = (list, filters) => {
  let arr = list;
  const firstDate = moment(filters.startDate).format('YYYY-MM-DD');
  const endDate = moment(filters.endDate).format('YYYY-MM-DD');

  list.forEach(item => {
    for (let i = 0; i < item.room.reservations.length; i++) {
      // check moment jalali for compare dates
      const reserveStart = moment(item.room.reservations[i].startDate).format(
        'YYYY-MM-DD',
      );
      const reserveEnd = moment(item.room.reservations[i].endDate).format(
        'YYYY-MM-DD',
      );
      if (
        moment(firstDate, 'jYYYY-jMM-jDD').diff(
          moment(reserveStart, 'jYYYY-jMM-jDD'),
        ) >= 0 &&
        moment(firstDate).diff(moment(reserveEnd)) <= 0
      )
        arr = arr.filter(
          filterItem => filterItem.room.roomID !== item.room.roomID,
        );
      else if (
        moment(endDate, 'jYYYY-jMM-jDD').diff(
          moment(reserveStart, 'jYYYY-jMM-jDD'),
        ) >= 0 &&
        moment(endDate, 'jYYYY-jMM-jDD').diff(
          moment(reserveEnd, 'jYYYY-jMM-jDD'),
        ) <= 0
      )
        arr = arr.filter(
          filterItem => filterItem.room.roomID !== item.room.roomID,
        );
      else if (
        moment(firstDate, 'jYYYY-jMM-jDD').diff(
          moment(reserveStart, 'jYYYY-jMM-jDD'),
        ) <= 0 &&
        moment(endDate, 'jYYYY-jMM-jDD').diff(
          moment(reserveEnd, 'jYYYY-jMM-jDD'),
        ) >= 0
      )
        arr = arr.filter(
          filterItem => filterItem.room.roomID !== item.room.roomID,
        );
    }
  });
  return arr;
};

/*const selectedCity = async (list, cityID) => {
  await axios
    .get('https://flight.rasahr.com/api/cities/hotels/' + cityID)
    .then(response => {
      list = response.data;
    })
    .catch(error => {
      console.log(error);
    });
};*/

export const {
  hotelsRequested,
  arrangeHotels,
  filterHotels,
  setCapacity,
  selectedDate,
  citySelected,
  filterByDateAndCount,
  setSearchField,
  allCities,
  resetFilters,
  filterHotelsBySearching,
} = slice.actions;

export default slice.reducer;
