import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Tags from '../../../../../../components/features/foodit-global/Body/PowerupsReceta/ingredientsBox/tags';
import { addEventToDataLayerV2 } from '../../../../../../components/private/LN/common/utils/addEventToDataLayer';

jest.mock(
    '../../../../../../components/private/LN/common/utils/addEventToDataLayer',
    () => ({
        addEventToDataLayerV2: jest.fn()
    })
);
describe('Tags component interaction with addEventToDataLayerV2', () => {
    const mockItems = [
        { text: 'Tag 1', url: '/tag1' },
        { text: 'Tag 2', url: '/tag2' },
        { text: 'Tag 3', url: '/tag3' }
    ];

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should add click_tag event when tag is clicked', () => {
        const { container } = render(<Tags items={mockItems} />);
        // Debug what's being rendered
        console.log('Container HTML:', container.innerHTML);
        const listTags = container.querySelectorAll('a.foodit-button');

        console.log('Number of tags found:', listTags.length);

        // First verify that we have tags rendered
        expect(listTags.length).toBeGreaterThan(0);

        // Then proceed with the click test
        fireEvent.click(listTags[0]);

        expect(addEventToDataLayerV2).toHaveBeenCalledTimes(1);
        expect(addEventToDataLayerV2).toHaveBeenCalledWith({
            event: 'click_tag',
            button: mockItems[0].text
        });
    });

    it('should add click_tag event for each clicked tag', () => {
        const { container } = render(<Tags items={mockItems} />);
        const listTags = container.querySelectorAll('a');

        // Verify we have the expected number of tags
        expect(listTags.length).toBe(mockItems.length);

        Array.from(listTags).forEach((tag, index) => {
            fireEvent.click(tag);
            expect(addEventToDataLayerV2).toHaveBeenNthCalledWith(index + 1, {
                event: 'click_tag',
                button: mockItems[index].text
            });
        });

        expect(addEventToDataLayerV2).toHaveBeenCalledTimes(mockItems.length);
    });

    it('should not call addEventToDataLayerV2 when no tags are rendered', () => {
        const { container } = render(<Tags items={[]} />);
        const listTags = container.querySelectorAll('a');

        expect(listTags).toHaveLength(0);
        expect(addEventToDataLayerV2).not.toHaveBeenCalled();
    });

    it('should call addEventToDataLayerV2 with correct button text', () => {
        const customItems = [{ text: 'Custom Tag', url: '/custom' }];

        const { container } = render(<Tags items={customItems} />);
        const listTags = container.querySelectorAll('a');

        // Verify we have exactly one tag
        expect(listTags).toHaveLength(1);

        fireEvent.click(listTags[0]);

        expect(addEventToDataLayerV2).toHaveBeenCalledWith({
            event: 'click_tag',
            button: 'Custom Tag'
        });
    });

    it('should render tags with correct structure and attributes', () => {
        const { container } = render(<Tags items={mockItems} />);
        const listTags = container.querySelectorAll('a.button');

        expect(listTags).toHaveLength(mockItems.length);

        listTags.forEach((tag, index) => {
            expect(tag).toHaveAttribute('href', mockItems[index].url);
            expect(tag).toHaveAttribute('title', mockItems[index].title);
            expect(tag).toHaveClass('button', 'foodit-button');
            expect(tag.textContent).toBe(mockItems[index].text);
        });
    });

    it('should match snapshot', () => {
        const { container } = render(<Tags items={mockItems} />);
        expect(container).toMatchSnapshot();
    });
});
