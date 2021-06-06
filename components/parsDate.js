import moment from 'moment-jalaali';

export default (parsDate = date => {
  let year, month, day, dayName;

  year = moment(date, 'jYYYY-jMM-jDD').jYear();
  month = moment(date, 'jYYYY-jMM-jDD').jMonth() + 1;
  day = moment(date, 'jYYYY-jMM-jDD').jDate();
  dayName = moment(date, 'YYYY-MM-DD').format('dddd');

  switch (dayName) {
    case 'Saturday':
      dayName = 'شنبه';
      break;
    case 'Sunday':
      dayName = 'یک‌‌‌شنبه';
      break;
    case 'Monday':
      dayName = 'دوشنبه';
      break;
    case 'Tuesday':
      dayName = 'سه‌شنبه';
      break;
    case 'Wednesday':
      dayName = 'چهارشنبه';
      break;
    case 'Thursday':
      dayName = 'پنج‌شنبه';
      break;
    case 'Friday':
      dayName = 'جمعه';
      break;
    default:
      dayName = '';
  }
  switch (month) {
    case 1:
      month = 'فرودین';
      break;
    case 2:
      month = 'اردیبهشت';
      break;
    case 3:
      month = 'خرداد';
      break;
    case 4:
      month = 'تیر';
      break;
    case 5:
      month = 'مرداد';
      break;
    case 6:
      month = 'شهریور';
      break;
    case 7:
      month = 'مهر';
      break;
    case 8:
      month = 'آبان';
      break;
    case 9:
      month = 'آذر';
      break;
    case 10:
      month = 'دی';
      break;
    case 11:
      month = 'بهمن';
      break;
    case 12:
      month = 'اسفند';
      break;
    default:
      month = '';
  }
  return {
    year,
    month,
    day,
    dayName,
  };
});
