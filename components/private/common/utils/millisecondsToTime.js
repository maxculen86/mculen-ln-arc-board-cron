const msToTime = duration => {
    if (!duration) return 'PT0M0S';

    const seconds = Math.floor((duration / 1000) % 60);
    const minutes = Math.floor((duration / (1000 * 60)) % 60);
    return `PT${minutes}M${seconds}S`;
};

export default msToTime;
