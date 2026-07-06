import { getArgentinaYear } from './dateAndTimeUtil';

const canonicalIdChecker = id =>
    id.includes('feriados') && id === `/feriados/${Number(getArgentinaYear())}`
        ? '/feriados'
        : id;

export default canonicalIdChecker;
