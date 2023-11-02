export const fetchLiveData = async competitionIds => {
    const matchDataQuery = {
        tmcl: '74d9dduffevhxp8qee1s7b21g',
        live: 'yes',
        status: 'playing',
        _fmt: 'json',
        _rt: 'c'
    };

    try {
        return await fetch(
            'https://api.performfeeds.com/rugbyuniondata/match/1otvtpa0x4b9h1uv2p6s9zgz4k?' +
                new URLSearchParams(matchDataQuery),
            {
                method: 'GET'
            }
        );
    } catch (err) {
        console.error(
            '🚀 ~ file: getLiveData.ts:39 ~ fetchLiveData ~ err:',
            err
        );
        return { match: [] };
    }
};

export const isMatchLiveClienSide = matches => {
    const liveIds = [];
    const updatedMatches = matches.map((match = {}) => {
        const { timeRemaining = {}, date } = match;
        const { minutes } = timeRemaining;

        if (
            (minutes !== undefined &&
                minutes <= 0 &&
                match.matchStatus === 'upComing' &&
                date === 'HOY') ||
            match.matchStatus === 'playing'
        ) {
            liveIds.push(match.matchId);
            return {
                ...match,
                matchStatus: 'playing',
                matchTime: `INICIÓ ${match.localTime}`
            };
        }
        return match;
    });

    return {
        updatedMatches,
        liveIds: [...liveIds]
    };
};

export const isDelayedValidation = (days, hours, minutes) => {
    const minDelayed = minutes !== undefined && minutes <= 0 && minutes >= -10;

    return minDelayed && hours === -1 && days === -1;
};

export const isPlayedOrDelayedFallBackClienSide = (rugbyMatches, optaRes) => {
    if (!optaRes.match || optaRes.match.length === 0) {
        return rugbyMatches.map(match => {
            if (match.matchStatus === 'playing') {
                const { days, hours, minutes } = match.timeRemaining;
                const isDelayed = isDelayedValidation(days, hours, minutes);

                return {
                    ...match,
                    matchStatus: isDelayed ? 'upComing' : 'played'
                };
            } else {
                return { ...match };
            }
        });
    }
};

export const mapLiveDataToCard = (sourceMatches, optaLiveData) => {
    const { match: liveMatches } = optaLiveData;
    return sourceMatches.map(match => {
        const finded = liveMatches.find(
            element => element.matchInfo.id === match.matchId
        );
        if (finded) {
            const { scores = {} } = finded.liveData.matchDetails;
            return {
                ...match,
                goals: {
                    homeScore: scores.total.home,
                    awayScore: scores.total.away
                }
            };
        } else {
            const { days, hours, minutes } = match.timeRemaining;

            const isDelayed = isDelayedValidation(days, hours, minutes);

            return {
                ...match,
                matchStatus:
                    match.matchStatus === 'playing'
                        ? isDelayed
                            ? 'upComing'
                            : 'played'
                        : match.matchStatus
            };
        }
    });
};

export const updateHomeMatches = async (rugbyMatches, liveIds) => {
    const optaRes = await fetchLiveData(liveIds);
    const optaResParsed = await optaRes.json();
    if (!optaResParsed.match || optaResParsed.match.length === 0) {
        return isPlayedOrDelayedFallBackClienSide(rugbyMatches, optaResParsed);
    } else {
        return mapLiveDataToCard(rugbyMatches, optaResParsed);
    }
};
