import React from 'react';
import {
    handleEventSwipeVideo,
    registeredIdsSetAndInteractions,
    transformNodes,
    getAdsConfigVideoJw,
    shouldHideCarrusel
} from '../../../../../components/chains/LN10_Caja_Carrusel/components/helpers';
import { addEventToDataLayerV2 } from '../../../../../components/private/LN/common/utils/addEventToDataLayer';
import { hasValidationFailed } from '../../../../../components/chains/LN10_Caja_Segmentada/_helpers';

jest.mock(
    '../../../../../components/private/LN/common/utils/addEventToDataLayer',
    () => ({
        addEventToDataLayerV2: jest.fn()
    })
);

jest.mock('../../../../../components/chains/LN10_Caja_Segmentada/_helpers');

describe('tests - LN10_Caja_Carrusel - helpers.js', () => {
    describe('handleEventSwipeVideo', () => {
        beforeEach(() => {
            global.registeredIdsSetAndInteractions = new Set();
            jest.clearAllMocks();
        });

        it('adds a new video event to the data layer if not already registered', () => {
            registeredIdsSetAndInteractions.add('clickEventRegistered'); // coming from the click to avoid event duplication
            registeredIdsSetAndInteractions.add('video1'); // coming from the click, video view
            const videoIdObserved = 'video2';
            const videoTitle = 'Sample Video Title';

            handleEventSwipeVideo({ videoIdObserved, videoTitle });

            expect(addEventToDataLayerV2).toHaveBeenCalledWith({
                contentType: 'video_story',
                event: 'video_view',
                origin: 'video_story',
                rest: {
                    page_title: videoTitle,
                    id_video: videoIdObserved
                }
            });
        });

        it('does not add the event if videoIdObserved is already registered', () => {
            const videoIdObserved = 'video123';
            const videoTitle = 'Sample Video Title';

            registeredIdsSetAndInteractions.add(videoIdObserved);

            handleEventSwipeVideo({ videoIdObserved, videoTitle });

            expect(addEventToDataLayerV2).not.toHaveBeenCalled();
        });

        it('does not add the event if registeredId is undefined or not initialized', () => {
            global.registeredId = undefined;

            const videoIdObserved = 'video123';
            const videoTitle = 'Sample Video Title';

            handleEventSwipeVideo({ videoIdObserved, videoTitle });

            expect(addEventToDataLayerV2).not.toHaveBeenCalled();
        });
    });

    describe('transformNodes', () => {
        const MockChild = ({ label }) => <div>{label}</div>;

        const getProps = (overrides = {}) => ({
            children: [
                <MockChild label="1" />,
                <MockChild label="2" />,
                <MockChild label="3" />
            ],
            isAdmin: false,
            childProps: [
                {
                    type: 'LN-common/bannerRefactor',
                    customFields: { video: 'video1', title: 'Banner title' }
                },
                {
                    type: 'LN-10/itemCarrusel',
                    customFields: { video: 'video2', title: 'Carrusel title 1' }
                },
                {
                    type: 'LN-10/itemCarrusel',
                    customFields: { video: 'video3', title: 'Carrusel title 2' }
                }
            ],
            isExpanded: false,
            bannerRef: { current: null },
            ...overrides
        });

        it('render div with ref if it is banner and not admin and not expanded', () => {
            const props = getProps();
            const result = transformNodes(props);
            expect(result[0]).toMatchObject({
                id: null,
                title: null,
                type: 'LN-common/bannerRefactor',
                isBanner: true
            });
            expect(result[0].node.type).toBe('div');
            expect(result[0].node.props.id).toBe('bannerRoot');
            expect(result[0].node.ref).toBe(props.bannerRef);
        });

        it('render the child directly if it is not a banner', () => {
            const props = getProps();
            const result = transformNodes(props);
            expect(result[1].node.type).toBe(MockChild);
            expect(result[2].node.type).toBe(MockChild);
        });

        it('render all nodes if esAdmin = true', () => {
            const props = getProps({ isAdmin: true });
            const result = transformNodes(props);
            expect(result[0].node.type).toBe(MockChild);
        });

        it('render all nodes if isExpanded = true', () => {
            const props = getProps({ isExpanded: true });
            const result = transformNodes(props);
            expect(result[0].node.type).toBe(MockChild);
        });

        it('limits the number of nodes to 10', () => {
            const childProps = Array.from({ length: 12 }, (_, i) => ({
                type: 'LN-10/itemCarrusel',
                customFields: { video: `v${i}`, title: `t${i}` }
            }));
            const children = childProps.map((_, i) => <MockChild label={i} />);
            const result = transformNodes({
                children,
                isAdmin: false,
                childProps,
                isExpanded: false,
                bannerRef: { current: null }
            });
            expect(result.length).toBe(10);
        });

        it('uses default values ​​if data is missing', () => {
            const props = getProps({
                childProps: [{}],
                children: [<MockChild label="x" />]
            });
            const result = transformNodes(props);
            expect(result[0].id).toBe(undefined);
            expect(result[0].title).toBe(undefined);
            expect(result[0].type).toBe('LN-10/itemCarrusel');
            expect(result[0].isBanner).toBe(false);
        });

        it('The counterVideos property should return only for videos. For banners, it should return 0.', () => {
            const props = getProps();
            const result = transformNodes(props);
            expect(result[0].counterVideo).toBe(0);
            expect(result[1].counterVideo).toBe(1);
            expect(result[2].counterVideo).toBe(2);
        });
    });

    describe('getAdsConfigVideoJw', () => {
        const adsUrl = 'http://example.com/adtag';
        const expectedConfig = {
            advertising: {
                client: 'googima',
                schedule: [
                    {
                        tag: adsUrl,
                        offset: 'pre'
                    }
                ]
            },
            intl: {
                en: {
                    advertising: {
                        admessage: 'El video empezará en xx segúndos',
                        cuetext: 'Publicidad',
                        skipmessage: 'Saltar aviso en xx segúndos'
                    },
                    related: {
                        autoplaymessage: '',
                        heading: 'More Videos'
                    }
                }
            }
        };

        it('should return an empty object when adsUrl is empty but customValidation is true', () => {
            const adsUrl = '';
            const customValidation = true;

            const result = getAdsConfigVideoJw({ adsUrl, customValidation });
            expect(result).toEqual({});
        });

        it('should return an empty object when adsUrl is valid but customValidation is false', () => {
            const adsUrl = 'http://example.com/adtag';
            const customValidation = false;

            const result = getAdsConfigVideoJw({ adsUrl, customValidation });
            expect(result).toEqual({});
        });

        it('should return an empty object when both adsUrl and customValidation are false (default values)', () => {
            const result = getAdsConfigVideoJw();
            expect(result).toEqual({});
        });

        it('should return an empty object when adsUrl is null and customValidation is true', () => {
            const adsUrl = null;
            const customValidation = true;

            const result = getAdsConfigVideoJw({ adsUrl, customValidation });
            expect(result).toEqual({});
        });

        it('should return an empty object when adsUrl is undefined and customValidation is true', () => {
            const adsUrl = undefined;
            const customValidation = true;

            const result = getAdsConfigVideoJw({ adsUrl, customValidation });
            expect(result).toEqual({});
        });

        it('should return an empty object when adsUrl is valid and customValidation is null', () => {
            const adsUrl = 'http://example.com/adtag';
            const customValidation = null;

            const result = getAdsConfigVideoJw({ adsUrl, customValidation });
            expect(result).toEqual({});
        });

        it('should return an empty object when adsUrl is valid and customValidation is undefined', () => {
            const adsUrl = 'http://example.com/adtag';
            const customValidation = undefined;

            const result = getAdsConfigVideoJw({ adsUrl, customValidation });
            expect(result).toEqual({});
        });

        it('should return an empty object when adsUrl is a number (0) and customValidation is true', () => {
            const adsUrl = 0;
            const customValidation = true;

            const result = getAdsConfigVideoJw({ adsUrl, customValidation });
            expect(result).toEqual({});
        });

        it('should return the full ad configuration when customValidation is a truthy non-boolean', () => {
            const adsUrl = 'http://example.com/adtag';
            const customValidation = 1;

            const result = getAdsConfigVideoJw({
                adsUrl,
                customValidation
            });
            expect(result).toEqual(expectedConfig);
        });

        it('should return the full ad configuration when adsUrl has spaces and customValidation is true', () => {
            const result = getAdsConfigVideoJw({
                adsUrl,
                customValidation: true
            });
            expect(result).toEqual(expectedConfig);
        });
    });

    describe('shouldHideCarrusel', () => {
        beforeEach(() => {
            jest.clearAllMocks();
        });

        it('should return { error: true, hide: false } if admin and there is an error', () => {
            const result = shouldHideCarrusel({
                isAdmin: true,
                error: { type: 'warning', message: 'some error' },
                isHome: false,
                hideCarousel: false,
                enabledDays: ['lunes', 'martes'],
                shouldSchedule: true
            });
            expect(result).toEqual({ error: true, hide: false });
        });

        it("should return { error: false, hide: true } if it's home and hasValidationFailed returns true", () => {
            hasValidationFailed.mockReturnValue(true);

            const result = shouldHideCarrusel({
                isAdmin: false,
                error: null,
                isHome: true,
                hideCarousel: false,
                enabledDays: ['lunes', 'martes'],
                shouldSchedule: true
            });

            expect(hasValidationFailed).toHaveBeenCalledWith({
                isAdmin: false,
                hideCaja: false,
                enabledDays: ['lunes', 'martes'],
                termica: true,
                configError: null,
                token: true,
                shouldSchedule: true
            });
            expect(result).toEqual({ error: false, hide: true });
        });

        it("should return { error: false, hide: false } if it's home and hasValidationFailed returns false", () => {
            hasValidationFailed.mockReturnValue(false);

            const result = shouldHideCarrusel({
                isAdmin: false,
                error: null,
                isHome: true,
                hideCarousel: false,
                enabledDays: ['lunes', 'martes'],
                shouldSchedule: true
            });

            expect(result).toEqual({ error: false, hide: false });
        });

        it('should return { error: false, hide: true } if hideCarousel is true', () => {
            const result = shouldHideCarrusel({
                isAdmin: false,
                error: null,
                isHome: false,
                hideCarousel: true,
                enabledDays: ['lunes', 'martes'],
                shouldSchedule: true
            });

            expect(result).toEqual({ error: false, hide: true });
        });

        it('should return { error: false, hide: false } if no condition is met', () => {
            hasValidationFailed.mockReturnValue(false);

            const result = shouldHideCarrusel({
                isAdmin: false,
                error: null,
                isHome: false,
                hideCarousel: false,
                enabledDays: ['lunes', 'martes'],
                shouldSchedule: true
            });

            expect(result).toEqual({ error: false, hide: false });
        });

        it('should hide the carrusel when scheduling is enabled but enabledDays validation fails', () => {
            hasValidationFailed.mockReturnValue(true);

            const result = shouldHideCarrusel({
                isAdmin: false,
                error: null,
                isHome: false,
                hideCarousel: false,
                enabledDays: [],
                shouldSchedule: true
            });

            expect(result).toEqual({ error: false, hide: true });
        });

        it('should ignore enabledDays when scheduling is disabled', () => {
            hasValidationFailed.mockClear();

            const result = shouldHideCarrusel({
                isAdmin: false,
                error: null,
                isHome: true,
                hideCarousel: false,
                enabledDays: [],
                shouldSchedule: false
            });

            expect(hasValidationFailed).not.toHaveBeenCalled();
            expect(result).toEqual({ error: false, hide: false });
        });
    });
});
