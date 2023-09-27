import React, { useEffect, useState } from 'react';
import { Modal as ModalFoodit } from '@ln/foodit-ui-modal';
import SaveRecipe from './saveRecipe';

export const Modal = () => {
    const [modalData, setModalData] = useState({});
    const [showModal, setShowModal] = useState(false);
    const [indexStep, setIndexStep] = useState(1);
    const [selectedFolder, setSelectedFolder] = useState('Elegir carpeta');
    const [newFolder, setNewFolder] = useState('');

    // TODO: Tomar valores de la API cuando se haga click en el select
    const [folders, setFolders] = useState([
        'Para los martes',
        'Para los jueves',
        'Para los viernes'
    ]);

    useEffect(() => {
        const handleData = data => {
            setModalData(data);
            setShowModal(true);
            document.querySelector('body').classList.add('overflow-hidden');
        };
        const closeModal = () => {
            setShowModal(false);
        };
        window.LN.observable.subscribe('openModal', handleData);
        window.LN.observable.subscribe('closeModal', closeModal);

        return () => {
            window.LN.observable.unsubscribe('openModal', handleData);
            window.LN.observable.unsubscribe('closeModal', closeModal);
        };
    }, []);

    const close = () => {
        window.LN.observable.publish('closeModal');
        setSelectedFolder('Elegir carpeta');
        setNewFolder('');
        setIndexStep(1);
        document.querySelector('body').classList.remove('overflow-hidden');
        setShowModal(false);
    };
    const { ids = [] } = modalData;
    return (
        <ModalFoodit
            classNameModal="bg-light-1 rounded-24 h-fit p-24 flex gap-8_md"
            classNameWrapper="px-16"
            id="modal-save"
            show={showModal}
            onClose={() => close()}
        >
            <SaveRecipe
                ids={ids}
                indexStep={indexStep}
                setIndexStep={setIndexStep}
                selectedFolder={selectedFolder}
                setSelectedFolder={setSelectedFolder}
                newFolder={newFolder}
                setNewFolder={setNewFolder}
                folders={folders}
                setFolders={setFolders}
                close={close}
            />
        </ModalFoodit>
    );
};

export default Modal;
