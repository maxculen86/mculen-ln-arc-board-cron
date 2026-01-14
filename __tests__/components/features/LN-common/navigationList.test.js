import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useContent } from 'fusion:content';
import NavigationListFeature from '../../../../components/features/LN-common/navigationList';
import NAVIGATION_RESPONSE from '../../../../__mocks__/data/navigation/Economy';

jest.mock('fusion:content', () => ({
    useContent: jest.fn()
}));

jest.mock('fusion:context', () => ({
    useFusionContext: () => ({
        arcSite: 'la-nacion-ar'
    })
}));

const mockComTitleSpy = jest.fn(() => null);
jest.mock('../../../../components/private/common/com-title', () => props => {
    mockComTitleSpy(props);
    return null;
});

const mockComLinkListSpy = jest.fn(() => null);
jest.mock(
    '../../../../components/private/common/com-link-list',
    () => props => {
        mockComLinkListSpy(props);
        return null;
    }
);

describe('Features - LN-Common - NavigationList =>', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('with empty navigation list', () => {
        it('should return null', () => {
            useContent.mockImplementation(() => ({
                children: []
            }));
            const { container: c1 } = render(<NavigationListFeature />);
            expect(c1).toBeEmptyDOMElement();

            useContent.mockImplementation(() => ({
                children: undefined
            }));
            const { container: c2 } = render(<NavigationListFeature />);
            expect(c2).toBeEmptyDOMElement();
        });
    });

    describe('with navigation list', () => {
        const customFields = {
            title: 'Titulo:',
            separator: '--tags',
            hierarchy: 'Economy'
        };

        beforeEach(() => {
            useContent.mockImplementation(() => ({
                children: NAVIGATION_RESPONSE.children
            }));
        });

        it('should render section tag, com-title and com-link-list components', () => {
            const { container } = render(
                <NavigationListFeature
                    _id="XUHADKLMDASIDJIHBA"
                    customFields={{ ...customFields }}
                />
            );

            expect(container.querySelector('section')).toBeInTheDocument();
            expect(mockComTitleSpy).toHaveBeenCalledTimes(1);
            expect(mockComLinkListSpy).toHaveBeenCalledTimes(1);
        });

        it('section tag should have a "mod-linklist" className', () => {
            const { container } = render(
                <NavigationListFeature
                    _id="XUHADKLMDASIDJIHBA"
                    customFields={{ ...customFields }}
                />
            );

            expect(container.querySelector('section')).toHaveClass(
                'mod-linklist'
            );
        });

        it('com-title should receive content and size by props', () => {
            render(
                <NavigationListFeature
                    _id="XUHADKLMDASIDJIHBA"
                    customFields={{ ...customFields }}
                />
            );

            const { content, size } = mockComTitleSpy.mock.calls[0][0];
            expect(content).toBe(customFields.title);
            expect(size).toBe('--twoxs');
        });

        it('com-link-list should receive list and extraClass by props', () => {
            render(
                <NavigationListFeature
                    _id="XUHADKLMDASIDJIHBA"
                    customFields={{ ...customFields }}
                />
            );

            const { list, extraClass } = mockComLinkListSpy.mock.calls[0][0];
            expect(list.length).toBe(NAVIGATION_RESPONSE.children.length);
            expect(extraClass).toBe(customFields.separator);
        });

        it('Validate list mapping when navigation list has items with node_type === link', () => {
            render(
                <NavigationListFeature
                    _id="XUHADKLMDASIDJIHBA"
                    customFields={{ ...customFields }}
                />
            );

            const { list } = mockComLinkListSpy.mock.calls[0][0];
            const listItem = list.find(elem => elem.target === '_blank');

            const { display_name: displayName, url } =
                NAVIGATION_RESPONSE.children.find(
                    elem => elem.node_type === 'link'
                );

            expect(listItem.link).toBe(url);
            expect(listItem.textname).toBe(displayName);
            expect(listItem.title).toBe(displayName);
        });

        it('Validate list mapping when navigation list has items with node_type === section', () => {
            render(
                <NavigationListFeature
                    _id="XUHADKLMDASIDJIHBA"
                    customFields={{ ...customFields }}
                />
            );

            const { list } = mockComLinkListSpy.mock.calls[0][0];
            const listItem = list.find(elem => elem.target === '');

            const { name, _id } = NAVIGATION_RESPONSE.children.find(
                elem => elem.node_type === 'section'
            );

            expect(listItem.link).toBe(_id);
            expect(listItem.textname).toBe(name);
            expect(listItem.title).toBe(name);
        });
    });
});
