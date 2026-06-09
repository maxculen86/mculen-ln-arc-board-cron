import { buildEncuestaImpressionEvent } from '../../../../components/chains/LN10_Caja_Encuesta/analytics';
import {
    ENCUESTA_COMPONENT_NAME,
    ENCUESTA_IMPRESSION_EVENT,
    ENCUESTA_POST_ID,
    USER_STATE_CODES
} from '../../../../components/chains/LN10_Caja_Encuesta/constants';

describe('LN10_Caja_Encuesta analytics', () => {
    it('builds the encuesta impression event payload', () => {
        expect(
            buildEncuestaImpressionEvent({
                slot: 'caja_1',
                segment: 'test',
                viewportEntryCount: 2,
                stateCode: USER_STATE_CODES.POSTED_LESS_THAN_THREE_VIEWS
            })
        ).toEqual({
            event: ENCUESTA_IMPRESSION_EVENT,
            rest: {
                poll_id: ENCUESTA_POST_ID,
                component: ENCUESTA_COMPONENT_NAME,
                slot: 'caja_1',
                segment: 'test',
                viewport_entry_count: 2,
                state_code: USER_STATE_CODES.POSTED_LESS_THAN_THREE_VIEWS
            }
        });
    });
});
