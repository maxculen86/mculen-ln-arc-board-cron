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
import ComImage from '../com-image';

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
                            <Text tag="p">
                                Desde esta página vas a poder acceder a las
                                notas que guardaste en la aplicación y el sitio
                                web de LA NACION. Seleccioná una opción para
                                obtener más información:.
                            </Text>
                            <Accordion text="Guardar / Dejar de guardar una nota">
                                <Text tag="p">
                                    Para guardar una nota, presioná el botón{' '}
                                    <strong>
                                        Guardar <Icon name="bookmark" />
                                    </strong>{' '}
                                    en la lista de herramientas debajo del
                                    título de la nota:
                                </Text>
                                <div className="placeholder-bookmark">
                                    <ComImage
                                        src={placeholder}
                                        alt="Bookmark vacio"
                                    />
                                </div>
                                <Text tag="p">
                                    Para dejar de guardar, volvé a presionar el
                                    botón{' '}
                                    <strong>
                                        Guardar <Icon name="bookmark-filled" />
                                    </strong>{' '}
                                    o ir al listado de notas guardadas en{' '}
                                    <ComLink
                                        link="https://www.lanacion.com.ar/mis-notas/"
                                        title="Ir a Mis notas - Guardadas"
                                        textname="Mis notas - Guardadas"
                                        classCondition="--font-bold"
                                    />{' '}
                                    y presionar el botón{' '}
                                    <strong>
                                        Guardar <Icon name="bookmark" />.
                                    </strong>
                                </Text>
                            </Accordion>
                            <Accordion text="Acceder a&nbsp;<strong>Mis Notas - guardadas</strong>">
                                <Text tag="p">
                                    Podes acceder a tus notas guardadas en la
                                    siguiente ubicación:
                                </Text>
                                <ul>
                                    <li>
                                        <ComLink
                                            link="https://www.lanacion.com.ar/mis-notas/"
                                            title="Ir a Mis notas - Guardadas"
                                            textname="Mis notas - Guardadas"
                                            classCondition="--font-bold"
                                        />
                                    </li>
                                    <li>
                                        También podés encontrar el acceso en el
                                        menú de tu usuario
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
