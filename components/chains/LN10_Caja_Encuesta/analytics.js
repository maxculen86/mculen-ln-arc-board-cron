import {
    ENCUESTA_COMPONENT_NAME,
    ENCUESTA_IMPRESSION_EVENT,
    ENCUESTA_POST_ID
} from './constants';

export const buildEncuestaImpressionEvent = ({
    slot,
    segment,
    viewportEntryCount,
    stateCode
}) => ({
    event: ENCUESTA_IMPRESSION_EVENT,
    rest: {
        poll_id: ENCUESTA_POST_ID,
        component: ENCUESTA_COMPONENT_NAME,
        slot,
        segment,
        viewport_entry_count: viewportEntryCount,
        state_code: stateCode
    }
});
