import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ShareFoodit from '../../../../../../components/features/foodit-global/common/ShareFoodit/foodit';

jest.mock('../../../../../../components/private/LN/common/utils/isSSR', () =>
    jest.fn(() => false)
);

describe('ShareFoodit component', () => {
    it('should renders correctly with navigator support', () => {
        global.navigator.canShare = true;
        global.navigator.share = true;

        const onClickShareMock = jest.fn();
        render(
            <ShareFoodit
                title="Test"
                onClickShare={onClickShareMock}
                article={{}}
            />
        );
        const buttton = screen.getByTitle('Test');
        fireEvent.click(buttton);

        expect(onClickShareMock).toHaveBeenCalled();
    });

    it('should renders correctly without navigator support', () => {
        global.navigator.canShare = false;

        render(
            <ShareFoodit title="Test" onClickShare={() => {}} article={{}} />
        );
        const buttonfacebook = screen.getByTitle('Compartir por Facebook');
        expect(buttonfacebook).toBeInTheDocument();
    });
});
