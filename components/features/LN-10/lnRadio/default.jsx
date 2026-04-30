import React from 'react';
import PropTypes from 'fusion:prop-types';
import { useAppContext } from 'fusion:context';
import Static from 'fusion:static';
import Button from '../../ui/ln/button/default';
import Icon from '../../ui/ln/icon/default';
import Divider from '../../ui/ln/divider/default';
import { DEFAULT_VARIANT, shouldHideLnRadio, logoImage } from './_helpers';
import { containerClassname, buttonClassname, titleClassname } from './styles';

function LnRadio({ id: featureId, customFields }) {
    const { contextPath, deployment, isAdmin } = useAppContext() || {};
    const {
        enabledDays = [],
        shouldSchedule = false,
        variant
    } = customFields || {};

    if (shouldHideLnRadio({ isAdmin, enabledDays, shouldSchedule }))
        return null;

    const logoPath = logoImage[variant] || logoImage[DEFAULT_VARIANT];
    const logoDeploymentPath = deployment(`${contextPath}${logoPath}`);

    return (
        <Static id={featureId}>
            <div data-tw>
                <div className="w-full mt-72 pt-24 border-t border-neutral-950">
                    <div className={containerClassname({ variant })}>
                        <div className="flex gap-16 items-center z-10">
                            <img
                                src={logoDeploymentPath}
                                alt="Imagen de radio"
                                className="h-48 md:h-71"
                            />
                            <span className={titleClassname({ variant })}>
                                El mundo necesita más música
                            </span>
                        </div>
                        <Button
                            title="Ir a escuchar más música"
                            className={buttonClassname({ variant })}
                            textTransform="uppercase"
                            variant="ghost"
                            rounded="custom"
                            color="custom"
                            size="custom"
                            asChild
                        >
                            <a
                                href="https://masmusica.lanacion.com.ar/"
                                target="_blank"
                                rel="noreferrer"
                            >
                                Escuchá + música
                                <Icon
                                    size={20}
                                    className="hidden md:block"
                                    name="play-filled"
                                />
                            </a>
                        </Button>
                    </div>
                    <Divider />
                </div>
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
