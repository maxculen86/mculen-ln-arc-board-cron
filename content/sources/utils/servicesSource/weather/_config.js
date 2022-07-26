const weatherData = {
    'home-clima': {
        created_date: '2022-06-28T08:23:15-03:00',
        locations: [
            {
                updated: '2022-06-28T08:23:15-03:00',
                location_name: 'Capital Federal',
                location_id: 'capital-federal',
                temp_min: 8.0,
                temp_max: 18.0,
                weather: {
                    description: 'Lluvias aisladas',
                    id: 72
                }
            },
            {
                updated: '2022-06-28T08:23:15-03:00',
                location_name: 'Cordoba',
                location_id: 'cordoba',
                temp_min: 5.0,
                temp_max: 12.0,
                weather: {
                    description: 'Mayormente nublado',
                    id: 37
                }
            },
            {
                updated: '2022-06-28T08:23:15-03:00',
                location_name: 'San Juan',
                location_id: 'san-juan',
                temp_min: 0.0,
                temp_max: 18.0,
                weather: {
                    description: 'Parcialmente nublado',
                    id: 25
                }
            }
        ]
    },
    'provincia-ciudad': {
        created_date: '2022-06-28T08:23:15-03:00',
        locations: [
            {
                updated: '2022-06-28T08:23:15-03:00',
                location_name: 'Ciudad',
                location_id: 'ciudad',
                temp_min: 8.0,
                temp_max: 18.0,
                weather: {
                    description: 'Lluvias aisladas',
                    id: 72
                }
            },
            {
                updated: '2022-06-28T08:23:15-03:00',
                location_name: 'Malargue',
                location_id: 'malargue',
                temp_min: 5.0,
                temp_max: 12.0,
                weather: {
                    description: 'Mayormente nublado',
                    id: 37
                }
            },
            {
                updated: '2022-06-28T08:23:15-03:00',
                location_name: 'San Rafael',
                location_id: 'san-rafael',
                temp_min: 0.0,
                temp_max: 18.0,
                weather: {
                    description: 'Parcialmente nublado',
                    id: 25
                }
            }
        ]
    },
    provincia: {
        created_date: '2022-06-28T08:23:15-03:00',
        name: 'Mendoza',
        location_id: 'mendoza',
        updated: '2022-06-28T08:23:15-03:00',
        forecast: [
            {
                date: '2022-06-28',
                temp_min: 8.0,
                temp_max: 18.0,
                morning: {
                    humidity: 99.0,
                    rain_prob_range: [70, 100],
                    temperature: 2.0,
                    weather: {
                        description: 'Nevadas fuertes',
                        id: 85
                    },
                    wind: {
                        direction: 'O',
                        speed_range: [32, 41]
                    }
                },
                afternoon: {
                    humidity: 100.0,
                    rain_prob_range: [70, 100],
                    temperature: 3.0,
                    weather: {
                        description: 'Nevadas fuertes',
                        id: 85
                    },
                    wind: {
                        direction: 'NO',
                        speed_range: [32, 41]
                    }
                },
                night: {
                    humidity: 100.0,
                    rain_prob_range: [70, 100],
                    temperature: 1.0,
                    weather: {
                        description: 'Nevadas fuertes',
                        id: 85
                    },
                    wind: {
                        direction: 'O',
                        speed_range: [32, 41]
                    }
                }
            },
            {
                date: '2022-06-29',
                early_morning: {
                    humidity: 98.0,
                    rain_prob_range: [70, 100],
                    temperature: 0.0,
                    weather: {
                        description: 'Nevadas fuertes',
                        id: 85
                    },
                    wind: {
                        direction: 'O',
                        speed_range: [32, 41]
                    }
                },
                morning: {
                    humidity: 99.0,
                    rain_prob_range: [40, 70],
                    temperature: -1.0,
                    weather: {
                        description: 'Nevadas',
                        id: 79
                    },
                    wind: {
                        direction: 'O',
                        speed_range: [32, 41]
                    }
                },
                afternoon: {
                    humidity: 99.0,
                    rain_prob_range: [10, 40],
                    temperature: 5.0,
                    weather: {
                        description: 'Lluvias y nevadas',
                        id: 77
                    },
                    wind: {
                        direction: 'O',
                        speed_range: [23, 31]
                    }
                },
                night: {
                    humidity: 99.0,
                    rain_prob_range: [10, 40],
                    temperature: -3.0,
                    weather: {
                        description: 'Nevadas',
                        id: 79
                    },
                    wind: {
                        direction: 'O',
                        speed_range: [13, 22]
                    }
                }
            },
            {
                date: '2022-06-30',
                temp_min: -2.0,
                temp_max: 5.0,
                humidity_min: 96.0,
                humidity_max: 99.0,
                morning: {
                    humidity: 96.0,
                    rain_prob_range: [0, 10],
                    temperature: -2.0,
                    weather: {
                        description: 'Mayormente nublado',
                        id: 37
                    },
                    wind: {
                        direction: 'N',
                        speed_range: [7, 12]
                    }
                },
                afternoon: {
                    humidity: 99.0,
                    rain_prob_range: [0, 10],
                    temperature: 5.0,
                    weather: {
                        description: 'Mayormente nublado',
                        id: 37
                    },
                    wind: {
                        direction: 'O',
                        speed_range: [7, 12]
                    }
                }
            },
            {
                date: '2022-07-01',
                temp_min: -1.0,
                temp_max: 5.0,
                humidity_min: 91.0,
                humidity_max: 95.0,
                morning: {
                    humidity: 95.0,
                    rain_prob_range: [10, 40],
                    temperature: -1.0,
                    weather: {
                        description: 'Nevadas',
                        id: 79
                    },
                    wind: {
                        direction: 'SO',
                        speed_range: [0, 2]
                    }
                },
                afternoon: {
                    humidity: 91.0,
                    rain_prob_range: [10, 40],
                    temperature: 5.0,
                    weather: {
                        description: 'Lluvias y nevadas',
                        id: 77
                    },
                    wind: {
                        direction: 'O',
                        speed_range: [7, 12]
                    }
                }
            },
            {
                date: '2022-07-02',
                temp_min: -5.0,
                temp_max: 3.0,
                humidity_min: 88.0,
                humidity_max: 98.0,
                morning: {
                    humidity: 88.0,
                    rain_prob_range: [10, 40],
                    temperature: -5.0,
                    weather: {
                        description: 'Nevadas',
                        id: 79
                    },
                    wind: {
                        direction: 'NO',
                        speed_range: [7, 12]
                    }
                },
                afternoon: {
                    humidity: 98.0,
                    rain_prob_range: [10, 40],
                    temperature: 3.0,
                    weather: {
                        description: 'Lluvias y nevadas',
                        id: 77
                    },
                    wind: {
                        direction: 'O',
                        speed_range: [7, 12]
                    }
                }
            },
            {
                date: '2022-07-03',
                temp_min: -3.0,
                temp_max: 0.0,
                humidity_min: 97.0,
                humidity_max: 99.0,
                morning: {
                    humidity: 97.0,
                    rain_prob_range: [10, 40],
                    temperature: -3.0,
                    weather: {
                        description: 'Lluvias y nevadas',
                        id: 77
                    },
                    wind: {
                        direction: 'N',
                        speed_range: [7, 12]
                    }
                },
                afternoon: {
                    humidity: 99.0,
                    rain_prob_range: [10, 40],
                    temperature: 0.0,
                    weather: {
                        description: 'Lluvias y nevadas',
                        id: 77
                    },
                    wind: {
                        direction: 'NO',
                        speed_range: [7, 12]
                    }
                }
            },
            {
                date: '2022-07-04',
                temp_min: -5.0,
                temp_max: 1.0,
                humidity_min: 88.0,
                humidity_max: 99.0,
                morning: {
                    humidity: 99.0,
                    rain_prob_range: [10, 40],
                    temperature: -5.0,
                    weather: {
                        description: 'Nevadas',
                        id: 79
                    },
                    wind: {
                        direction: 'NO',
                        speed_range: [7, 12]
                    }
                },
                afternoon: {
                    humidity: 88.0,
                    rain_prob_range: [10, 40],
                    temperature: 1.0,
                    weather: {
                        description: 'Lloviznas',
                        id: 71
                    },
                    wind: {
                        direction: 'NO',
                        speed_range: [7, 12]
                    }
                }
            }
        ]
    },

    ciudad: {
        created_date: '2022-06-28T08:23:15-03:00',
        name: 'San Rafael',
        location_id: 'san-rafael',
        updated: '2022-06-28T08:23:15-03:00',
        forecast: [
            {
                date: '2022-06-28',
                temp_min: 8.0,
                temp_max: 18.0,
                morning: {
                    humidity: 99.0,
                    rain_prob_range: [70, 100],
                    temperature: 2.0,
                    weather: {
                        description: 'Nevadas fuertes',
                        id: 85
                    },
                    wind: {
                        direction: 'O',
                        speed_range: [32, 41]
                    }
                },
                afternoon: {
                    humidity: 100.0,
                    rain_prob_range: [70, 100],
                    temperature: 3.0,
                    weather: {
                        description: 'Nevadas fuertes',
                        id: 85
                    },
                    wind: {
                        direction: 'NO',
                        speed_range: [32, 41]
                    }
                },
                night: {
                    humidity: 100.0,
                    rain_prob_range: [70, 100],
                    temperature: 1.0,
                    weather: {
                        description: 'Nevadas fuertes',
                        id: 85
                    },
                    wind: {
                        direction: 'O',
                        speed_range: [32, 41]
                    }
                }
            },
            {
                date: '2022-06-29',
                early_morning: {
                    humidity: 98.0,
                    rain_prob_range: [70, 100],
                    temperature: 0.0,
                    weather: {
                        description: 'Nevadas fuertes',
                        id: 85
                    },
                    wind: {
                        direction: 'O',
                        speed_range: [32, 41]
                    }
                },
                morning: {
                    humidity: 99.0,
                    rain_prob_range: [40, 70],
                    temperature: -1.0,
                    weather: {
                        description: 'Nevadas',
                        id: 79
                    },
                    wind: {
                        direction: 'O',
                        speed_range: [32, 41]
                    }
                },
                afternoon: {
                    humidity: 99.0,
                    rain_prob_range: [10, 40],
                    temperature: 5.0,
                    weather: {
                        description: 'Lluvias y nevadas',
                        id: 77
                    },
                    wind: {
                        direction: 'O',
                        speed_range: [23, 31]
                    }
                },
                night: {
                    humidity: 99.0,
                    rain_prob_range: [10, 40],
                    temperature: -3.0,
                    weather: {
                        description: 'Nevadas',
                        id: 79
                    },
                    wind: {
                        direction: 'O',
                        speed_range: [13, 22]
                    }
                }
            },
            {
                date: '2022-06-30',
                temp_min: -2.0,
                temp_max: 5.0,
                humidity_min: 96.0,
                humidity_max: 99.0,
                morning: {
                    humidity: 96.0,
                    rain_prob_range: [0, 10],
                    temperature: -2.0,
                    weather: {
                        description: 'Mayormente nublado',
                        id: 37
                    },
                    wind: {
                        direction: 'N',
                        speed_range: [7, 12]
                    }
                },
                afternoon: {
                    humidity: 99.0,
                    rain_prob_range: [0, 10],
                    temperature: 5.0,
                    weather: {
                        description: 'Mayormente nublado',
                        id: 37
                    },
                    wind: {
                        direction: 'O',
                        speed_range: [7, 12]
                    }
                }
            },
            {
                date: '2022-07-01',
                temp_min: -1.0,
                temp_max: 5.0,
                humidity_min: 91.0,
                humidity_max: 95.0,
                morning: {
                    humidity: 95.0,
                    rain_prob_range: [10, 40],
                    temperature: -1.0,
                    weather: {
                        description: 'Nevadas',
                        id: 79
                    },
                    wind: {
                        direction: 'SO',
                        speed_range: [0, 2]
                    }
                },
                afternoon: {
                    humidity: 91.0,
                    rain_prob_range: [10, 40],
                    temperature: 5.0,
                    weather: {
                        description: 'Lluvias y nevadas',
                        id: 77
                    },
                    wind: {
                        direction: 'O',
                        speed_range: [7, 12]
                    }
                }
            },
            {
                date: '2022-07-02',
                temp_min: -5.0,
                temp_max: 3.0,
                humidity_min: 88.0,
                humidity_max: 98.0,
                morning: {
                    humidity: 88.0,
                    rain_prob_range: [10, 40],
                    temperature: -5.0,
                    weather: {
                        description: 'Nevadas',
                        id: 79
                    },
                    wind: {
                        direction: 'NO',
                        speed_range: [7, 12]
                    }
                },
                afternoon: {
                    humidity: 98.0,
                    rain_prob_range: [10, 40],
                    temperature: 3.0,
                    weather: {
                        description: 'Lluvias y nevadas',
                        id: 77
                    },
                    wind: {
                        direction: 'O',
                        speed_range: [7, 12]
                    }
                }
            },
            {
                date: '2022-07-03',
                temp_min: -3.0,
                temp_max: 0.0,
                humidity_min: 97.0,
                humidity_max: 99.0,
                morning: {
                    humidity: 97.0,
                    rain_prob_range: [10, 40],
                    temperature: -3.0,
                    weather: {
                        description: 'Lluvias y nevadas',
                        id: 77
                    },
                    wind: {
                        direction: 'N',
                        speed_range: [7, 12]
                    }
                },
                afternoon: {
                    humidity: 99.0,
                    rain_prob_range: [10, 40],
                    temperature: 0.0,
                    weather: {
                        description: 'Lluvias y nevadas',
                        id: 77
                    },
                    wind: {
                        direction: 'NO',
                        speed_range: [7, 12]
                    }
                }
            },
            {
                date: '2022-07-04',
                temp_min: -5.0,
                temp_max: 1.0,
                humidity_min: 88.0,
                humidity_max: 99.0,
                morning: {
                    humidity: 99.0,
                    rain_prob_range: [10, 40],
                    temperature: -5.0,
                    weather: {
                        description: 'Nevadas',
                        id: 79
                    },
                    wind: {
                        direction: 'NO',
                        speed_range: [7, 12]
                    }
                },
                afternoon: {
                    humidity: 88.0,
                    rain_prob_range: [10, 40],
                    temperature: 1.0,
                    weather: {
                        description: 'Lloviznas',
                        id: 71
                    },
                    wind: {
                        direction: 'NO',
                        speed_range: [7, 12]
                    }
                }
            }
        ]
    }
};

export default weatherData;
