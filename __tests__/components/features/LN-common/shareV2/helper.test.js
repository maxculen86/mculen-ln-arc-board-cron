import { shareVideoConfig } from '../../../../../components/features/LN-common/shareV2/helper';
import { addEventToDataLayerV2 } from '../../../../../components/private/LN/common/utils/addEventToDataLayer';
import {
    copyToClipboard,
    popUpCompartirMailTo,
    popUpCompartirNotaFB,
    popUpCompartirNotaTW,
    shareWhatsAppDesktop
} from '../../../../../components/private/LN/common/utils/shareHelper';

jest.mock(
    '../../../../../components/private/LN/common/utils/addEventToDataLayer',
    () => ({
        addEventToDataLayerV2: jest.fn()
    })
);

jest.mock(
    '../../../../../components/private/LN/common/utils/shareHelper',
    () => ({
        shareWhatsAppDesktop: jest.fn(),
        popUpCompartirNotaFB: jest.fn(),
        popUpCompartirNotaTW: jest.fn(),
        popUpCompartirMailTo: jest.fn(),
        copyToClipboard: jest.fn(),
        getTwitterTitle: jest.fn(() => 'Mocked Twitter Title')
    })
);

describe('features - LN-common - shareV2 - helper - shareVideoConfig', () => {
    const mockData = {
        videoId: 'aTdCdBgL',
        basic: '“Alá y el islam son la verdadera religión”. El grafiti en una iglesia vandalizada en el bastión rebelde en Siria y la luz de esperanza que ven los cristianos',
        url: '/carrousel/jwidaTdCdBgL/',
        host: 'https://www.lanacion.com.ar',
        shareButton: jest.fn(),
        setCopy: jest.fn(),
        onShowTooltip: jest.fn(),
        mobileTitle: ''
    };

    it('should have the correct number of share options', () => {
        expect(shareVideoConfig).toHaveLength(6);
    });

    it('should call shareButton and addEventToDataLayerV2 for "compartirMobile"', () => {
        shareVideoConfig[0].onClick(mockData);
        expect(mockData.shareButton).toHaveBeenCalled();
        expect(addEventToDataLayerV2).toHaveBeenCalledWith({
            event: 'share_video',
            title: mockData.basic,
            rest: { id_video: mockData.videoId, tags: 'Nativo' }
        });
    });

    it('should call shareWhatsAppDesktop and addEventToDataLayerV2 for "whatsAppShareDesktop"', () => {
        shareVideoConfig[1].onClick(mockData);
        expect(shareWhatsAppDesktop).toHaveBeenCalledWith(
            mockData.url,
            mockData.host
        );
        expect(addEventToDataLayerV2).toHaveBeenCalledWith({
            event: 'share_video',
            title: mockData.basic,
            rest: { id_video: mockData.videoId, tags: 'whatsapp' }
        });
    });

    it('should call copyToClipboard, setCopy, and addEventToDataLayerV2 for "copyLinkNote"', () => {
        shareVideoConfig[2].onClick(mockData);
        expect(copyToClipboard).toHaveBeenCalledWith(
            mockData.host,
            mockData.url
        );
        expect(mockData.setCopy).toHaveBeenCalledWith(true);
        expect(addEventToDataLayerV2).toHaveBeenCalledWith({
            event: 'share_video',
            title: mockData.basic,
            rest: { id_video: mockData.videoId, tags: 'copiar link' }
        });
    });

    it('should call popUpCompartirNotaFB and addEventToDataLayerV2 for "btnfacebook"', () => {
        shareVideoConfig[3].onClick(mockData);
        expect(popUpCompartirNotaFB).toHaveBeenCalledWith(
            mockData.url,
            mockData.host
        );
        expect(addEventToDataLayerV2).toHaveBeenCalledWith({
            event: 'share_video',
            title: mockData.basic,
            rest: { id_video: mockData.videoId, tags: 'compartir facebook' }
        });
    });

    it('should call popUpCompartirNotaTW and addEventToDataLayerV2 for "btntwitter"', () => {
        shareVideoConfig[4].onClick(mockData);
        expect(popUpCompartirNotaTW).toHaveBeenCalled();
        expect(addEventToDataLayerV2).toHaveBeenCalledWith({
            event: 'share_video',
            title: mockData.basic,
            rest: { id_video: mockData.videoId, tags: 'compartir x' }
        });
    });

    it('should call popUpCompartirMailTo and addEventToDataLayerV2 for "btnemail"', () => {
        shareVideoConfig[5].onClick(mockData);
        expect(popUpCompartirMailTo).toHaveBeenCalledWith(
            mockData.url,
            mockData.host
        );
        expect(addEventToDataLayerV2).toHaveBeenCalledWith({
            event: 'share_video',
            title: mockData.basic,
            rest: { id_video: mockData.videoId, tags: 'enviar mail' }
        });
    });
});
