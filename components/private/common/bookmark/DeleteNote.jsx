import React, { useState } from 'react';
import Text from '../text';
import Icon from '../icon';
import ComButton from '../com-button';
import ModalBody from './ModalBody';
import '../../../../resources/dist/css/ln/components/delete-note.css';

const DeleteNote = () => {
    const [showModal, setShowModal] = useState(true);
    const handleClose = () => {
        setShowModal(false);
    };
    return (
        <>
            {showModal && (
                <ModalBody className="modal-body">
                    <div className="delete-note">
                        <ComButton
                            onClick={handleClose}
                            iconName="close"
                            title="Cerrar"
                        />
                        <div className="icon-container">
                            <Icon name="alert" />
                        </div>
                        <Text size="medium" font="sueca" weight="bold">
                            Borrar nota guardada
                        </Text>
                        <Text size="2xs">
                            La nota se eliminará del listado.
                        </Text>
                        <div className="buttons-container">
                            <ComButton
                                onClick={handleClose}
                                textname="cancelar"
                                size="5xs"
                                classCondition="--secondary"
                            />
                            <ComButton
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
