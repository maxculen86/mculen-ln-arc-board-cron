import React from 'react';
import Timeline from '../../../../../components/features/LN-10/timeline/default';
import '@testing-library/jest-dom';
import Context from 'fusion:context';
import { render } from '@testing-library/react';
import mockArticles from '../../../../../__mocks__/data/timeline/articles.json';
import useTimeline from '../../../../../components/private/LN/common/hooks/useTimeline';
import pageBuilderValidator from '../../../../../components/private/common/utils/pageBuilderValidator';

jest.mock('fusion:consumer', component => {
    return function (component) {
        return component;
    };
});

jest.mock('../../../../../components/private/LN/common/hooks/useTimeline', () =>
    jest.fn()
);

jest.mock(
    '../../../../../components/private/common/utils/pageBuilderValidator',
    () => jest.fn()
);

describe('features - LN10 - Timeline', () => {
    useTimeline.mockReturnValue(mockArticles);

    const props = {
        featureId: 'f0fYWHrfxEP7b4r',
        customFields: {
            size: 5,
            sectionTagType: 'section',
            sectionTagValue: '/politica',
            collectionId: '',
            url: '',
            title: 'Últimas Noticias',
            hideTitle: false,
            source: 'byTagSection'
        },
        collection: 'features',
        type: 'LN-10/timeline',
        name: null,
        contentConfig: {
            contentService: '',
            contentConfigValues: {},
            inherit: true
        },
        displayProperties: {},
        variants: {},
        children: []
    };

    test('should render timeline component when source is truthy and isAdmin and error are falsy', () => {
        Context.useAppContext = jest.fn(() => ({
            arcSite: 'la-nacion-ar',
            isAdmin: false
        }));

        pageBuilderValidator.mockReturnValue(false);

        const { container } = render(<Timeline {...props} />);

        expect(container.querySelector('.ln-timeline')).toBeVisible();
        const timeNodes = container.querySelectorAll('time.--font-2xs');
        expect(timeNodes.length).toBeGreaterThan(0);
        timeNodes.forEach(node => {
            const text =
                node.firstChild && node.firstChild.nodeType === Node.TEXT_NODE
                    ? node.firstChild.nodeValue.trim()
                    : node.textContent.trim();
            expect(text).toMatch(/^\d{2}:\d{2}$/);
        });
    });

    test('should render pagebuilder message component when isAdmin and error are truthy', () => {
        Context.useAppContext = jest.fn(() => ({
            arcSite: 'la-nacion-ar',
            isAdmin: true
        }));

        const error = {
            type: 'warning',
            message: 'Mock error message'
        };

        pageBuilderValidator.mockReturnValue(error);

        const { container } = render(<Timeline {...props} />);

        expect(container.querySelector('.ln-timeline')).toBeVisible();
        const timeNodes = container.querySelectorAll('time.--font-2xs');
        expect(timeNodes.length).toBeGreaterThan(0);
        timeNodes.forEach(node => {
            const text =
                node.firstChild && node.firstChild.nodeType === Node.TEXT_NODE
                    ? node.firstChild.nodeValue.trim()
                    : node.textContent.trim();
            expect(text).toMatch(/^\d{2}:\d{2}$/);
        });
    });

    test('should not render timeline component if source is falsy', () => {
        Context.useAppContext = jest.fn(() => ({
            arcSite: 'la-nacion-ar',
            isAdmin: false
        }));

        pageBuilderValidator.mockReturnValue(false);

        const { container } = render(
            <Timeline
                {...{
                    ...props,
                    customFields: {
                        ...props.customFields,
                        source: false
                    }
                }}
            />
        );

        expect(container.querySelector('.ln-timeline')).toBeNull();
    });
});
