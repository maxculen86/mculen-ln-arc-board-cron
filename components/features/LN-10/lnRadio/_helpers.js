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
