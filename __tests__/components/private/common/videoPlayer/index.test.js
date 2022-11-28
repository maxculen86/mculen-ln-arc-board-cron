import React from 'react';
import Context from 'fusion:context';
import getProperties from 'fusion:properties';
import VideoPlayer from '../../../../../components/private/common/videoPlayer';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import globalContentWithVideo from '../../../../../__mocks__/data/images/getDataToLinkImage/globalContentWithVideo';

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
            { key: 'data-muted', val: 'true' },
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
    it('should have placeholder class', () => {
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
        expect(container.querySelector('.video-player')).toBeInTheDocument();
    });
    it('should have script for custom errors', () => {
        const errorScript = `window.addEventListener('powaError',()=>{constfacade=document.querySelector('.content-facade');if(facade)facade.remove();});`;
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

        expect(
            container.querySelector('script').innerHTML.replace(/\s/g, '')
        ).toStrictEqual(errorScript.replace(/\s/g, ''));
    });

    describe('Tests powa video upload with facade image', () => {
        let videoPlayer = null;

        beforeEach(() => {
            videoPlayer = render(
                <VideoPlayer
                    videoId={'apertura_video_basic'}
                    arcSite={'la-nacion-ar'}
                    globalContent={{
                        ...globalContentWithVideo,
                        type: 'story'
                    }}
                    videoImageData={
                        globalContentWithVideo.promo_items.apertura_multimedia
                            .promo_items.basic
                    }
                    device={'desktop'}
                    isApertura={true}
                />
            );
        });

        it('The video-player container should have the "--isApertura" and "--facade" modifier classes.', () => {
            const { container } = videoPlayer;

            const containerVideoPlayer = container.querySelector(
                '.video-player'
            );

            expect(
                containerVideoPlayer.classList.contains('--isApertura')
            ).toBeTruthy();

            expect(
                containerVideoPlayer.classList.contains('--facade')
            ).toBeTruthy();
        });

        it('It should render the image facade and not load the powa script.', () => {
            const { container } = videoPlayer;

            const contentFacade = container.querySelector('.content-facade');

            expect(contentFacade).toBeDefined();

            expect(document.querySelector('#script-powa')).toBeNull();

            expect(contentFacade.querySelector('.com-image')).toBeDefined();

            expect(contentFacade.querySelector('.button-play')).toBeDefined();
        });

        it('should have the powa lazyload script.', () => {
            const ScriptBuildPowa = `window.addEventListener('load',()=>{setCustomErrorsVideoPlayer()constisDesktop=deviceType()==='desktop'constvideoPlayerList=document.querySelectorAll('.video-player');constobserver=setIntersectionObserver(videoPlayerList,'sandbox',isDesktop,true,'','apertura_video_basic',true)window.addEventListener('powaReady',()=>{observer.disconnect();removeFacade();const[{shadowRoot}={}]=document.querySelectorAll('.powa-shadow');letdivFirstPowa=shadowRoot.querySelector&&shadowRoot.querySelector('[data-uuid=\"\"]');letuserPause=false;if(false&&false){divFirstPowa=undefined}if(divFirstPowa&&window.powas){const{powa}=window.powas[divFirstPowa.id];powa.on('pause',()=>userPause=true);powa.on('viewable',()=>!userPause&&powa.play());}});});`;
            const { container } = videoPlayer;
            console.log(
                '====>',
                container.querySelectorAll('script')[0].innerHTML
            );
            expect(
                container
                    .querySelectorAll('script')[0]
                    .innerHTML.replace(/\s/g, '')
                    .includes(ScriptBuildPowa)
            ).toBeTruthy();
        });
    });
});
