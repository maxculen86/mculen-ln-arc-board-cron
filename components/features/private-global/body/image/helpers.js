export const PREPARATION_KEYWORDS = [
    'preparación',
    'preparacion',
    /^para la \w+/i
];

export const headerLevels = [1, 2, 3, 4, 5, 6];
export const TIPS_KEYWORDS = ['tips', 'curiosidades'];

export const normalize = str =>
    str
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase();
