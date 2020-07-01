const msToTime = duration => {
    const seconds = Math.floor((duration / 1000) % 60);
    const minutes = Math.floor((duration / (1000 * 60)) % 60);
    return `T${minutes}M${seconds}S`;
};

export default msToTime;
