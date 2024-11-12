import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import useIsomorphicPopupHandling from '../../../../../../../../components/features/foodit-global/common/Modals/SaveRecipe/hooks/useIsomorphicPopupHandling';
import {
    TOAST,
    addToast
} from '../../../../../../../../components/features/foodit-global/common/bookmark/api/_helper';
import safeJSONParse from '../../../../../../../../components/features/private-global/common/utils/safeJSONParse';

jest.mock(
    '../../../../../../../../components/features/foodit-global/common/bookmark/api/_helper',
    () => ({
        addToast: jest.fn(),
        TOAST: {
            ERROR: {
                VARIANT: 'error',
                TITLE: 'Error',
                MESSAGE: {
                    LIMIT_BOOKMARKS: 'You have reached the limit of bookmarks'
                }
            }
        }
    })
);

jest.mock(
    '../../../../../../../../components/features/private-global/common/utils/safeJSONParse',
    () => jest.fn()
);

function TestComponent() {
    const { openModal, close, modalData } = useIsomorphicPopupHandling();
    return (
        <div>
            <button
                onClick={() =>
                    openModal({ ids: ['1', '2'], collectionArticles: [] })
                }
            >
                Open Modal
            </button>
            <button onClick={close}>Close Modal</button>
            <div data-testid="modalData">{JSON.stringify(modalData)}</div>
        </div>
    );
}

describe('Components - Features - Foodit-global - Common - Modals - SaveRecipe - useIsomorphicPopupHandling', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    test('initial state is correct', () => {
        const { getByTestId } = render(<TestComponent />);
        const modalData = getByTestId('modalData').textContent;

        expect(JSON.parse(modalData)).toEqual({
            isVisible: false,
            data: {}
        });
    });

    test('displays toast and prevents opening modal if bookmark limit is reached', () => {
        safeJSONParse.mockReturnValue(new Array(150));

        const { getByText, getByTestId } = render(<TestComponent />);
        fireEvent.click(getByText('Open Modal'));

        expect(addToast).toHaveBeenCalledWith({
            variant: TOAST.ERROR.VARIANT,
            title: TOAST.ERROR.TITLE,
            message: TOAST.ERROR.MESSAGE.LIMIT_BOOKMARKS
        });
        expect(JSON.parse(getByTestId('modalData').textContent)).toEqual({
            isVisible: false,
            data: {}
        });
    });

    test('opens modal with correct data when bookmark limit is not reached', () => {
        safeJSONParse.mockReturnValue([
            { bookmarkTypeId: '1' },
            { bookmarkTypeId: '3' }
        ]);

        const { getByText, getByTestId } = render(<TestComponent />);
        fireEvent.click(getByText('Open Modal'));

        expect(JSON.parse(getByTestId('modalData').textContent)).toEqual({
            isVisible: true,
            data: {
                noBookmarkedArticles: ['2'],
                carouselTitle: '',
                fatherType: ''
            }
        });
    });

    test('closes modal when close is called', () => {
        const { getByText, getByTestId } = render(<TestComponent />);

        fireEvent.click(getByText('Open Modal'));
        fireEvent.click(getByText('Close Modal'));

        expect(JSON.parse(getByTestId('modalData').textContent)).toEqual({
            isVisible: false,
            data: {}
        });
    });
});
