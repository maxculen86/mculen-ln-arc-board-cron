import React from 'react';
import { shallow } from 'enzyme';
import ComImage from '../../../../components/private/common/com-image';

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
        withLazy: true,
        isApertura: false
    };
    describe('Props on default outputType, with svg, lazy and href', () => {
        const component = shallow(<ComImage {...props} />);
        it('Should return image with correct props and with link', () => {
            const imageTag = component.find('img');
            const imageProps = imageTag.props();
            const linkImage = component.find('ComLink');
            const linkProps = linkImage.props();

            expect(imageTag).toHaveLength(1);
            expect(imageProps.loading).toBe('lazy');
            expect(imageProps.alt).toBe(props.alt);
            expect(imageProps.width).toBe(props.width);
            expect(imageProps.height).toBe(props.height);
            expect(imageProps.className).toBe(` ${props.classCondition}`);
            expect(component.find('ComLink')).toHaveLength(1);
            expect(linkProps.link).toBe(props.href);
        });
    });

    describe('Props on default outputType, without svg, lazy nor href', () => {
        const propsTwo = {
            ...props,
            svg: false,
            withLazy: false,
            href: undefined
        };

        const component = shallow(<ComImage {...propsTwo} />);
        it('Should return link and image with correct props', () => {
            const imageTag = component.find('img');
            const imageProps = imageTag.props();

            expect(imageTag).toHaveLength(1);
            expect(component.find('ComLink')).toHaveLength(0);
            expect(imageProps.loading).toBe(undefined);
            expect(imageProps.alt).toBe(propsTwo.alt);
            expect(imageProps.width).toBe(propsTwo.width);
            expect(imageProps.height).toBe(propsTwo.height);
            expect(imageProps.className).toBe(
                `com-image ${propsTwo.classCondition}`
            );
        });
    });

    describe('Props on amp outputType, without layout, target nor classCondition', () => {
        const propsThree = {
            ...props,
            amp: true,
            layout: undefined,
            target: undefined,
            classCondition: undefined,
            withLazy: undefined,
            srcsetAMP: 'mock'
        };

        const component = shallow(<ComImage {...propsThree} />);
        it('Should return link and amp-img with correct props', () => {
            const imageTag = component.find('amp-img');
            const imageProps = imageTag.props();
            const linkImage = component.find('ComLink');
            const linkProps = linkImage.props();

            expect(component.find('img')).toHaveLength(0);
            expect(imageTag).toHaveLength(1);
            expect(imageProps.width).toBe(propsThree.width);
            expect(imageProps.height).toBe(propsThree.height);
            expect(imageProps.layout).toBe('responsive');
            expect(imageProps.class).toBe(' ');
            expect(imageProps.srcSet).toBe(propsThree.srcsetAMP);
            expect(imageProps['data-hero']).toBe(undefined);
            expect(linkProps.link).toBe(propsThree.href);
        });
    });
    describe('Props on amp outputType, with isApertura', () => {
        const propsFour = {
            ...props,
            amp: true,
            isApertura: true
        };

        const component = shallow(<ComImage {...propsFour} />);
        it('Should return amp-img with data-hero set to true', () => {
            const imageTag = component.find('amp-img');
            const imageProps = imageTag.props();

            expect(imageProps['data-hero']).toBe(true);
        });
    });

    describe('Without src', () => {
        props.src = null;
        const component = shallow(<ComImage {...props} />);
        it('Should return null', () => {
            expect(component.find('img')).toHaveLength(0);
            expect(component.html()).toBeNull();
        });
    });
});
