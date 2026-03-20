import React from 'react';
import PropTypes from 'fusion:prop-types';
import { useAppContext } from 'fusion:context';
import { Icon } from '@ln/common-ui-icon';
import { Button } from '@ln/contenidos-ui-button';
import { Adaptableimage } from '@ln/common-ui-adaptableimage';
import Static from 'fusion:static';
import IconSprite from '../../private-global/common/iconSprite/IconSprite';
import { shouldHideLnRadio } from './_helpers';

function LnRadio({ id: featureId, customFields }) {
    const { contextPath, deployment, isAdmin } = useAppContext() || {};
    const { enabledDays = [], shouldSchedule = false } = customFields || {};

    if (shouldHideLnRadio({ isAdmin, enabledDays, shouldSchedule }))
        return null;

    const path = `${contextPath}/resources/images/ln-radio.webp`;
    const deploymentPath = deployment(path);

    return (
        <Static id={featureId}>
            <div className="mt-72 pt-24 border border-top border-thin border-neutral-light-900">
                <div className="flex ai-center jc-between pb-16">
                    <div className="flex gap-16 ai-center text-20">
                        <Adaptableimage
                            src={deploymentPath}
                            alt="Imagen de radio"
                            height={71}
                        />
                        <span className="sm-none text-neutral-light-900">
                            El mundo necesita más música
                        </span>
                    </div>
                    <Button
                        title="Ir a escuchar más música"
                        className="uppercase bg-neutral-light-999 rounded-80 text-ln-radio text-12"
                        variant="custom"
                        href="https://masmusica.lanacion.com.ar/"
                        target="_blank"
                    >
                        Escuchá + música
                        <Icon size={20} className="sm-none">
                            <IconSprite name="mediaPlay" />
                        </Icon>
                    </Button>
                </div>
                <hr className="w-100" />
            </div>
        </Static>
    );
}

LnRadio.label = 'LN10 Radio';

LnRadio.propTypes = {
    customFields: PropTypes.shape({
        shouldSchedule: PropTypes.bool.tag({
            name: 'Activar Calendarización',
            description:
                'Marque para mostrar en los días configurados. Desmarque para mostrar todos los días.',
            defaultValue: false
        }),
        enabledDays: PropTypes.list.tag({
            name: 'Días habilitados',
            description:
                'Ingrese los días de la semana en los que se desea mostrar la promoción (en minúsculas, sin tildes, ej: "miercoles")',
            defaultValue: []
        }),
        variant: PropTypes.oneOf([
            'fondo-negro',
            'fondo-blanco',
            'fondo-amarillo'
        ]).tag({
            name: 'Variante',
            defaultValue: 'fondo-blanco',
            labels: {
                'fondo-negro': 'Fondo negro',
                'fondo-blanco': 'Fondo blanco',
                'fondo-amarillo': 'Fondo amarillo'
            }
        })
    }).isRequired
};

export default LnRadio;
