import React from 'react';
import { getEpigrafe } from '../../../../../components/layouts/LN-Nota-Liveblog_Editorial/_helpers/liveblogEditorialApertura';
import epigrafeAndCreditsData from '../../../../../components/private/common/utils/epigrafeAndCreditsData';

jest.mock(
    '../../../../../components/private/common/utils/epigrafeAndCreditsData'
);

describe('components - layouts - LN-Nota-Liveblog_Editorial - _helpers - liveblogEditorialApertura', () => {
    describe(getEpigrafe, () => {
        it('should return caption from videoJw epigraphTitle when subtype is video_jw', () => {
            const basic = {
                type: 'video',
                subtype: 'video_jw',
                embed: {
                    config: {
                        videoJw: {
                            epigraphTitle:
                                'GWM lanzó el Haval H6 HEV, el Jolion Pro HEV y el eléctrico ORA 03'
                        }
                    }
                }
            };

            const result = getEpigrafe(basic, undefined, true);
            expect(result).toEqual({
                caption: (
                    <span className="com-text --caption --twoxs">
                        GWM lanzó el Haval H6 HEV, el Jolion Pro HEV y el
                        eléctrico ORA 03
                    </span>
                ),
                credit: null
            });
        });

        it('should return caption from iframe when subtype is raw_html', () => {
            const basic = {
                _id: 'L6DSKOWTTVBO5NGJFE6ISKDCD4',
                content:
                    '<iframe width="640" height="360" src="https://www.youtube.com/embed/I0CJReSR3Rg" title="Real Madrid 1 x 2 Boca Juniors ● Final Intercontinental 2000 Resumen y Goles HD" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>',
                type: 'raw_html'
            };

            const dataIframe = {
                _id: 'JREVNUCVJZC2VJLUFGBDZBAWVQ',
                caption: 'Prueba iframe de la nota',
                created_date: '2025-05-20T11:16:03Z',
                height: 513,
                publish_date: '2025-05-20T08:10:03.5865857-03:00',
                url: 'https://sandbox-resizer.glanacion.com/resizer/v2/prueba-pie-de-JREVNUCVJZC2VJLUFGBDZBAWVQ.jpg?auth=7db50721fdd3a3caea984cc604de3e2041db93d6bccf6d3b7f57c2a299bc7237&width=768&quality=70&smart=false',
                width: 768
            };
            const result = getEpigrafe(basic, dataIframe);
            expect(result).toEqual({
                caption: (
                    <span className="com-text --caption --twoxs">
                        Prueba iframe de la nota
                    </span>
                ),
                credit: null
            });
        });

        it('should return caption and credit as React elements when type is "image"', () => {
            const basic = {
                type: 'image',
                caption: 'Prueba pie de foto'
            };

            epigrafeAndCreditsData.mockReturnValue('Crédito de la imagen');

            const result = getEpigrafe(basic);

            expect(result.caption).toBeTruthy();
            expect(result.caption.type).toBe('span');
            expect(result.caption.props.className).toContain('--caption');
            expect(result.caption.props.children).toBe('Prueba pie de foto');

            expect(result.credit).toBeTruthy();
            expect(result.credit.type).toBe('span');
            expect(result.credit.props.className).toContain('--credit');
            expect(result.credit.props.children).toBe('Crédito de la imagen');
        });
    });
});
