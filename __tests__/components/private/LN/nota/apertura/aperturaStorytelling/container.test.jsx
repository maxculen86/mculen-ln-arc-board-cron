import React from 'react';
import OpeningStorytelling from '../../../../../../../components/private/LN/nota/apertura/AperturaStorytelling/component';
import { getTypeOfDevice } from '@ln/hooks';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Context from 'fusion:context';
import storytellingWithVideo from '../../../../../../../__mocks__/data/nota/apertura/openingStorytelling/withVideo.json';
import storytellingWithoutVideo from '../../../../../../../__mocks__/data/nota/apertura/openingStorytelling/withoutVideo.json';
import getProperties from 'fusion:properties';

jest.mock('@ln/hooks', () => ({
    getTypeOfDevice: jest.fn()
}));

jest.mock(
    '../../../../../../../components/private/common/hocs/withScreenUtils',
    () => Comp => props => (Comp ? <Comp {...props} /> : null)
);

jest.mock(
    'fusion:environment',
    () => ({
        __esModule: true,
        RESIZER_URL_PUBLIC: 'https://resizer.glanacion.com',
        SITE_FOODIT: 'https://www.lanacion.com.ar',
        SITE_LANACION: 'https://www.lanacion.com.ar'
    }),
    { virtual: true }
);

jest.mock(
    'fusion:prop-types',
    () => {
        const PropTypes = require('prop-types');
        const addTag = validator => {
            if (typeof validator === 'function') {
                validator.tag = () => validator;
                if (validator.isRequired) {
                    validator.isRequired.tag = () => validator.isRequired;
                }
            }

            return validator;
        };
        const propTypeFactories = [
            'arrayOf',
            'elementType',
            'exact',
            'instanceOf',
            'objectOf',
            'oneOf',
            'oneOfType',
            'shape'
        ];

        Object.keys(PropTypes).forEach(key => addTag(PropTypes[key]));
        propTypeFactories.forEach(key => {
            const createValidator = PropTypes[key];
            PropTypes[key] = (...args) => addTag(createValidator(...args));
            addTag(PropTypes[key]);
        });

        return PropTypes;
    },
    { virtual: true }
);

jest.mock(
    'fusion:content',
    () => ({
        __esModule: true,
        useContent: jest.fn()
    }),
    { virtual: true }
);

jest.mock(
    'fusion:static',
    () => {
        const React = require('react');

        return function Static({ children, ...props }) {
            return React.createElement('static', props, children);
        };
    },
    { virtual: true }
);

jest.mock(
    'fusion:context',
    () => {
        const context = {
            useAppContext: jest.fn(() => ({
                contextPath: '',
                deployment: () => {},
                outputType: 'default'
            }))
        };

        return {
            __esModule: true,
            default: context,
            get useAppContext() {
                return context.useAppContext;
            }
        };
    },
    { virtual: true }
);

jest.mock(
    'fusion:properties',
    () => () => ({
        getProperties: () => {
            host = 'https://www.lanacion.com.ar';
        }
    }),
    { virtual: true }
);

const getProps = ({ withoutVideo, outputType = 'default', device }) => {
    Context.useAppContext = jest.fn(() => ({
        globalContent: { subtype: '1' },
        useAppContext: jest.fn(() => ({
            contextPath: '',
            deployment: () => {},
            outputType: 'default'
        }))
    }));
    return {
        globalContent: withoutVideo
            ? storytellingWithVideo
            : storytellingWithoutVideo,
        outputType,
        screenUtils: { device },
        isLoadWithPicture: true
    };
};

describe('Tests - Component - AperturaStorytelling', () => {
    Context.useAppContext = jest.fn(() => ({
        contextPath: '',
        deployment: () => {},
        outputType: 'default'
    }));

    describe('Cases render video', () => {
        getTypeOfDevice.mockImplementation(() => 'desktop');

        test('If the note has a video it should show it only for desktop with the autoplay, loop and poster attributes', () => {
            const { container } = render(
                <OpeningStorytelling
                    {...getProps({ withoutVideo: true, device: 'desktop' })}
                />
            );

            const video = container.querySelector('video');

            expect(video).toBeVisible();
            expect(video.hasAttribute('autoplay')).toBeTruthy();
            expect(video.hasAttribute('loop')).toBeTruthy();
            expect(video.hasAttribute('playsinline')).toBeTruthy();
            expect(video.getAttribute('poster')).toEqual(
                'https://cdn.jwplayer.com/v2/media/bb7snV27/poster.jpg?width=720'
            );
        });

        test('should return the title note', () => {
            render(
                <OpeningStorytelling
                    {...getProps({ withoutVideo: true, device: 'desktop' })}
                />
            );

            expect(
                screen.getByText(
                    'Trastornos de la alimentación: “Dormís con la muerte en la cama, abrazándote”'
                )
            ).toBeVisible();
        });

        test('should show image with tag picture, source and img with attributes alt, fetchpriority and loading when the device is mobile', () => {
            getTypeOfDevice.mockImplementation(() => 'mobile');

            const { container } = render(
                <OpeningStorytelling
                    {...getProps({ withoutVideo: true, device: 'mobile' })}
                />
            );

            const picture = container.querySelector('picture');
            const img = picture.querySelector('img');

            expect(picture).toBeVisible();
            expect(
                screen.getByText(
                    'Trastornos de la alimentación: “Dormís con la muerte en la cama, abrazándote”'
                )
            ).toBeVisible();
            expect(img.getAttribute('alt')).toEqual(
                'Trastornos de la alimentación'
            );
            expect(img.getAttribute('fetchpriority')).toEqual('high');
            expect(img.getAttribute('loading')).toEqual('eager');
            expect(container).toMatchSnapshot();
        });

        test('should only arm the mobile images in the picture when there is a video.', () => {
            getTypeOfDevice.mockImplementation(() => 'mobile');

            const { container } = render(
                <OpeningStorytelling
                    {...getProps({ withoutVideo: true, device: 'mobile' })}
                />
            );

            const sources = container.querySelectorAll('source');
            const img = container.querySelector('img');

            expect(sources).toHaveLength(1);
            expect(sources[0].getAttribute('media')).toStrictEqual(
                '(min-width: 768px)'
            );
            expect(img.getAttribute('src')).toContain('/resizer/v2/');
            expect(img.getAttribute('src')).toContain('width=420');
            expect(img.getAttribute('src')).toContain('height=630');
        });
    });

    describe('Cases render image', () => {
        getTypeOfDevice.mockImplementation(() => 'desktop');

        test('should return the image with picture and the different sizes for desktop and mobile', () => {
            const { container } = render(
                <OpeningStorytelling
                    {...getProps({ withoutVideo: false, device: 'desktop' })}
                />
            );

            const picture = container.querySelector('picture');
            expect(picture).toBeVisible();
            expect(picture.querySelectorAll('source')).toHaveLength(3);
            expect(container).toMatchSnapshot();
        });

        test('should return the epigraph', () => {
            render(
                <OpeningStorytelling
                    {...getProps({ withoutVideo: false, device: 'desktop' })}
                />
            );

            expect(
                screen.getByText(
                    'Federico Levrino es uno de los profesionales de alto rango de Telefe'
                )
            ).toBeVisible();
        });

        test('should return the title note', () => {
            render(
                <OpeningStorytelling
                    {...getProps({ withoutVideo: false, device: 'desktop' })}
                />
            );

            expect(
                screen.getByText(
                    'Federico Levrino, el gran productor de Susana: de su vínculo con Maradona al día que durmió en la puerta de la casa de Zulemita'
                )
            ).toBeVisible();
        });

        test('should return the caption and author name', () => {
            render(
                <OpeningStorytelling
                    {...getProps({ withoutVideo: false, device: 'desktop' })}
                />
            );

            expect(
                screen.getByText(
                    'Federico Levrino es uno de los profesionales de alto rango de Telefe'
                )
            ).toBeVisible();
            expect(screen.getByText('Alejandro Guyot')).toBeVisible();
        });
    });
});
