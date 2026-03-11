/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import { useAppContext } from 'fusion:context';
import { Button } from '@ln/contenidos-ui-button';
import { Icon } from '@ln/common-ui-icon';
import { Text } from '@ln/contenidos-ui-text';
import IconSprite from '../../../features/private-global/common/iconSprite/IconSprite';
import getAssetsPath from '../utils/getAssetsPath';
import ModalBody from '../ModalBody';
import Accordion from '../accordion';
import ComLink from '../com-link';
import ComImage from '../com-image';

function HelperBookmark({ show = false, handleHelper = () => {} }) {
    const { contextPath, deployment } = useAppContext();
    const placeholder =
        getAssetsPath(contextPath)(deployment)('empty-bookmark.png');

    return (
        show && (
            <ModalBody className="flex-end">
                <section className="helper-bookmark flex flex-column relative bg-light-50 p-24 h-100vh">
                    <div className="flex jc-between ai-center border border-thin border-bottom border-light-300 mb-24 pb-16">
                        <Text as="h3" className="--font-primary --font-black">
                            Guardar notas
                        </Text>
                        <Button
                            onClick={handleHelper}
                            title="Cerrar"
                            size="inherit"
                            iconOnly
                        >
                            <Icon size={24}>
                                <IconSprite name="close" />
                            </Icon>
                        </Button>
                    </div>
                    <div className="helper-main relative --twoxs">
                        <Text as="p" className="mb-24">
                            Desde esta página vas a poder acceder a las notas
                            que guardaste en la aplicación y el sitio web de LA
                            NACION. Seleccioná una opción para obtener más
                            información:.
                        </Text>
                        <Accordion text="Guardar / Dejar de guardar una nota">
                            <Text as="p">
                                Para guardar una nota, presioná el botón{' '}
                                <strong>
                                    Guardar{' '}
                                    <Icon size={16}>
                                        <IconSprite name="bookmark" />
                                    </Icon>
                                </strong>{' '}
                                en la lista de herramientas debajo del título de
                                la nota:
                            </Text>
                            <div className="placeholder-bookmark">
                                <ComImage
                                    src={placeholder}
                                    alt="Bookmark vacio"
                                />
                            </div>
                            <Text as="p">
                                Para dejar de guardar, volvé a presionar el
                                botón{' '}
                                <strong>
                                    Guardar{' '}
                                    <Icon size={16}>
                                        <IconSprite name="bookmarkFilled" />
                                    </Icon>
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
                                    Guardar{' '}
                                    <Icon size={16}>
                                        <IconSprite name="bookmark" />
                                    </Icon>
                                    .
                                </strong>
                            </Text>
                        </Accordion>
                        <Accordion text="Acceder a&nbsp;<strong>Mis Notas - guardadas</strong>">
                            <Text as="p">
                                Podes acceder a tus notas guardadas en la
                                siguiente ubicación:
                            </Text>
                            <ul className="--list-inherit pl-16">
                                <li>
                                    <ComLink
                                        link="https://www.lanacion.com.ar/mis-notas/"
                                        title="Ir a Mis notas - Guardadas"
                                        textname="Mis notas - Guardadas"
                                        classCondition="--font-bold"
                                    />
                                </li>
                                <li>
                                    También podés encontrar el acceso en el menú
                                    de tu usuario
                                </li>
                            </ul>
                        </Accordion>
                    </div>
                </section>
            </ModalBody>
        )
    );
}

export default HelperBookmark;
