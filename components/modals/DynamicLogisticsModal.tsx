import React from 'react';
import { Modal } from '../ui/Modal';
import { LogisticsSimulator } from '../interactive/LogisticsSimulator';

interface DynamicLogisticsModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const DynamicLogisticsModal: React.FC<DynamicLogisticsModalProps> = ({ isOpen, onClose }) => {
    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="Dynamic Logistics Agent"
            size="2xl"
        >
            <p className="text-slate-400 mb-6 text-lg">
                This agent continuously optimizes shipping routes in real-time. Here, it responds to an unexpected port closure by rerouting shipments to minimize delays and costs.
            </p>
            <LogisticsSimulator />
        </Modal>
    );
};
