import isTodayEnabled from '../../../chains/utils/isTodayEnabled';

export const shouldHideLnRadio = ({
    isAdmin = false,
    enabledDays = [],
    shouldSchedule = false
}) => {
    if (isAdmin || !shouldSchedule) {
        return false;
    }

    return enabledDays.length === 0 || !isTodayEnabled(enabledDays);
};

export const VARIANTS = Object.freeze({
    Blanco: 'fondo-blanco',
    Negro: 'fondo-negro',
    Amarillo: 'fondo-amarillo'
});

export const logoImage = {
    [VARIANTS.Blanco]: '/resources/images/ln-radio.svg',
    [VARIANTS.Negro]: '/resources/images/ln-radio-blanco.svg',
    [VARIANTS.Amarillo]: '/resources/images/ln-radio.svg'
};

export const DEFAULT_VARIANT = VARIANTS.Blanco;
