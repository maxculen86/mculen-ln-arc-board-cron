const msToTime = duration => {
    if (!duration) return 'PT0M0S';

    let minutes;
    let seconds;

    if (typeof duration === 'number') {
        const totalSeconds = Math.round(duration);
        minutes = Math.floor(totalSeconds / 60);
        seconds = totalSeconds % 60;
    } else {
        const totalMilliseconds = Number(duration);
        seconds = Math.floor((totalMilliseconds / 1000) % 60);
        minutes = Math.floor((totalMilliseconds / (1000 * 60)) % 60);
    }

    return `PT${minutes}M${seconds}S`;
};

export default msToTime;
