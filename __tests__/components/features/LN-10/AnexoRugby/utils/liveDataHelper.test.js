import {
    isMatchLiveClienSide,
    isDelayedValidation,
    isPlayedOrDelayedFallBackClienSide,
    mapLiveDataToCard
} from '../../../../../../components/features/LN-10/anexoRugby/utils/liveDataHelper';
import mockRugbyData from '../mocks/dataRugby.json';

const matchesLive = [
    {
        title: 'Francia vs Uruguay',
        matchStatus: 'upComing',
        contestants: {
            homeTeam: {
                logo:
                    'https://media-canchallena.glanacion.com/bandera/o/7gww28djs405rfga69smki84o.png',
                code: 'Bandera de Francia',
                name: 'Francia'
            },
            awayTeam: {
                logo:
                    'https://media-canchallena.glanacion.com/bandera/p/286fwlvd6dzntv6ewv3cyvb0p.png',
                code: 'Bandera de Uruguay',
                name: 'Uruguay'
            }
        },
        goals: {
            homeScore: '-',
            awayScore: '-'
        },
        localTime: '16:00 HS',
        matchTime: '',
        date: 'HOY',
        timeRemaining: {
            days: 0,
            hours: 0,
            minutes: 0
        },
        matchId: '3ciedzqofwcg744nu312sfjtg'
    },
    {
        title: 'Nueva Zelanda vs Namibia',
        matchStatus: 'upComing',
        contestants: {
            homeTeam: {
                logo:
                    'https://media-canchallena.glanacion.com/bandera/8/wcq2y28a27syx5do1k2i2nj8.png',
                code: 'Bandera de Nueva Zelanda',
                name: 'Nueva Zelanda'
            },
            awayTeam: {
                logo:
                    'https://media-canchallena.glanacion.com/bandera/c/5gnafp0jaansh8iqoslamuwdc.png',
                code: 'Bandera de Namibia',
                name: 'Namibia'
            }
        },
        goals: {
            homeScore: '-',
            awayScore: '-'
        },
        localTime: '16:00 HS',
        matchTime: '',
        date: '15/09/2023',
        timeRemaining: {
            days: 2,
            hours: 0,
            minutes: 30
        },
        matchId: 'd6dhivuil8rilv2mutn2nocus'
    },
    {
        title: 'Samoa vs Chile',
        matchStatus: 'upComing',
        contestants: {
            homeTeam: {
                logo:
                    'https://media-canchallena.glanacion.com/bandera/1/1s42ilmwpzotzmgf4fv15uub1.png',
                code: 'Bandera de Samoa',
                name: 'Samoa'
            },
            awayTeam: {
                logo:
                    'https://media-canchallena.glanacion.com/bandera/0/32tb8d7824xg4i0ybxzssczu0.png',
                code: 'Bandera de Chile',
                name: 'Chile'
            }
        },
        goals: {
            homeScore: '-',
            awayScore: '-'
        },
        localTime: '10:00 HS',
        matchTime: '',
        date: '16/09/2023',
        timeRemaining: {
            days: 2,
            hours: 18,
            minutes: 30
        },
        matchId: 'dajismvba3qn1n3v4gyhgkn4k'
    },
    {
        title: 'Gales vs Portugal',
        matchStatus: 'upComing',
        contestants: {
            homeTeam: {
                logo:
                    'https://media-canchallena.glanacion.com/bandera/5/26ilvvgth36hmq6lgq8cy5cb5.png',
                code: 'Bandera de Gales',
                name: 'Gales'
            },
            awayTeam: {
                logo:
                    'https://media-canchallena.glanacion.com/bandera/c/1nbm5i9a0403zzvltn17lxinc.png',
                code: 'Bandera de Portugal',
                name: 'Portugal'
            }
        },
        goals: {
            homeScore: '-',
            awayScore: '-'
        },
        localTime: '12:45 HS',
        matchTime: '',
        date: '16/09/2023',
        timeRemaining: {
            days: 2,
            hours: 21,
            minutes: 15
        },
        matchId: 'd92p6boez37x90hwqph59ao7o'
    }
];

describe('Components - features - LN10 - AnexoRugby - utils', () => {
    describe('isMatchLiveCLientSide', () => {
        test('isMatchLiveCLientSide with live match', () => {
            const { liveIds, updatedMatches } = isMatchLiveClienSide(
                matchesLive
            );

            expect(liveIds[0]).toStrictEqual('3ciedzqofwcg744nu312sfjtg');
            expect(updatedMatches[0].matchStatus).toBe('playing');
            expect(updatedMatches[0].matchTime).toBe('INICIÓ 16:00 HS');
        });

        test('isMatchLiveCLientSide with NO live match', () => {
            const { liveIds, updatedMatches } = isMatchLiveClienSide(
                mockRugbyData
            );

            expect(liveIds.length).toStrictEqual(0);
            expect(updatedMatches).toStrictEqual(mockRugbyData);
        });
    });

    describe('isDelayedValidation', () => {
        it('should return true if days, hours, and minutes are -1, -1, and -20 respectively', () => {
            const result = isDelayedValidation(-1, -1, -20);
            expect(result).toBe(false);
        });

        it('should return false if minutes is not within the valid range to be considered delayed', () => {
            const result = isDelayedValidation(-1, -1, -21);
            expect(result).toBe(false);
        });

        it('should return false if days is not -1', () => {
            const result = isDelayedValidation(-3, -1, -20);
            expect(result).toBe(false);
        });

        it('should return false if minutes is greater than 0', () => {
            const result = isDelayedValidation(-1, -1, 1);
            expect(result).toBe(false);
        });

        it('should return false if minutes is undefined', () => {
            const result = isDelayedValidation(-1, -1, undefined);
            expect(result).toBe(false);
        });
    });

    describe('isPlayedOrDelayedFallBackClienSide', () => {
        test('Test matchStatus played when liveMatch its done', () => {
            const matches = matchesLive.map((match, i) => {
                if (i === 0) {
                    return {
                        ...match,
                        matchStatus: 'playing',
                        timeRemaining: {
                            days: 0,
                            hours: 2,
                            minutes: 0
                        }
                    };
                }
                return match;
            });
            const matchesFallback = isPlayedOrDelayedFallBackClienSide(
                matches,
                {}
            );

            expect(matchesFallback[0].matchStatus).toStrictEqual('played');
        });

        test('Test matchStatus upComing when delayed', () => {
            const matches = matchesLive.map((match, i) => {
                if (i === 0) {
                    return {
                        ...match,
                        matchStatus: 'playing',
                        timeRemaining: {
                            days: -1,
                            hours: -1,
                            minutes: -9
                        }
                    };
                }
                return match;
            });
            const matchesFallback = isPlayedOrDelayedFallBackClienSide(
                matches,
                {}
            );

            expect(matchesFallback[0].matchStatus).toStrictEqual('upComing');
        });
    });

    describe('mapLiveDataToCard', () => {
        test('Test scores when match is live', () => {
            const mappedMatches = mapLiveDataToCard(matchesLive, {
                match: [
                    {
                        matchInfo: {
                            id: '3ciedzqofwcg744nu312sfjtg'
                        },
                        liveData: {
                            matchDetails: {
                                scores: {
                                    total: {
                                        home: 7,
                                        away: 21
                                    }
                                }
                            }
                        }
                    }
                ]
            });

            expect(mappedMatches[0].goals).toStrictEqual({
                homeScore: 7,
                awayScore: 21
            });
        });

        test('Test matchStatus upComing when delayed', () => {
            const matches = matchesLive.map((match, i) => {
                if (i === 0) {
                    return {
                        ...match,
                        matchStatus: 'playing',
                        timeRemaining: {
                            days: -1,
                            hours: -1,
                            minutes: -9
                        }
                    };
                }
                return match;
            });
            const mappedMatches = mapLiveDataToCard(matches, { match: [] });

            expect(mappedMatches[0].matchStatus).toStrictEqual('upComing');
        });

        test('Test matchStatus played when match its done', () => {
            const matches = matchesLive.map((match, i) => {
                if (i === 0) {
                    return {
                        ...match,
                        matchStatus: 'playing',
                        timeRemaining: {
                            days: 0,
                            hours: 2,
                            minutes: -9
                        }
                    };
                }
                return match;
            });
            const mappedMatches = mapLiveDataToCard(matches, {
                match: [
                    {
                        matchInfo: {
                            id: '2ciedzqofwcg744nu312sfjtg'
                        },
                        liveData: {
                            matchDetails: {
                                scores: {
                                    total: {
                                        home: 7,
                                        away: 21
                                    }
                                }
                            }
                        }
                    }
                ]
            });

            expect(mappedMatches[0].matchStatus).toStrictEqual('played');
        });
    });
});
