import React, { useEffect, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const SelectableModal = ({ show, onClose, title, options = [] }) => {
    const [selectedOption, setSelectedOption] = useState(() => {
        return localStorage.getItem('selectedOption') || options[0]?.label || '';
    });

    useEffect(() => {
        if (selectedOption) {
            localStorage.setItem('selectedOption', selectedOption);
        }
    }, [selectedOption]);

    const handleSelectChange = (event) => {
        const selectedValue = event.target.value;
        const selectedOptionObj = options.find(option => option.label === selectedValue);
        if (selectedOptionObj) {
            selectedOptionObj.onSelect();
            setSelectedOption(selectedValue);
        }
    };

    return (
        <Modal className='mt-5' show={show} onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Group controlId="selectNumberItems">
                    <Form.Label>Chọn để hiển thị:</Form.Label>
                    <Form.Control as="select" value={selectedOption} onChange={handleSelectChange}>
                        {options.map((option, index) => (
                            <option key={index} value={option.label}>
                                {option.label}
                            </option>
                        ))}
                    </Form.Control>
                </Form.Group>
            </Modal.Body>
        </Modal>
    );
};

export default SelectableModal;
