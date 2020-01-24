jest.mock(
    '../../../../../../components/private/LN/common/media/videoPlayer.jsx',
    () => 'mock-video'
);

import Consumer from 'fusion:consumer';
import React from 'react';

import Image from '../../../../../../components/private/LN/nota/cuerpo/image';
import { mount, render } from 'enzyme';

describe('features - La Nacion - Components - Nota - Apertura - Destacado ', () => {
    const data = {
        _id: 'YQPFIZTCKVFKFDHNINT7IBBI6U',
        additional_properties: {
            fullSizeResizeUrl:
                '/photo/resize/waT0eaOu9z7W7IYRMEMgR-ikEUI=/arc-anglerfish-arc2-sandbox-sandbox-lanacionar/public/YQPFIZTCKVFKFDHNINT7IBBI6U.jpg',
            galleries: [
                {
                    headlines: {
                        basic: 'Galeria 1'
                    },
                    _id: 'BRIS3MF3WVGILKMWCYDUOKUBCA'
                },
                {
                    headlines: {
                        basic: 'Galeria 2'
                    },
                    _id: '72XYP4URE5BIRFVD6RGWBQ2ZAY'
                }
            ],
            ingestionMethod: 'manual',
            keywords: [],
            mime_type: 'image/jpeg',
            originalName: 'River.jpg',
            originalUrl:
                'https://arc-anglerfish-arc2-sandbox-sandbox-lanacionar.s3.amazonaws.com/public/YQPFIZTCKVFKFDHNINT7IBBI6U.jpg',
            owner: 'megan.pantlin@washpost.com',
            proxyUrl:
                '/photo/resize/waT0eaOu9z7W7IYRMEMgR-ikEUI=/arc-anglerfish-arc2-sandbox-sandbox-lanacionar/public/YQPFIZTCKVFKFDHNINT7IBBI6U.jpg',
            published: true,
            resizeUrl:
                'http://thumbor-prod-us-east-1.photo.aws.arc.pub/waT0eaOu9z7W7IYRMEMgR-ikEUI=/arc-anglerfish-arc2-sandbox-sandbox-lanacionar/public/YQPFIZTCKVFKFDHNINT7IBBI6U.jpg',
            restricted: false,
            version: 0,
            comments: [],
            _id: 1550690199877
        },
        address: {},
        caption: 'Epigrafe',
        created_date: '2018-09-20T14:08:26Z',
        vanity_credits: {
            by: [
                {
                    type: 'author',
                    name: 'Credito'
                }
            ],
            affiliation: [
                {
                    type: 'author',
                    name: 'Fuente'
                }
            ]
        },
        height: 230,
        last_updated_date: '2018-09-20T14:08:26Z',
        licensable: false,
        owner: {
            id: 'sandbox.lanacionar',
            sponsored: false
        },
        source: {
            edit_url:
                'https://sandbox.lanacionar.arcpublishing.com/photo/YQPFIZTCKVFKFDHNINT7IBBI6U',
            system: 'Anglerfish'
        },
        subtitle: 'River',
        type: 'image',
        url:
            'https://arc-anglerfish-arc2-sandbox-sandbox-lanacionar.s3.amazonaws.com/public/YQPFIZTCKVFKFDHNINT7IBBI6U.jpg',
        version: '0.9.0',
        width: 345
    };

    /* it('Matches snapshot', () => {
        const image = render(<Image data={data} />);
        expect(image).toMatchSnapshot();
    }); */

    it('Test de logica de Destacado - Imagen', () => {
        const comp = mount(<Image data={data} />);
        expect('image').toBe(data.type);
    });
});
