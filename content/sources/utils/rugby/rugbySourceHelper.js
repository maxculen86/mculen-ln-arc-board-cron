import get from '../../../../components/private/common/utils/get';
import { isValidString } from '../../../../components/private/common/utils/dataValidation';
import removeAccents from '../../../../components/private/common/utils/removeAccents';

const filter = `{
    items {
      coverageLevel
      id
      matchSort
      matchId
      matchDate
      matchDateText
      timeMatch
      matchStatus
      contestant {
        id
        name
        shortName
        officialName
        code
        position
        country {
          id
          name
        }
      }
      liveData {
        matchDetails {
          matchStatus
          scores {
            ht {
              home
              away
            }
            ft {
              home
              away
            }
            total {
              home
              away
            }
          }
        }
      }
    }
  }
}
  `;

const S3_RESOURCES_BASE_PATH = 'https://media-canchallena.glanacion.com';

export const getQuery = date => {
    const wordCupDate = new Date('2023-09-08Z00:00:00Z');
    const fromQueryLimit = new Date('2023-10-20Z00:00:00Z');

    const actualDate = new Date();
    const startDateQuery = wordCupDate >= actualDate ? wordCupDate : actualDate;
    const fromDate = new Date(
        `${startDateQuery.getFullYear()}-${startDateQuery.getMonth() +
            1}-${startDateQuery.getDate()}Z00:00:00Z`
    );
    const toDate = new Date(startDateQuery);
    toDate.setDate(toDate.getDate() + 10);

    if (fromDate > fromQueryLimit) {
        return `query Query {
            matchesByIdAndWeek(id: "59zkrmozaazlyumpmqw5hpdp7.4fnqb4zufa10liausaekzw7am.74d9dduffevhxp8qee1s7b21g", fromDate: 1697760000000, toDate: 1698624000000) ${filter}`;
    }

    return `query Query {
        matchesByIdAndWeek(id: "59zkrmozaazlyumpmqw5hpdp7.4fnqb4zufa10liausaekzw7am.74d9dduffevhxp8qee1s7b21g", fromDate: ${fromDate.getTime()}, toDate: ${toDate.getTime()}) ${filter}`;
};

const numericStatus = {
    0: 'upComing',
    1: 'played',
    2: 'playing',
    3: 'cancelled',
    4: 'postponed',
    5: 'suspended'
};

const countryNames = {
    cmj75xo9uckjinoxthrzxi8kt: 'Nueva Zelanda',
    '7q84jaa0kulalft5sq3n1zds2': 'Francia',
    '3ygluq99sc2a9wowio5d3huch': 'Italia',
    bpdz4xidkzwaz4459pwgr192p: 'Uruguay',
    '9o40bnnz1zkap45ixvdeiij6': 'Namibia',
    a50bl6ziy040n5snmb4loqt7y: 'Sudáfrica',
    '1i22rjzymitnqf62f20d0twpo': 'Irlanda',
    '2du6lit97al3effj6cs6q3st9': 'Escocia',
    '9wgi1ru7t27qfaw3uy7a7yl0c': 'Tonga',
    cog8ttjt1hffxv093l7zahck8: 'Rumania',
    e6whixsdgiv86cezu4g8gmfvj: 'Gales',
    '7u5qjjfbes0p0wpgx9lshdvxn': 'Australia',
    '73bkf87icpsiejs57lv6f9bnt': 'Fiji',
    a2p1meftzog1lloqxjxxipebw: 'Georgia',
    ach153b0k6luq86gzgeyyy7z9: 'Portugal',
    '5tizfrfjatgqee0huit8r1m3v': 'Inglaterra',
    ezfinu45xj7au5rzho41guida: 'Japón',
    bm6dq269g1t0ft7mq21ypwrxc: 'Argentina',
    axbh4ldbldi39zb5tzo61pr90: 'Samoa',
    '4b8k9eyy8vg63atmau8xjuzof': 'Chile'
};

const getCountryFlag = (idCountry = '') => {
    const pathLetter =
        idCountry && isValidString(idCountry) ? idCountry.slice(-1) : 'f';

    return `${S3_RESOURCES_BASE_PATH}/bandera/${pathLetter}/${idCountry ||
        'default'}.png`;
};

const isTomorrowValidation = (today, match, matchDate) => {
    const isTomorrow = match.getDate() === today.getDate() + 1;
    const dateTransformed = matchDate.split('-').reverse();
    return isTomorrow ? 'MAÑANA' : dateTransformed.join('/');
};

const getTimeAndDate = date => {
    const [matchDate] = date;

    const today = new Date();
    const matchDay = new Date(`${matchDate}Z00:00:00Z`);
    const isToday = today.getDate() === matchDay.getDate();

    return isToday ? 'HOY' : isTomorrowValidation(today, matchDay, matchDate);
};

const getArgentinaDate = () => {
    const currentDate = new Date();
    const argentinaHoursDiff = currentDate.getTimezoneOffset() / 60 - 3;
    currentDate.setHours(currentDate.getHours() + argentinaHoursDiff);

    return currentDate;
};

const getTimeRemaining = (matchDate, matchHour) => {
    if (!matchHour.match(/\d{1,2}:\d{2}/)) {
        return {
            days: 10
        };
    }
    const matchTime = Date.parse(`${matchDate} ${matchHour}`);
    const actualTime = getArgentinaDate();
    const total = matchTime - Date.parse(actualTime);

    if (!total) return {};

    const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
    const days = Math.floor(total / (1000 * 60 * 60 * 24));
    const minutes = Math.floor((total / 1000 / 60) % 60);

    return {
        days,
        hours,
        minutes
    };
};
const showResult = matchStatus => matchStatus === '1' || matchStatus === '2';

export const transform = data => {
    const matches = get(data, 'data.matchesByIdAndWeek.items', []);
    const matchesSorted = matches.sort((a, b) => {
        const dateTimeA = a.matchDate + a.timeMatch;
        const dateTimeB = b.matchDate + b.timeMatch;

        return dateTimeA - dateTimeB;
    });

    return matchesSorted.slice(0, 4).map(match => {
        const {
            contestant,
            liveData,
            matchStatus,
            matchDateText,
            matchId
        } = match;

        const scores = get(liveData, 'matchDetails.scores.total') ?? {};

        const dateAndTime = matchDateText.split(' ');

        const [home = {}, away = {}] = contestant ?? [];
        const { country: countryHome = {} } = home;

        const { country: countryAway = {} } = away;

        const homeName =
            countryNames[home.id] || countryHome.name || 'A definir';

        const awayName =
            countryNames[away.id] || countryHome.name || 'A definir';

        const localTime = dateAndTime[1].split(':');
        localTime.pop();

        return {
            title: `${homeName} vs ${awayName}`,
            matchStatus: numericStatus[matchStatus],
            contestants: {
                homeTeam: {
                    logo: getCountryFlag(countryHome.id),
                    code: `Bandera de ${homeName}`,
                    name: homeName
                },
                awayTeam: {
                    logo: getCountryFlag(countryAway.id),
                    code: `Bandera de ${awayName}`,
                    name: awayName
                }
            },
            goals: {
                homeScore: showResult(matchStatus) ? scores.home : '-',
                awayScore: showResult(matchStatus) ? scores.away : '-'
            },
            localTime: `${localTime.join(':')} HS`,
            matchTime: '',
            date: getTimeAndDate(dateAndTime),
            timeRemaining: getTimeRemaining(
                dateAndTime[0],
                localTime.join(':')
            ),
            matchId
        };
    });
};

export const reorderFinishedMatches = (a, b) => {
    if (a.matchStatus === 'played' && b.matchStatus !== 'played') {
        return 1;
    } else if (a.matchStatus !== 'played' && b.matchStatus === 'played') {
        return -1;
    } else {
        return 0;
    }
};
