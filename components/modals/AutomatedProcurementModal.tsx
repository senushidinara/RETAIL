import React from 'react';
import { Modal } from '../ui/Modal';
import { ProcurementSimulator } from '../interactive/ProcurementSimulator';

interface AutomatedProcurementModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const AutomatedProcurementModal: React.FC<AutomatedProcurementModalProps> = ({ isOpen, onClose }) => {
    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="Automated Procurement Agent"
            size="2xl"
        >
            <p className="text-slate-400 mb-6 text-lg">
                This simulation demonstrates how an AI agent can autonomously monitor inventory levels, predict demand, and place orders with suppliers to prevent stockouts and optimize cash flow.
            </p>
            <ProcurementSimulator />
        </Modal>
    );
};
