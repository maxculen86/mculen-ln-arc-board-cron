import React, { useState } from 'react';
import '../../../../resources/dist/css/ln/components/delete-note.css';
import Text from '../text';
import Icon from '../icon';
import ComButtom from '../com-button';
import ModalBody from './ModalBody';

const DeleteNote = () => {
    const [showModal, setShowModal] = useState(true);
    const handleClose = () => {
        setShowModal(false);
    };
    return (
        <>
            {showModal && (
                <ModalBody className="modal">
                    <div className="delete-note">
                        <ComButtom
                            onClick={handleClose}
                            iconName="close"
                            title="Cerrar"
                        />
                        <div className="alert-failed-container">
                            <Icon name="alert-failed" />
                        </div>
                        <Text size="medium" font="sueca" weight="bold">
                            Borrar nota guardada
                        </Text>
                        <Text size="2xs">
                            La nota se eliminará del listado.
                        </Text>
                        <div className="buttons-container">
                            <ComButtom
                                onClick={handleClose}
                                textname="cancelar"
                                size="5xs"
                                classCondition="--secondary"
                            />
                            <ComButtom
                                textname="borrar nota"
                                size="5xs"
                                classCondition="--primary"
                            />
                        </div>
                    </div>
                </ModalBody>
            )}
        </>
    );
};

export default DeleteNote;
