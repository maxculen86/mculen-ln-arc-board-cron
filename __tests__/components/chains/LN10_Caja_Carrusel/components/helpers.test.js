import React from 'react';
import {
    handleEventSwipeVideo,
    registeredIdsSetAndInteractions,
    transformNodes
} from '../../../../../components/chains/LN10_Caja_Carrusel/components/helpers';
import { addEventToDataLayerV2 } from '../../../../../components/private/LN/common/utils/addEventToDataLayer';

jest.mock(
    '../../../../../components/private/LN/common/utils/addEventToDataLayer',
    () => ({
        addEventToDataLayerV2: jest.fn()
    })
);

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
    });
});
