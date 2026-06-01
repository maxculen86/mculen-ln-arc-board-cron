import React from 'react';
import { render } from '@testing-library/react';
import BaseBodyWrapper from '../../../../../../components/features/LN-nota/body/_children/BaseBodyWrapper';

jest.mock(
    '../../../../../../components/features/LN-common/hooks/useLazyEmbeds',
    () => jest.fn()
);

jest.mock(
    '../../../../../../components/features/LN-common/hooks/useScrollDispatcher',
    () => jest.fn()
);

describe('BaseBodyWrapper', () => {
    it('passes noteId when registering scroll tracking', () => {
        const onRegisterScrollTrigger = jest.fn();
        const noteId = 'MDF2WYHSG5AJTLA2VNKUB53HSU';

        render(
            <BaseBodyWrapper
                noteId={noteId}
                onRegisterScrollTrigger={onRegisterScrollTrigger}
            >
                <div />
            </BaseBodyWrapper>
        );

        expect(onRegisterScrollTrigger).toHaveBeenCalledWith(noteId);
    });
});
