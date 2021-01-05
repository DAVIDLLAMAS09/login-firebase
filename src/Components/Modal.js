import React from 'react';
import { Fragment } from 'react';
import {Modal,Button} from 'react-bootstrap'

function ModalComponent({handleClose,show,confirmacionEliminarProducto}) {
    return (
        <Fragment>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                <Modal.Title className="text-center">Eliminar Producto</Modal.Title>
                </Modal.Header>
                <Modal.Body className="text-center">
                    ¿Realmente deseas eliminar este producto?
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cancelar
                </Button>
                <Button variant="primary" onClick={confirmacionEliminarProducto}>Aceptar</Button>
                </Modal.Footer>
            </Modal>
        </Fragment>
    );
}

export default ModalComponent;