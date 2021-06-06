import {createSlice} from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'reserve',
  initialState: {
    startDate: null,
    endDate: null,
    markedDates: null,
    isStartDatePicked: false,
    isEndDatePicked: false,
    JalaliStartDate: '',
    JalaliEndDate: '',
    markingType: 'simple',
    startYear: '',
    startMonth: '',
    startDay: '',
    startDayName: '',
    endYear: '',
    endMonth: '',
    endDay: '',
    endDayName: '',
    numberOfRooms: 1,
    totalAdults: 0,
    totalChilds: 0,
    rooms: [
      {
        id: 1,
        adult: 0,
        children: 0,
      },
    ],
  },
  reducers: {
    resetMarkedDates: (reserve, action) => {
      reserve.markedDates = null;
      reserve.startDate = null;
      reserve.endDate = null;
      reserve.isStartDatePicked = false;
      reserve.isEndDatePicked = false;
      reserve.JalaliStartDate = '';
      reserve.JalaliEndDate = '';
      reserve.markingType = 'simple';
      reserve.startYear = '';
      reserve.startMonth = '';
      reserve.startDay = '';
      reserve.startDayName = '';
      reserve.endYear = '';
      reserve.endMonth = '';
      reserve.endDay = '';
      reserve.endDayName = '';
    },
    resetRooms: (reserve, action) => {
      reserve.numberOfRooms = 1;
      reserve.totalAdults = 0;
      reserve.totalChilds = 0;
      reserve.rooms = [
        {
          id: 1,
          adult: 0,
          children: 0,
        },
      ];
    },
    addStartDate: (reserve, action) => {
      reserve.startDate = action.payload;
    },
    addEndDate: (reserve, action) => {
      reserve.endDate = action.payload;
    },
    addMarkedDates: (reserve, action) => {
      reserve.markedDates = action.payload;
    },
    enableStartDatePicked: (reserve, action) => {
      reserve.isStartDatePicked = true;
    },
    disableStartDatePicked: (reserve, action) => {
      reserve.isStartDatePicked = false;
    },
    enableEndDatePicked: (reserve, action) => {
      reserve.isEndDatePicked = true;
    },
    disableEndDatePicked: (reserve, action) => {
      reserve.isEndDatePicked = false;
    },
    addJalaliStartDate: (reserve, action) => {
      reserve.JalaliStartDate = action.payload;
    },
    addJalaliEndDate: (reserve, action) => {
      reserve.JalaliEndDate = action.payload;
    },
    addMarkingType: (reserve, action) => {
      reserve.markingType = action.payload;
    },
    addStartYear: (reserve, action) => {
      reserve.startYear = action.payload;
    },
    addStartMonth: (reserve, action) => {
      reserve.startMonth = action.payload;
    },
    addStartDay: (reserve, action) => {
      reserve.startDay = action.payload;
    },
    addStartDayName: (reserve, action) => {
      reserve.startDayName = action.payload;
    },
    addEndYear: (reserve, action) => {
      reserve.endYear = action.payload;
    },
    addEndMonth: (reserve, action) => {
      reserve.endMonth = action.payload;
    },
    addEndDay: (reserve, action) => {
      reserve.endDay = action.payload;
    },
    addEndDayName: (reserve, action) => {
      reserve.endDayName = action.payload;
    },
    addNumberOfRooms: (reserve, action) => {
      reserve.numberOfRooms = action.payload;
    },
    addRooms: (reserve, action) => {
      reserve.numberOfRooms = reserve.numberOfRooms + 1;
      reserve.rooms.push({
        id: reserve.numberOfRooms,
        adult: 0,
        children: 0,
      });
    },
    deleteRooms: (reserve, action) => {
      reserve.numberOfRooms = reserve.numberOfRooms - 1;
      reserve.rooms.pop();
    },
    addAdult: (reserve, action) => {
      const temp = reserve.rooms[action.payload - 1];
      reserve.rooms[action.payload - 1].adult = temp.adult + 1;
      reserve.totalAdults += 1;
    },
    subAdult: (reserve, action) => {
      const temp = reserve.rooms[action.payload - 1];
      reserve.rooms[action.payload - 1].adult = temp.adult - 1;
      reserve.totalAdults -= 1;
    },
    addChild: (reserve, action) => {
      const temp = reserve.rooms[action.payload - 1];
      reserve.rooms[action.payload - 1].children = temp.children + 1;
      reserve.totalChilds += 1;
    },
    subChild: (reserve, action) => {
      const temp = reserve.rooms[action.payload - 1];
      reserve.rooms[action.payload - 1].children = temp.children - 1;
      reserve.totalChilds -= 1;
    },
    calculatePeople: (reserve, action) => {
      reserve.totalAdults = 0;
      reserve.totalChilds = 0;
      reserve.rooms.forEach(item => {
        reserve.totalChilds += item.children;
        reserve.totalAdults += item.adult;
      });
    },
  },
});

export const {
  addStartDate,
  addEndDate,
  addNumberOfRooms,
  addMarkedDates,
  addEndDayName,
  addEndDay,
  addEndMonth,
  addEndYear,
  addStartDayName,
  addStartDay,
  addStartMonth,
  addStartYear,
  addMarkingType,
  addJalaliEndDate,
  addJalaliStartDate,
  disableEndDatePicked,
  enableEndDatePicked,
  disableStartDatePicked,
  enableStartDatePicked,
  addRooms,
  deleteRooms,
  addAdult,
  resetMarkedDates,
  subAdult,
  addChild,
  subChild,
  resetRooms,
  calculatePeople,
} = slice.actions;

export default slice.reducer;
