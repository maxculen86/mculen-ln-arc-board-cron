export const PREPARATION_KEYWORDS = ['preparación', 'preparacion'];

export const TIPS_KEYWORDS = ['tips', 'curiosidades'];

export const normalize = str =>
    typeof str === 'string'
        ? str
              .normalize('NFD')
              .replace(/[\u0300-\u036f]/g, '')
              .toLowerCase()
        : '';
export const headerLevels = [1, 2, 3, 4, 5, 6];

export const processHeaderElement = (element, currentState) => {
    const { inPreparationSection, mainPreparationLevel } = currentState;
    const headerContent = normalize(element.content || '');

    const containsPreparation = PREPARATION_KEYWORDS.some(keyword =>
        headerContent.includes(normalize(keyword))
    );
    const containsTips = TIPS_KEYWORDS.some(tip => headerContent.includes(tip));

    if (containsPreparation) {
        return {
            inPreparationSection: true,
            mainPreparationLevel: element.level
        };
    }

    if (
        inPreparationSection &&
        (element.level <= mainPreparationLevel || containsTips)
    ) {
        return { inPreparationSection: false, mainPreparationLevel: null };
    }

    return currentState;
};
