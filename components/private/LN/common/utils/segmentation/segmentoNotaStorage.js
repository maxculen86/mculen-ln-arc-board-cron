import isSSR from '../isSSR';

export const STORAGE_KEY = 'SegmentoNota';

const segmentoNotaStringToExperiments = raw =>
    raw
        ? raw
              .split('|')
              .map(part => {
                  const idx = part.lastIndexOf('-');
                  if (idx <= 0) return null;
                  return {
                      experimentName: part.slice(0, idx),
                      segment: part.slice(idx + 1)
                  };
              })
              .filter(Boolean)
        : [];

const segmentoNotaExperimentsToString = experiments =>
    experiments
        .map(({ experimentName, segment }) => `${experimentName}-${segment}`)
        .join('|');

export const getSegmentoNota = () => {
    if (isSSR()) return '';
    try {
        return localStorage.getItem(STORAGE_KEY) || '';
    } catch {
        return '';
    }
};

export const upsertSegmentoNota = (
    experimentName,
    segment,
    storageKey = STORAGE_KEY
) => {
    if (isSSR() || !experimentName || !segment) return false;

    try {
        const experiments = segmentoNotaStringToExperiments(
            localStorage.getItem(storageKey)
        );
        const existingIdx = experiments.findIndex(
            experiment => experiment.experimentName === experimentName
        );

        if (existingIdx >= 0) {
            experiments[existingIdx] = { experimentName, segment };
        } else {
            experiments.push({ experimentName, segment });
        }

        localStorage.setItem(
            storageKey,
            segmentoNotaExperimentsToString(experiments)
        );
        return true;
    } catch {
        return false;
    }
};

export const removeSegmentoNota = (
    experimentName,
    storageKey = STORAGE_KEY
) => {
    if (isSSR() || !experimentName) return false;

    try {
        const experiments = segmentoNotaStringToExperiments(
            localStorage.getItem(storageKey)
        ).filter(experiment => experiment.experimentName !== experimentName);

        const nextValue = segmentoNotaExperimentsToString(experiments);
        if (nextValue) {
            localStorage.setItem(storageKey, nextValue);
        } else {
            localStorage.removeItem(storageKey);
        }
        return true;
    } catch {
        return false;
    }
};
