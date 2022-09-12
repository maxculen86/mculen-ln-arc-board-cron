import React from 'react';
import Context from 'fusion:context';
import getProperties from 'fusion:properties';
import VideoPlayer from '../../../../../components/private/common/videoPlayer';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

jest.mock('fusion:context', Component => {
    return function(Component) {
        return props => <Component {...props} />;
    };
});

describe('private - common - videoPlayer', () => {
    const _globalContent = promoItem => ({ promo_items: promoItem });

    window.powaBoot = () => {};
    window.dataLayer = [];
    it('should correctly render video player', () => {
        const powaAttrs = [
            { key: 'data-uuid', val: 'powa-video' },
            { key: 'data-ads', val: 'true' },
            { key: 'data-ad-bar', val: 'true' },
            { key: 'data-autoinit', val: 'native-hls' },
            { key: 'data-autoplay', val: 'false' },
            { key: 'data-autoplay-muted', val: 'false' },
            { key: 'data-controls', val: 'true' },
            { key: 'data-muted', val: 'false' },
            { key: 'data-sticky', val: 'false' },
            { key: 'data-api', val: 'sandbox' },
            { key: 'data-env', val: 'prod' }
        ];
        const { container } = render(
            <VideoPlayer videoId={'powa-video'} arcSite={'la-nacion-ar'} />
        );
        const videoPlayer = container.getElementsByClassName('powa')[0];
        expect(videoPlayer).toHaveClass('powa');
        powaAttrs.forEach(attr =>
            expect(videoPlayer).toHaveAttribute(attr.key, attr.val)
        );
    });
    it('should validate auto init prop', () => {
        const { container } = render(
            <VideoPlayer
                videoId={'powa-video'}
                arcSite={'la-nacion-ar'}
                loadVideoOnInit={false}
            />
        );
        expect(container.getElementsByClassName('powa')[0]).toHaveAttribute(
            'data-autoinit',
            'false'
        );
    });
    it('should have an apertura video', () => {
        const { container } = render(
            <VideoPlayer
                videoId={'apertura_video_basic'}
                arcSite={'la-nacion-ar'}
                globalContent={_globalContent({
                    basic: {
                        type: 'video',
                        _id: 'apertura_video_basic'
                    }
                })}
                device={'desktop'}
                isApertura={true}
            />
        );
        expect(container.getElementsByClassName('powa')[0]).toHaveAttribute(
            'data-muted',
            'true'
        );
    });
});
