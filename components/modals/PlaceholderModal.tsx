import React from 'react';
import { Modal } from '../ui/Modal';

interface PlaceholderModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const PlaceholderModal: React.FC<PlaceholderModalProps> = ({ isOpen, onClose }) => {
    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="Feature Not Implemented"
        >
            <div className="text-center">
                <p className="text-slate-300">This feature is currently under development.</p>
                <p className="text-slate-400 mt-2">Please check back later!</p>
                <button
                    onClick={onClose}
                    className="mt-6 bg-cyan-600 text-white font-semibold px-6 py-2 rounded-lg hover:bg-cyan-500 transition-colors"
                >
                    Close
                </button>
            </div>
        </Modal>
    );
};
