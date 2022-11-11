const canonicalIdChecker = id =>
    id.includes('feriados') && id === `/feriados/${new Date().getFullYear()}`
        ? '/feriados'
        : id;

export default canonicalIdChecker;
