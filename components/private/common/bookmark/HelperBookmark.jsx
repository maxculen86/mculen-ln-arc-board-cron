/* eslint-disable react/jsx-one-expression-per-line */
import React, { useState } from 'react';
import Text from '../text';
import ModalBody from './ModalBody';
import ComButton from '../com-button';
import ModheaderSection from '../mod-headerSection';
import ListItem from './ListItem';
import ComLink from '../com-link';

const HelperBookmark = () => {
    const [showHelper, setShowHelper] = useState(true);
    const handleClose = () => {
        setShowHelper(false);
    };

    return (
        <>
            {showHelper && (
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
                                onClick={handleClose}
                                iconName="close"
                                title="Cerrar"
                            />
                        </div>
                        <div className="helper-main">
                            <Text tag="p">
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
                            <ListItem text="Guardar/Desguardar notas">
                                <Text tag="p">
                                    Para guardar una nota, presioná el botón
                                    <strong>Guardar [icono]</strong> en la lista
                                    de herramientas debajo del título de la
                                    nota:
                                </Text>
                                <div>svg</div>
                                <Text tag="p">
                                    Para dejar de guardar una nota, debes volver
                                    a presionar el botón{' '}
                                    <strong>Guardar [icono]</strong> o ir al
                                    listado de notas guardadas en{' '}
                                    <strong>Mis notas - Guardadas</strong> y
                                    presionar el botón{' '}
                                    <strong>Guardar [icono].</strong>
                                </Text>
                            </ListItem>
                            <ListItem text="Acceso a Mis Notas - guardadas">
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
                            </ListItem>
                            <ListItem text="Compartir notas guardadas">
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
                                        <strong>Mis notas - Guardadas</strong>,
                                        presionando en el botón{' '}
                                        <strong>Compartir [icono]</strong>.
                                    </li>
                                </ul>
                            </ListItem>
                        </div>
                    </section>
                </ModalBody>
            )}
        </>
    );
};

HelperBookmark.propTypes = {};
HelperBookmark.defaultProps = {};

export default HelperBookmark;
