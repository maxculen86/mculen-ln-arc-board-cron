export const fetchLiveData = async competitionIds => {
    const matchDataQuery = {
        tmcl: '74d9dduffevhxp8qee1s7b21g',
        live: 'yes',
        status: 'playing',
        _fmt: 'json',
        _rt: 'c'
    };

    try {
        const optaLiveData = await fetch(
            'https://api.performfeeds.com/rugbyuniondata/match/1otvtpa0x4b9h1uv2p6s9zgz4k?' +
                new URLSearchParams(matchDataQuery),
            {
                method: 'GET'
            }
        );
        return optaLiveData;
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
    const updatedMatches = matches.map(match => {
        const { timeRemaining } = match;
        const { minutes } = timeRemaining;

        if (
            (minutes !== undefined &&
                minutes <= 0 &&
                match.matchStatus === 'upComing') ||
            match.matchStatus === 'playing'
        ) {
            liveIds.push(match.matchId);
            return {
                ...match,
                matchStatus: 'playing',
                matchTime: `INICIO ${match.localTime}`
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

    return minDelayed && hours === 0 && days === 0;
};

export const isPlayedOrDelayedFallBackClienSide = (rugbyMatches, optaRes) => {
    if (!optaRes.match || optaRes.match.length === 0) {
        const updatedMatches = rugbyMatches.map(match => {
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
        return updatedMatches;
    }
};

export const mapLiveDataToCard = (sourceMatches, optaLiveData) => {
    const { match: liveMatches } = optaLiveData;
    const updatedMatches = sourceMatches.map(match => {
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
    return updatedMatches;
};

export const updateHomeMatches = async (rugbyMatches, liveIds) => {
    const optaRes = await fetchLiveData(liveIds);
    const optaResParsed = await optaRes.json();
    if (!optaResParsed.match || optaResParsed.match.length === 0) {
        const playedOrDelay = isPlayedOrDelayedFallBackClienSide(
            rugbyMatches,
            optaResParsed
        );
        return playedOrDelay;
    } else {
        return mapLiveDataToCard(rugbyMatches, optaResParsed);
    }
};
