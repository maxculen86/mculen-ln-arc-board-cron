import React from 'react';
import Consumer from 'fusion:consumer';
import BreadcrumbCustomFoodit from '../../features/foodit-global/common/breadcrumb/_childrens/BreadcrumbCustom/foodit';
import BaseLayout from '../../features/foodit-global/common/BaseLayout/foodit';
import { Text } from '@ln/common-ui-text';
import AuthorCard from '../../features/foodit-global/common/authorCard/foodit';

const pageBuilderSections = ['Apertura', 'Notas'];

const AcumuladoChefFoodit = props => {
    // TODO: aliminar mock cuando se traiga la data
    const cardAuthorMock = [
        {
            name: 'Narda Lepes',
            href: '#',
            imageProps: {
                src:
                    'https://telefe-static.akamaized.net/media/18108854/01-jurados_narda.jpg?width=600&height=500&mode=crop&anchor=top'
            }
        },
        {
            name: 'Dolli Beatriz Irigoyen Fontaine',
            href: '#',
            imageProps: {
                src:
                    'https://genealogiafamiliar.net//GF-datos/photos/Dolli%20Irigoyen.jpg'
            }
        },
        {
            name: 'Ariel Rodríguez Palacios',
            href: '#',
            imageProps: {
                src:
                    'https://i.pinimg.com/736x/38/30/7d/38307d2095c3335737003ade2b514994.jpg'
            }
        },
        {
            name: 'Damian Betular',
            href: '#',
            imageProps: {
                src:
                    'https://www.lanacion.com.ar/resizer/v2/damian-KZ4TWK4RKBDFZMW4D4JGKR7FEI.jpg?auth=5ce3d2b77f8811180cd9b82ec060e2a9d7cda33927a4650c928db3a386f0dc41&width=420&height=630&quality=70&smart=true'
            }
        },
        {
            name: 'Donato de Santis',
            href: '#',
            imageProps: {
                src:
                    'https://www.lanacion.com.ar/resizer/v2/OVUKNWMN7RC4DJOTHMHIFX2WWY.jpg?auth=b7bc624a253af03a48c6e20a07df6941adbfebe7a9d0e0413db8f9c491fe8498&width=420&height=280&quality=70&smart=true'
            }
        },
        {
            name: 'Mauro Colagreco',
            href: '#',
            imageProps: {
                src:
                    'https://upload.wikimedia.org/wikipedia/commons/f/f9/Mauro_Colagreco.png'
            }
        },
        {
            name: 'German Martitegui',
            href: '#',
            imageProps: {
                src:
                    'https://telefe-static.akamaized.net/media/18229370/tlf_mc3_digital_carrouselpartis_martitegui-1.jpg?width=600&height=500&mode=crop&anchor=top'
            }
        },
        {
            name: 'Osvaldo Gross',
            href: '#',
            imageProps: {
                src:
                    'https://resizer.glanacion.com/resizer/v2/L4NNAGBD35GWNC2C25IST23L2U.jpg?auth=eded416d4db48f10cf0879c3049229d2ead519ae649f237a820904445345eec1&width=420&height=580&quality=70&smart=true'
            }
        },
        {
            name: 'Julieta Oriolo',
            href: '#',
            imageProps: {
                src:
                    'https://www.cucinare.tv/wp-content/uploads/2022/10/Oriolo-1024x576.jpg'
            }
        },
        {
            name: 'Yamila Di Renzo',
            href: '#',
            imageProps: {
                src:
                    'https://www.alacarta.com.uy/wp-content/gallery/yamila-di-renzo-de-alos/Yamila-Di-Renzo.jpg'
            }
        }
    ];

    return (
        <BaseLayout>
            <div className="flex flex-column gap-32">
                <section className="flex flex-column gap-24">
                    <BreadcrumbCustomFoodit
                        sectionsCustom={[
                            {
                                name: 'Chef protagonistas',
                                url: '/acumulado-chef/'
                            }
                        ]}
                    />
                    <Text
                        as="h1"
                        className="prumo prumo-semibold text-28 text-40_md text-48_lg floating-button-sentinel"
                    >
                        Chef protagonistas
                    </Text>
                </section>
                <section className="grid grid-cols-8 grid-cols-12_md grid-cols-16_lg gap-32">
                    {cardAuthorMock.map(({ name, href, imageProps }) => (
                        <AuthorCard
                            key={name}
                            href={href}
                            name={name}
                            imageProps={imageProps}
                        />
                    ))}
                </section>
            </div>
        </BaseLayout>
    );
};

AcumuladoChefFoodit.sections = pageBuilderSections;

export default Consumer(AcumuladoChefFoodit);
