import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import useVideoJwBody from '../../../../../../../components/features/LN/common/video/utils/useVideoJwBody';
import {
    extractVideoData,
    DEFAULT_PLAYER_ID
} from '../../../../../../../components/features/LN/common/video/utils/videoDataUtils';

const mockData = {
    embed: {
        config: {
            idPlayer: 'mockPlayer123',
            videoJw: {
                title: 'Test',
                description: 'desc',
                epigraphTitle: 'Epigraph',
                playlist: [
                    {
                        mediaid: 'testMedia123',
                        images: [],
                        image: 'fallback.jpg',
                        sources: [{ file: 's.mp4', type: 'video/mp4' }]
                    }
                ]
            }
        }
    }
};

function Harness({ data }) {
    const body = useVideoJwBody(data);
    return <div data-testid="harness" data-body={JSON.stringify(body)} />;
}

function readBody(container) {
    const el = container.querySelector('[data-testid="harness"]');
    return JSON.parse(el.getAttribute('data-body'));
}

describe('useVideoJwBody', () => {
    it('is a default export (function)', () => {
        expect(typeof useVideoJwBody).toBe('function');
    });

    it('returns videoData extracted from data', () => {
        const { container } = render(<Harness data={mockData} />);
        const body = readBody(container);
        expect(body.videoData).toEqual(extractVideoData(mockData));
        expect(body.videoData.mediaId).toBe('testMedia123');
        expect(body.videoData.playerId).toBe('mockPlayer123');
        expect(body.videoData.title).toBe('Test');
    });

    it('exposes playerId and mediaId at the top level from videoData', () => {
        const { container } = render(<Harness data={mockData} />);
        const body = readBody(container);
        expect(body.playerId).toBe(body.videoData.playerId);
        expect(body.mediaId).toBe(body.videoData.mediaId);
    });

    it('applies default player id when idPlayer is missing', () => {
        const { container } = render(
            <Harness
                data={{
                    embed: {
                        config: {
                            idPlayer: '',
                            videoJw: {
                                title: 'Test',
                                playlist: [
                                    {
                                        mediaid: 'm1',
                                        sources: [],
                                        images: [],
                                        image: ''
                                    }
                                ]
                            }
                        }
                    }
                }}
            />
        );
        const body = readBody(container);
        expect(body.playerId).toBe(DEFAULT_PLAYER_ID);
        expect(body.videoData.playerId).toBe(DEFAULT_PLAYER_ID);
    });

    it('returns safe defaults when data is undefined', () => {
        const { container } = render(<Harness data={undefined} />);
        const body = readBody(container);
        expect(body.playerId).toBe(DEFAULT_PLAYER_ID);
        expect(body.mediaId).toBe('');
        expect(body.videoData).toEqual(extractVideoData(undefined));
    });

    it('returns safe defaults when embed.config.videoJw is missing', () => {
        const { container } = render(
            <Harness data={{ embed: { config: {} } }} />
        );
        const body = readBody(container);
        expect(body.playerId).toBe(DEFAULT_PLAYER_ID);
        expect(body.mediaId).toBe('');
        expect(body.videoData.title).toBe('');
        expect(body.videoData.playlist).toEqual([]);
    });
});
