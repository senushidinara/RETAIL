import React from 'react';
import { ScenarioCard } from '../ui/ScenarioCard';

export const ProcurementSimulator: React.FC = () => {
    return (
        <ScenarioCard
            title="Scenario: Low Stock Detected"
            userPrompt="System detects 'Ergonomic Office Chairs' are at 10% of safety stock levels, with sales velocity increasing."
            aiResponseItems={[
                { icon: '📊', text: 'Analyzes sales data, predicts stockout in 7 days.' },
                { icon: '🚚', text: 'Identifies primary and secondary suppliers with available stock.' },
                { icon: '📝', text: 'Generates a purchase order for 200 units from the most cost-effective supplier.' },
                { icon: '✅', text: 'Sends PO for human approval (or auto-approves based on rules).' },
            ]}
            outcome="Inventory is replenished before stockout occurs, capturing all potential sales."
            outcomeColor="green"
        />
    );
};
