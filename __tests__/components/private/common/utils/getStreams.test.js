import { GlobalContext } from '../../../../../components/private/LN/acumulado/context/globalContextAcu';
import getStreams from '../../../../../components/private/LN/common/utils/getStreams';
import video from '../../../../../__mocks__/data/videos/videoParaPlayer.json';

const streams = video.globalContent.streams;

describe('Tests for getStreams util', () => {
    it('Test for minimum stream', () => {
        expect(getStreams(streams)).toEqual(streams[1]);
    });

    it('Test for maximum stream', () => {
        expect(getStreams(streams, '>')).toEqual(streams[0]);
    });

    it('Test for null values', () => {
        expect(getStreams()).toBeNull();
    });
});
