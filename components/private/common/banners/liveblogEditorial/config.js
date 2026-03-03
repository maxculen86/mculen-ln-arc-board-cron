import { createSlotIds } from '../utils/getDynamicSlotIdsByDevice';

export const LIVEBLOG_DYNAMIC_SLOT_RULES_BY_DEVICE = {
    desktop: {
        startAt: 4,
        step: 4,
        max: 3,
        prefix: 'middle_',
        suffix: '_dsk',
        showForSubscriber: false
    },
    mobile: {
        startAt: 2,
        step: 4,
        max: 5,
        prefix: 'caja',
        suffix: '_mob',
        showForSubscriber: true
    }
};

export const getLiveblogDynamicSlotIdsByDevice = device => {
    const config = LIVEBLOG_DYNAMIC_SLOT_RULES_BY_DEVICE[device];
    if (!config) return [];

    const { prefix, max, suffix = '' } = config;

    return createSlotIds({ prefix, max, suffix });
};

export const getLiveblogDynamicBannersByCardPosition = cardPosition =>
    Object.entries(LIVEBLOG_DYNAMIC_SLOT_RULES_BY_DEVICE).reduce(
        (accumulator, [device, config]) => {
            const {
                startAt,
                step,
                max,
                prefix,
                suffix = '',
                showForSubscriber = true
            } = config;

            if (cardPosition < startAt) return accumulator;

            const slotIndex = (cardPosition - startAt) / step;
            if (!Number.isInteger(slotIndex)) return accumulator;

            const slotNumber = slotIndex + 1;
            if (slotNumber > max) return accumulator;

            accumulator.push({
                device,
                slotId: `${prefix}${slotNumber}${suffix}`,
                showForSubscriber
            });

            return accumulator;
        },
        []
    );
