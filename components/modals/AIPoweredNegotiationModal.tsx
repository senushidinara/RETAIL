import React from 'react';
import { Modal } from '../ui/Modal';
import { NegotiationSimulator } from '../interactive/NegotiationSimulator';

interface AIPoweredNegotiationModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const AIPoweredNegotiationModal: React.FC<AIPoweredNegotiationModalProps> = ({ isOpen, onClose }) => {
    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="AI-Powered Negotiation Agent"
            size="2xl"
        >
            <p className="text-slate-400 mb-6 text-lg">
                Watch how an AI negotiation agent interacts with a supplier's system to secure better terms for a bulk purchase, considering factors like price, delivery time, and quality.
            </p>
            <NegotiationSimulator />
        </Modal>
    );
};
