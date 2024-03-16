import { onSuccessHandler } from "@/utils/inertia";
import { useForm } from "@inertiajs/react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

export interface Props {
    url: string;
    modalTitle?: string;
    modalBody?: string;
    successMessage?: string;
}
export default function DeleteButton({
    url,
    modalTitle = "Delete resource",
    modalBody = "Are you sure you want to delete this resource?",
    successMessage = "Resource deleted successfully!",
}: Props): JSX.Element {
    const [show, setShow] = useState(false);
    const { delete: destroy } = useForm();

    const handleCancel = () => setShow(false);
    const handleSubmit = () => {
        destroy(url, {
            onSuccess: onSuccessHandler(successMessage),
        });
    };
    const handleShow = () => setShow(true);

    return (
        <>
            <Button variant="danger" onClick={handleShow} size="sm">
                Delete
            </Button>

            <Modal show={show} onHide={handleCancel}>
                <Modal.Header closeButton>
                    <Modal.Title>{modalTitle}</Modal.Title>
                </Modal.Header>
                <Modal.Body>{modalBody}</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCancel}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={handleSubmit}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
