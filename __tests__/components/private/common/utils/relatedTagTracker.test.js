import { render, screen, fireEvent } from '@testing-library/react';
import intersectionObserverForRelatedTags from '../../../../../components/private/common/utils/relatedTagTracker';

describe(' components - private - common - utils - relatedTagsTracker', () => {
    describe('intersectionObserverForRelatedTags', () => {
        const { container } = render(intersectionObserverForRelatedTags());
        test('Should match snapshot', () => {
            expect(container).toMatchSnapshot();
        });
    });
});
