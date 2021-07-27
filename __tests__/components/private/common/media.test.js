import Consumer from 'fusion:consumer';
jest.mock('fusion:context', () => () => ({
    default: props => {
        const mockAvailableProps = {};

        return props.children(mockAvailableProps);
    }
}));

import Context from 'fusion:context';

import React from 'react';
import { mount } from 'enzyme';
import Media from '../../../../components/private/LN/common/media';
import image from '../../../../__mocks__/data/images/OTTprogramImage.json';
import { getEpigrafe } from '../../../../components/private/LN/common/utils/mediaHelper';
import EpigrafeAndCreditsData from '../../../../components/private/common/utils/epigrafeAndCreditsData';

describe('Private - LN - Common - Media', () => {
    Context.useAppContext = jest.fn(() => ({
        globalContent: { subtype: '1' }
    }));

    it('Dibuja el tag loading lazy', () => {
        const comp = mount(
            <Media
                mediaData={image}
                withZoom={false}
                itsGallery={false}
                handleClick
                colNumber
                active
                outputType="default"
            />
        );
        const img = comp.find('img');
        expect(img.is('img')).toBe(true);
        //expect(comp.find('img').length).toEqual(1);
        expect(img.prop('loading')).toBe('lazy');
    });

    it('No dibuja el tag loading lazy por ser Galeria', () => {
        const comp = mount(
            <Media
                mediaData={image}
                withZoom={false}
                itsGallery={true}
                handleClick
                colNumber
                active
                outputType="default"
            />
        );
        const img = comp.find('img');
        expect(img.is('img')).toBe(true);
        expect(comp.prop('loading')).toBe(undefined);
    });

    it('No dibuja el tag loading lazy por tener zoom', () => {
        const comp = mount(
            <Media
                mediaData={image}
                withZoom={true}
                itsGallery={false}
                handleClick
                colNumber
                active
                outputType="default"
            />
        );
        const img = comp.find('img');
        expect(img.is('img')).toBe(true);
        expect(comp.prop('loading')).toBe(undefined);
    });

    const basicImage = {
        _id: 'X2MJ25TCRRD63NGNBDAZGLYRZY',
        caption: 'prueba de epigrafe de messi',
        credits: {
            by: [
                {
                    name: 'Mariano Grondona',
                    type: 'author'
                }
            ]
        },
        subtitle: 'prueba title de messi',
        type: 'image',
        url:
            '/resizer/jyurG2Ow8jHanY1TE_d9M0NQkSU=/768x513/smart/arc-anglerfish-arc2-sandbox-sandbox-lanacionar.s3.amazonaws.com/public/X2MJ25TCRRD63NGNBDAZGLYRZY.jpg'
    };

    const basivVideo = {
        type: 'video',
        _id: 'aaaf0286-a327-4c58-b5dd-a86ee20664b9',
        display_date: '2019-07-03T18:41:08Z',
        headlines: {
            basic: 'Video test Fundacion'
        },
        promo_items: {
            basic: {
                credits: {
                    by: [
                        {
                            name: 'Shutterstock',
                            type: 'author'
                        }
                    ]
                }
            }
        }
    };

    it('Deberia traer los datos del epigrafe de promoItems', () => {
        expect(getEpigrafe(undefined)).toBeTruthy();
        expect(getEpigrafe({})).toBeTruthy();

        const data1 = getEpigrafe(basicImage);
        expect(data1.caption).toEqual(
            <span className="com-text --caption --twoxs">
                prueba de epigrafe de messi
            </span>
        );
        expect(data1.credit).toEqual(
            <span className="com-text --credit --twoxs">Mariano Grondona</span>
        );

        const data2 = getEpigrafe(basivVideo);
        expect(data2.caption).toEqual(
            <span className="com-text --caption --twoxs">
                Video test Fundacion
            </span>
        );
        expect(data2.credit).toEqual(
            <span className="com-text --credit --twoxs">Shutterstock</span>
        );
    });

    it('Deberia traer el epigrafe y credito', () => {
        expect(EpigrafeAndCreditsData(undefined)).toEqual('');
        expect(EpigrafeAndCreditsData({})).toEqual('');
        expect(EpigrafeAndCreditsData(basicImage)).toEqual('Mariano Grondona');
        expect(EpigrafeAndCreditsData(basivVideo.promo_items.basic)).toEqual(
            'Shutterstock'
        );
    });
});
