import React from 'react';
import { render } from '@testing-library/react';
import getProperties from 'fusion:properties';
import '@testing-library/jest-dom';
import GetDataToLinkImage from '../../../../../../components/private/common/utils/image/getDataToLinkImage';
import useGetMediaApertura from '../../../../../../components/private/common/utils/image/getDataToLinkImage/_helper/_homeHelper';
import dataAperturaFocalLeft from '../../../../../../__mocks__/data/renderables/dataAperturaFocalLeft.json';

jest.mock(
    '../../../../../../components/private/common/utils/image/getDataToLinkImage/_helper/_homeHelper',
    () => jest.fn()
);

describe('Common - GetDataToLinkImage - Diagramation Exceptions', () => {
    it('Should preload both first and second article images for exception diagramation', () => {
        useGetMediaApertura.mockReturnValue([
            {
                resizedUrl:
                    'https://sandbox.lanacion.com.ar/resizer/v2/el-diputado-nacional-german-FUOVF3J6WFEXRODLRDBCYAN5CM.jpeg?auth=b66a5be776d40ad01120170b2b0898cc148926c246a8b8bea62ed5e016dd6d0e&width=488&height=325&quality=70&smart=true',
                media: '(min-width: 768px)',
                option: {
                    height: 325,
                    media_preload: '(min-width: 768px)',
                    minScreenWidth: 768,
                    proportion: '3:2',
                    width: 488
                }
            },
            {
                resizedUrl:
                    'https://sandbox.lanacion.com.ar/resizer/v2/el-diputado-nacional-german-FUOVF3J6WFEXRODLRDBCYAN5CM.jpeg?auth=b66a5be776d40ad01120170b2b0898cc148926c246a8b8bea62ed5e016dd6d0e&width=420&height=280&quality=70&smart=true',
                media: '(max-width: 767px)',
                option: {
                    height: 280,
                    media_preload: '(max-width: 767px)',
                    proportion: '3:2',
                    width: 420
                }
            },
            {
                resizedUrl:
                    'https://sandbox.lanacion.com.ar/resizer/v2/erupcion-de-volcan-P5F3UOWWCJGJLBZ36TRRRBEYEQ.jpeg?auth=7839033e1cbf7a9c9fb91484859b505663958c39d34253e392477e9ac5b525a8&width=302&height=201&quality=70&smart=true',
                media: '(min-width: 1024px)',
                option: {
                    height: 201,
                    media_preload: '(min-width: 1024px)',
                    proportion: '3:2',
                    width: 302
                }
            }
        ]);

        render(
            <GetDataToLinkImage
                {...{
                    data: {},
                    section: 'home',
                    renderables: dataAperturaFocalLeft
                }}
            />
        );

        const linksPreload = document.head.querySelectorAll(
            'link[rel="preload"][as="image"]'
        );
        expect(linksPreload).toHaveLength(3);
        expect(linksPreload[0].getAttribute('href')).toContain(
            'el-diputado-nacional-german'
        );
        expect(linksPreload[2].getAttribute('href')).toContain(
            'erupcion-de-volcan'
        );
        expect(linksPreload).toMatchSnapshot();
    });

    it('should render an empty fragment when useGetMediaApertura returns no data', () => {
        useGetMediaApertura.mockReturnValue([]);

        const { container } = render(
            <GetDataToLinkImage
                {...{
                    data: {},
                    section: 'home',
                    renderables: []
                }}
            />
        );

        const linksPreload = container.querySelectorAll('link');
        expect(linksPreload).toHaveLength(0);
        expect(container).toMatchInlineSnapshot(`<div />`);
    });
});
