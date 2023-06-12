import React from 'react';
import {
    setCustomErrorsVideoPlayer,
    getClassCondition,
    withAutoPlay,
    removeFacade,
    handleClickEvent,
    setVideoEvents,
    addToDataLayer,
    isInDatalayerEvent,
    setProgressEvent
} from '../../../../../components/private/common/utils/videoPlayerHelper';
import '@testing-library/jest-dom';

describe('Private - Common - Utils - VideoPlayerHelper', () => {
    global.window.document.body.innerHTML = '';

    it('should test setCustomErrorsVideoPlayer function', () => {
        const expected = expect.objectContaining({
            template: expect.any(Function)
        });
        setCustomErrorsVideoPlayer();
        expect(window.PoWaSettings.error).toBeDefined();
        expect(window.PoWaSettings.error).toEqual(expected);
    });

    it('should test addToDataLayer function', () => {
        global.window.dataLayer = [];

        addToDataLayer('play', 'titulo', 'id');

        expect(window.dataLayer).toStrictEqual([
            { event: 'play', videoID: 'id', videoName: 'titulo' }
        ]);
    });

    it('should test isInDatalayerEvent function', () => {
        const _event = {
            videoID: 'powa-9062483a-1cd9-4a5d-8656-380f2b675abf-0',
            event: 'event'
        };

        global.window.dataLayer = [_event];

        expect(
            isInDatalayerEvent(
                'event',
                'powa-9062483a-1cd9-4a5d-8656-380f2b675abf-0'
            )
        ).toStrictEqual(_event);

        expect(isInDatalayerEvent({}, 'powa-undefined')).toStrictEqual(false);
    });

    it('should test setProgresEvent function', () => {
        global.window.dataLayer = [];

        const player = {
            on: () => {
                if (
                    !isInDatalayerEvent(
                        '25',
                        'powa-9062483a-1cd9-4a5d-8656-380f2b675abf-0'
                    )
                ) {
                    addToDataLayer(
                        '25',
                        'tituloVideo',
                        'powa-9062483a-1cd9-4a5d-8656-380f2b675abf-0'
                    );
                }
            }
        };

        setProgressEvent(player, '', '');

        expect(window.dataLayer).toStrictEqual([
            {
                event: '25',
                videoID: 'powa-9062483a-1cd9-4a5d-8656-380f2b675abf-0',
                videoName: 'tituloVideo'
            }
        ]);
    });

    it('should test setVideoEvents function', () => {
        const event = {
            detail: {
                id: 'powa-9062483a-1cd9-4a5d-8656-380f2b675abf-0',
                powa: { on: jest.fn() }
            }
        };

        expect(
            setVideoEvents(
                event,
                'powa-9062483a-1cd9-4a5d-8656-380f2b675abf-0',
                'tituloId',
                false
            )
        ).toStrictEqual(null);
    });

    describe('Tests function getClassCondition ', () => {
        it('It should return a string with the classes "--isApertura and --facade".', () => {
            expect(getClassCondition(true, true)).toStrictEqual(
                ' --isApertura --facade'
            );
        });

        it('It should return a string with the class " --facade".', () => {
            expect(getClassCondition(true, false)).toStrictEqual(' --facade');
        });

        it('It should return a empty string', () => {
            expect(getClassCondition(false, false)).toStrictEqual('');
            expect(getClassCondition(undefined)).toStrictEqual('');
        });
    });

    describe('Test function withAutoPlay', () => {
        global.window.document.body.innerHTML = `
            <body>
                <div>
                    <video id="first-video-id" />
                </div>
            </body>
        `;

        const data = {
            target: document.querySelector('video'),
            firstVideoId: 'first-video-id',
            isApertura: true,
            firstVideoCuerpoAutoplay: true,
            isDesktop: true
        };

        const casesTruthy = [
            ['should return true when all parameters match', data],
            [
                'It should return true when it is not open but the autoplay thermal is true.',
                {
                    ...data,
                    isApertura: false
                }
            ],
            [
                'It should return true when is open and the autoplay thermal is false',
                {
                    ...data,
                    firstVideoCuerpoAutoplay: false
                }
            ]
        ];

        test.each(casesTruthy)('%s', (message, data) => {
            expect(withAutoPlay(...Object.values(data))).toBeTruthy();
        });

        const casesFalsy = [
            [
                'It should return false when is mobile',
                {
                    ...data,
                    isDesktop: false
                }
            ],
            [
                'should return false when the id of the first video does not match the id of the element it receives',
                {
                    ...data,
                    firstVideoId: 'second-video-id'
                }
            ],
            [
                'should return false when the target is not defined',
                {
                    ...data,
                    target: undefined
                }
            ]
        ];

        test.each(casesFalsy)('%s', (message, data) => {
            expect(withAutoPlay(...Object.values(data))).toBeFalsy();
        });

        test('should return false when the parameters is not defined', () => {
            expect(withAutoPlay(undefined)).toBeFalsy();
        });
    });

    describe('Tests function handleClickEvent', () => {
        global.window.document.head.innerHTML = '';
        global.window.document.body.innerHTML = `
            <div class="video-player">
                <div class="content-facade">
                    <button id="button-play" class="button-play" />
                    <img id="image-facade" />
                </div>
                <div class="powa" data-uuid="video-id" data-autoPlay="false">
            </div>
        `;

        const apiEnv = 'sandbox';

        test(' should not modify the autoplay or add the loader class', () => {
            const videoId = 'video-id-2';
            const target = undefined;

            handleClickEvent(videoId, target, apiEnv);

            expect(
                document
                    .querySelector('#button-play')
                    .classList.contains('loader')
            ).toBeFalsy();

            expect(
                document.querySelector('.powa').getAttribute('data-autoPlay')
            ).toStrictEqual('false');
        });

        test('should set the autoplay to true, add the loader class to the play button and create the powa script', () => {
            const videoId = 'video-id';
            const target = document.querySelector('.video-player');

            handleClickEvent(videoId, target, apiEnv);

            const scriptPowa = document.head.querySelector('#script-powa');

            expect(
                document
                    .querySelector('#button-play')
                    .classList.contains('loader')
            ).toBeTruthy();

            expect(
                document.querySelector('.powa').getAttribute('data-autoPlay')
            ).toStrictEqual('true');

            expect(scriptPowa).toBeDefined();
            expect(scriptPowa.getAttribute('src')).toStrictEqual(
                'https://lanacionar.video-player.arcpublishing.com/sandbox/powaBoot.js'
            );
        });
    });

    test('Should remove the content facade', () => {
        global.window.document.body.innerHTML = `
            <body>
                <div class="content-facade">
                    <img id="image-facade" />
                </div>
            </body>
        `;

        removeFacade();

        expect(document.querySelector('.content-facade')).toBeNull();
    });
});
