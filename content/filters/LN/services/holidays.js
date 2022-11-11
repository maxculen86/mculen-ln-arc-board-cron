export default `
    calendars {
        monthNumber
        monthName
        holidayData {
            day_type_name
            days
            reason
        }
    }
    tables {
        Inamovible {
            header {
                _id
                content
            }
            rows {
                content
            }
        }
        Judio {
            header {
                _id
                content
            }
            rows {
                content
            }
        }
        Puente {
            header {
                _id
                content
            }
            rows {
                content
            }
        }
        Trasladable {
            header {
                _id
                content
            }
            rows {
                content
            }
        }
    }
    calendar {
        monthNumber
        monthName
        monthHolidays {
            month
            holiday_day_contents {
                day_type_name
                days
                reason
            }
        }
    }
    previousAndNextCalendar {
        previous {
            text
            url
            title
        }
        next {
            text
            url
            title
        }
    }
`;
