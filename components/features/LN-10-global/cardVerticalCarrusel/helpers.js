export function secondsToMinutes(seconds) {
    if (typeof seconds !== 'number' || seconds < 0) return '';

    const minutes = Math.floor(seconds / 60);
    const dif = Math.floor(seconds % 60);

    const formatMinutes = String(minutes).padStart(2, '0');
    const formatSeconds = String(dif).padStart(2, '0');

    return `${formatMinutes}:${formatSeconds}`;
}
