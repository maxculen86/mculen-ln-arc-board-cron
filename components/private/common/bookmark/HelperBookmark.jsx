/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import PropTypes from 'fusion:prop-types';
import { useAppContext } from 'fusion:context';
import getAssetsPath from '../utils/getAssetsPath';
import Text from '../text';
import ModalBody from './ModalBody';
import ComButton from '../com-button';
import ModheaderSection from '../mod-headerSection';
import Accordion from '../accordion';
import ComLink from '../com-link';
import Icon from '../icon';

const HelperBookmark = ({ show, handleHelper }) => {
    const { contextPath, deployment } = useAppContext();
    const placeholder = getAssetsPath(contextPath)(deployment)(
        'empty-bookmark.png'
    );

    return (
        <>
            {show && (
                <ModalBody className="flex-end">
                    <section className="helper-bookmark">
                        <div className="helper-header">
                            <ModheaderSection
                                tag="h3"
                                size="m"
                                weight="bold"
                                font="--sueca"
                                title="Guardar notas"
                                line
                            />
                            <ComButton
                                onClick={handleHelper}
                                iconName="close"
                                title="Cerrar"
                            />
                        </div>
                        <div className="helper-main --twoxs">
                            <Text tag="p" extraClass="--italic">
                                Aprendé a guardar y compartir notas de LA NACION
                            </Text>
                            <Text tag="p">
                                Vas a poder acceder a las notas guardadas en
                                nuestras aplicaciones móviles y en el sitio web
                                de LA NACION.
                            </Text>
                            <Text tag="p">
                                Solo se pueden guardar y compartir notas de
                                nuestro portal. Los enlaces multimedia, como
                                imagenes y videos, no se pueden compartir en
                                este momento.
                            </Text>
                            <Text tag="p">
                                Seleccioná una opción a continuación para
                                obtener más información:
                            </Text>
                            <Accordion text="Guardar/Desguardar notas">
                                <Text tag="p">
                                    Para guardar una nota, presioná el botón{' '}
                                    <strong>
                                        Guardar <Icon name="bookmark" />
                                    </strong>{' '}
                                    en la lista de herramientas debajo del
                                    título de la nota:
                                </Text>
                                <div className="placeholder-bookmark">
                                    <img
                                        src={placeholder}
                                        alt="Bookmark vacio"
                                    />
                                </div>
                                <Text tag="p">
                                    Para dejar de guardar una nota, debes volver
                                    a presionar el botón{' '}
                                    <strong>
                                        Guardar <Icon name="bookmark" />
                                    </strong>{' '}
                                    o ir al listado de notas guardadas en{' '}
                                    <strong>Mis notas - Guardadas</strong> y
                                    presionar el botón{' '}
                                    <strong>
                                        Guardar <Icon name="bookmark" />.
                                    </strong>
                                </Text>
                            </Accordion>
                            <Accordion text="Acceso a&nbsp;<strong>Mis Notas - guardadas</strong>">
                                <Text tag="p">
                                    Podes acceder a tus notas guardadas en la
                                    siguiente ubicación:
                                </Text>
                                <ul>
                                    <li>
                                        El listado{' '}
                                        <strong>Mis notas - Guardadas</strong>,
                                        ubicada en el desplegable del nombre de
                                        usuario de tu cuenta, en la parte
                                        superior derecha de cualquier página de
                                        lanacion.com.ar
                                    </li>
                                    <li>
                                        Tu lista directa de{' '}
                                        <strong>Mis notas - Guardadas</strong>{' '}
                                        visitando{' '}
                                        <ComLink
                                            link="https:/lanacion.com.ar/mis-notas/guardadas"
                                            textname="lanacion.com.ar/mis-notas/guardadas"
                                        />{' '}
                                        para ver su lista completa con las notas
                                        guardadas
                                    </li>
                                </ul>
                            </Accordion>
                            <Accordion text="Compartir notas guardadas">
                                <Text tag="p">
                                    Podés compartir el enlace de cualquier nota
                                    de tu lista de{' '}
                                    <strong>Mis Notas - Guardadas</strong>.
                                    Actualmente, las notas se pueden compartir
                                    por WhatsApp, Facebook, Twitter, Correo
                                    electrónico o, bien, copiar el link de la
                                    nota.
                                </Text>
                                <ul>
                                    <li>
                                        Podés compartir una nota a través de
                                        WhatsApp, Facebook, Twitter, etc.
                                        directamente desde la barra de
                                        herramientas de la nota.
                                    </li>
                                    <li>
                                        Podés compartir una nota guardada, desde
                                        <strong> Mis notas - Guardadas</strong>,
                                        presionando en el botón{' '}
                                        <strong>
                                            Compartir <Icon name="share" />
                                        </strong>
                                        .
                                    </li>
                                </ul>
                            </Accordion>
                        </div>
                    </section>
                </ModalBody>
            )}
        </>
    );
};

HelperBookmark.propTypes = {
    show: PropTypes.boolean,
    handleHelper: PropTypes.func
};
HelperBookmark.defaultProps = {
    show: false,
    handleHelper: () => {}
};

export default HelperBookmark;
