import React, { useState } from 'react';
import Consumer from 'fusion:consumer';
import PropTypes from 'fusion:prop-types';
import { GrillaNotasServer } from './components/GrillaNotasServer';
import { GrillaNotasClient } from './components/GrillaNotasClient';
import { LoadMoreButton } from './components/LoadMoreButton';
import buildCustomFieldsForBanners from '../grillaNotas/_helpers';
import Banner from '../../../private/LN/acumulado/grillaNotas/Banner';
import StaticContentV2 from '../../../chains/LN10-global/staticContentV2';
import useGridArticlesLN from './hooks/useGridArticles';
import BuildRoof from '../../../chains/utils/_BuildRoof/default';
import { useRoofData } from '../../../chains/utils/_helpers';

function GrillaNotasFeatureV2(props) {
    const {
        layout,
        isAdmin,
        globalContent,
        customFields,
        globalContentConfig,
        outputType
    } = props;

    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);

    const { _id: id, name } = globalContent;
    const isUltimasNoticias = id === '/ultimas-noticias';

    const { totalCount, hasMoreArticles } = useGridArticlesLN({
        id,
        page: currentPage
    });

    const clickMoreArticle = () => {
        setLoading(true);
        setCurrentPage(current => current + 1);
    };

    const showButton = totalCount > 30 && hasMoreArticles;

    const getBanner = Banner({
        customFields,
        globalContentConfig,
        outputType,
        globalContent
    });

    const roofData = useRoofData({
        ...customFields,
        isAdmin
    });

    return (
        <>
            <BuildRoof {...roofData} />
            <div className="flex flex-column gap-32">
                <div className="gradient-more-notes relative flex flex-column gap-16 gap-24_m gap-32_lg mb-32">
                    <StaticContentV2 id="grillaAcuServer">
                        <GrillaNotasServer
                            id={id}
                            layout={layout}
                            isUltimasNoticias={isUltimasNoticias}
                            getBanner={getBanner}
                            globalContent={globalContent}
                        />
                    </StaticContentV2>
                    <GrillaNotasClient
                        id={id}
                        layout={layout}
                        name={name}
                        isUltimasNoticias={isUltimasNoticias}
                        globalContent={globalContent}
                        currentPage={currentPage}
                        setLoading={setLoading}
                    />
                </div>
                {showButton && (
                    <LoadMoreButton
                        clickMoreArticle={clickMoreArticle}
                        loading={loading}
                        name={name}
                    />
                )}
            </div>
        </>
    );
}

GrillaNotasFeatureV2.label = 'LN-Acumulado-Grilla-NotasV2';

GrillaNotasFeatureV2.propTypes = {
    globalContent: PropTypes.shape({
        _id: PropTypes.string,
        name: PropTypes.string
    }).isRequired,
    layout: PropTypes.string.isRequired,
    customFields: PropTypes.shape({
        ...buildCustomFieldsForBanners(),
        title: PropTypes.string.tag({
            name: 'Texto',
            description: 'Ingrese aquí el título de la caja.',
            defaultValue: '',
            group: 'Techo'
        }),
        link: PropTypes.url.tag({
            label: 'Url',
            description:
                'Ingrese la url que redirige al hacer click al titulo. El formato debe empezar con https://',
            defaultValue: '',
            group: 'Techo'
        }),
        logoId: PropTypes.string.tag({
            name: 'Logo',
            description: 'Ingrese aquí el id de Photo Center de la imagen',
            defaultValue: '',
            group: 'Techo'
        }),
        hideTitle: PropTypes.boolean.tag({
            name: 'Ocultar techo',
            description: 'Marque para ocultar el techo',
            defaultValue: true,
            group: 'Techo'
        }),
        navigator: PropTypes.string.tag({
            name: 'Navegador',
            description:
                'Ingrese aquí el nombre de una navegación creada en site services',
            defaultValue: '',
            group: 'Techo'
        }),
        buttonLogo: PropTypes.string.tag({
            name: 'Logo Boton',
            description: 'Ingrese aquí el id del botón',
            defaultValue: '',
            group: 'Techo',
            hidden: false
        }),
        buttonText: PropTypes.string.tag({
            name: 'Texto del botón',
            description: 'Ingrese aquí el texto del botón',
            defaultValue: '',
            group: 'Techo',
            hidden: false
        }),
        linkButton: PropTypes.string.tag({
            name: 'Url del botón',
            description:
                'Ingrese la url que redirige al hacer click al botón. El formato debe empezar con https://',
            defaultValue: '',
            group: 'Techo',
            hidden: false
        })
    }).isRequired,
    outputType: PropTypes.string.isRequired,
    globalContentConfig: PropTypes.shape({
        query: PropTypes.shape({
            id: PropTypes.string
        })
    }).isRequired
};

export default Consumer(GrillaNotasFeatureV2);
