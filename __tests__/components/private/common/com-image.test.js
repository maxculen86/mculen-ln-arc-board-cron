import React from 'react';
import ComImage from '../../../../components/private/common/com-image';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

describe('components - private - common - ComImage', () => {
    const props = {
        classCondition: 'com-logo la-nacion --xs',
        width: '50',
        height: '50',
        src:
            'http://localhost/pf/resources/images/logo-lanacion.svg?d=%24LATEST',
        alt: 'LA NACION',
        amp: false,
        svg: true,
        srcsetAMP: '',
        href: 'https://www.lanacion.com.ar/',
        target: '_blank',
        isApertura: false,
        searchableField: {
            'data-feature': 'f0fEPgosxQPZ4i8',
            'data-field-editable': 'imageId=_id',
            contentEditable: 'false',
            'data-searchable': 'true',
            'data-searchable-type': 'image'
        }
    };
    describe('Test searchableField prop', () => {
        it('should render searchableField properties in img', () => {
            render(<ComImage {...props} />);
            Object.entries(props.searchableField).forEach(([key, value]) => {
                expect(screen.getByRole('img')).toHaveAttribute(key, value);
            });
        });
    });
    describe('Props on default outputType, with svg, lazy and href', () => {
        it('Should return image with correct props and with link', () => {
            const { getByRole } = render(<ComImage {...props} />);
            const imageTag = getByRole('img');
            const linkImage = getByRole('link');

            expect(imageTag).toBeInTheDocument();
            expect(imageTag).toHaveAttribute('loading', 'lazy');
            expect(imageTag).toHaveAttribute('alt', props.alt);
            expect(imageTag).toHaveAttribute('width', props.width);
            expect(imageTag).toHaveAttribute('height', props.height);
            expect(imageTag).toHaveClass(props.classCondition);
            expect(linkImage).toBeInTheDocument();
            expect(linkImage).toHaveAttribute('href', props.href);
        });
    });
    describe('Props on default outputType, without svg, lazy nor href', () => {
        it('Should return link and image with correct props', () => {
            const propsTwo = {
                ...props,
                svg: false,
                href: undefined
            };
            const { getByRole, queryByRole } = render(
                <ComImage {...propsTwo} />
            );
            const imageTag = getByRole('img');
            const linkImage = queryByRole('link');

            expect(imageTag).toBeInTheDocument();
            expect(linkImage).not.toBeInTheDocument();
            expect(imageTag).toHaveAttribute('loading', 'lazy');
            expect(imageTag).toHaveAttribute('alt', propsTwo.alt);
            expect(imageTag).toHaveAttribute('width', propsTwo.width);
            expect(imageTag).toHaveAttribute('height', propsTwo.height);
            expect(imageTag).toHaveClass('com-image', propsTwo.classCondition);
        });
    });

    describe('Props on amp outputType, without layout, target nor classCondition', () => {
        it('Should return link and amp-img with correct props', () => {
            const propsThree = {
                ...props,
                amp: true,
                layout: undefined,
                target: undefined,
                classCondition: undefined,
                srcset: 'mock',
                alt: 'test-amp-image'
            };
            const { queryByRole, getByAltText, getByRole } = render(
                <ComImage {...propsThree} />
            );

            const ampImageTag = getByAltText('test-amp-image');
            const linkImage = getByRole('link');

            expect(queryByRole('img')).toBeNull();
            expect(ampImageTag).toBeInTheDocument();
            expect(ampImageTag).toHaveAttribute('width', propsThree.width);
            expect(ampImageTag).toHaveAttribute('height', propsThree.height);
            expect(ampImageTag).toHaveAttribute('layout', 'responsive');
            expect(ampImageTag).toHaveAttribute('class', ' ');
            expect(ampImageTag).toHaveAttribute('srcSet', propsThree.srcset);
            expect(ampImageTag.getAttribute('data-hero')).toBeNull();
            expect(linkImage).toHaveAttribute('href', propsThree.href);
        });
    });

    describe('Props on amp outputType, with isApertura', () => {
        it('Should return amp-img with data-hero set to true', () => {
            const propsFour = {
                ...props,
                amp: true,
                isApertura: true,
                alt: 'test-amp-image'
            };
            const { getByAltText } = render(<ComImage {...propsFour} />);
            const imageTag = getByAltText('test-amp-image');

            expect(imageTag.getAttribute('data-hero')).toBeTruthy();
        });
    });

    describe('Without src', () => {
        it('Should return null', () => {
            props.src = null;
            const { queryByRole } = render(<ComImage {...props} />);
            expect(queryByRole('img')).not.toBeInTheDocument();
        });
    });
});
