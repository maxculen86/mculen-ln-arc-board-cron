import {
    ENCUESTA_COMPONENT_NAME,
    ENCUESTA_IMPRESSION_EVENT
} from './constants';

export const buildEncuestaImpressionEvent = ({
    slot,
    segment,
    viewportEntryCount,
    stateCode,
    encuestaPostId
}) => ({
    event: ENCUESTA_IMPRESSION_EVENT,
    rest: {
        poll_id: encuestaPostId,
        component: ENCUESTA_COMPONENT_NAME,
        slot,
        segment,
        viewport_entry_count: viewportEntryCount,
        state_code: stateCode
    }
});
