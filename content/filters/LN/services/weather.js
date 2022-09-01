export default `
locations {
    current_temp
    link
    location_id
    location_name
    temp_max
    temp_min
    weather{
        description
        id
    }
}
forecast {
    date
    afternoon {
        humidity
        rain_prob
        temperature
        weather {
            description
            id
        }
        wind {
            direction
            speed
        }
    }
    morning {
        humidity
        rain_prob
        temperature
        weather {
            description
            id
        }
        wind {
            direction
            speed
        }
    }
    night {
        humidity
        rain_prob
        temperature
        weather {
            description
            id
        }
        wind {
            direction
            speed
        }
    }
}
updateTime
`;
