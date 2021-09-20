import React from 'react';
import { useContent } from 'fusion:content';
import { shallow, mount } from 'enzyme';
import TagsLoadingList from '../../../../../components/private/common/scriptManager/tagsLoadingList';
jest.mock('fusion:content', () => ({
    useContent: jest.fn()
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
        const wrapper = shallow(<TagsLoadingList />);
        // console.log("🚀 ~  ~ wrapper", wrapper.debug())
        expect(wrapper.contains(<></>)).toEqual(true);
    });
    it('Returns <></> when error catch', () => {
        useContent.mockReturnValueOnce([{ jsonError: 'error' }]);
        const wrapper = shallow(
            <TagsLoadingList
                arcSite="la-nacion-ar"
                Tag="script"
                section="all"
                location="head"
            />
        );
        expect(wrapper.contains(<></>)).toEqual(true);
    });
    it('Return Tag Script', () => {
        useContent.mockReturnValueOnce(scriptsMock);
        const wrapper = mount(
            <TagsLoadingList
                arcSite="la-nacion-ar"
                Tag="script"
                section="all"
                location="head"
            />
        );

        expect(
            wrapper.contains([
                <script rel="dns-prefetch" href="//cdn.livefyre.com" />,
                <script
                    rel="dns-prefetch"
                    href="https://sb.scorecardresearch.com/"
                />,
                <script
                    rel="preconnect"
                    href="https://www.google-analytics.com"
                />
            ])
        ).toEqual(true);
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
        it('verificar vidalacion', () => {
            useContent.mockImplementation(() => scriptsMockShowCase);
            const wrapper = mount(
                <TagsLoadingList
                    arcSite="la-nacion-ar"
                    Tag="script"
                    section="nota"
                    location="head"
                    globalContent={globalContent}
                />
            );

            expect(
                wrapper.contains(
                    <script
                        id="TestShowCase"
                        src="ejemplo"
                        metered="cerrada"
                        showcase="si"
                        paywall-enabled="1"
                    />
                )
            ).toEqual(true);
        });
    });
});
