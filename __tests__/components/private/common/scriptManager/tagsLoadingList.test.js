import React from 'react';
import { useContent } from 'fusion:content';
import { render } from '@testing-library/react';
import TagsLoadingList from '../../../../../components/private/common/scriptManager/tagsLoadingList';

jest.mock('fusion:content', () => ({
    useContent: jest.fn()
}));

jest.mock('fusion:context', () => ({
    useAppContext: () => {
        return { contextPath: 'pf', deployment: () => {} };
    }
}));

const globalContent = {
    content_restrictions: {
        content_code: 'cerrada'
    },
    label: {
        showcase: {
            display: true,
            text: 'Si'
        }
    },
    paywallEnabled: '1'
};

const scriptsMock = [
    '{ "rel":"dns-prefetch", "href":"//cdn.livefyre.com", "location":"head", "section":"all" }',
    '{ "rel":"dns-prefetch", "href":"https://sb.scorecardresearch.com/", "location":"head", "section":"all" }',
    '{ "rel":"preconnect", "href":"https://www.google-analytics.com", "location":"head", "section":"all" }'
];

describe('TagsLoadingList', () => {
    it('Returns <></> when Tag is empty', () => {
        useContent.mockReturnValueOnce([]);
        const { container } = render(<TagsLoadingList />);
        expect(container.innerHTML).toEqual('');
    });

    it('Returns <></> when error catch', () => {
        useContent.mockReturnValueOnce([{ jsonError: 'error' }]);
        const { container } = render(
            <TagsLoadingList
                arcSite="la-nacion-ar"
                Tag="script"
                section="all"
                location="head"
            />
        );
        expect(container.innerHTML).toEqual('');
    });

    it('Return Tag Script', () => {
        useContent.mockReturnValueOnce(scriptsMock);
        const { container } = render(
            <TagsLoadingList
                arcSite="la-nacion-ar"
                Tag="script"
                section="all"
                location="head"
            />
        );

        expect(container.innerHTML).toStrictEqual(
            '<script rel="dns-prefetch" href="//cdn.livefyre.com"></script><script rel="dns-prefetch" href="https://sb.scorecardresearch.com/"></script><script rel="preconnect" href="https://www.google-analytics.com"></script>'
        );
    });

    describe('showCase Test', () => {
        const scriptsMockShowCase = [
            `{
                "id": "TestShowCase",
                "location": "head",
                "section": "nota",
                "src": "ejemplo",
                "validate.content_restrictions.content_code": {
                    "propName": "metered",
                    "defaultValue": "abierto"
                },
                "validate.label.showcase.text": {
                    "propName": "showcase",
                    "defaultValue": "no"
                },
                "validate.paywallEnabled": {
                    "propName": "paywall-enabled",
                    "defaultValue": "1"
                }
            }`
        ];

        it('verificar validacion', () => {
            useContent.mockReturnValueOnce(scriptsMockShowCase);
            const { container } = render(
                <TagsLoadingList
                    arcSite="la-nacion-ar"
                    Tag="script"
                    section="nota"
                    location="head"
                    globalContent={globalContent}
                />
            );
            expect(container.innerHTML).toContain(
                '<script id="TestShowCase" src="ejemplo" metered="cerrada" showcase="si" paywall-enabled="1"></script>'
            );
        });
    });
});
