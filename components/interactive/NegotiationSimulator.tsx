import React from 'react';
import { ScenarioCard } from '../ui/ScenarioCard';

export const NegotiationSimulator: React.FC = () => {
    return (
        <ScenarioCard
            title="Scenario: Bulk Purchase Negotiation"
            userPrompt="Procurement agent initiates negotiation for 10,000 units of 'Model X Laptops' with a target price of $750/unit."
            aiResponseItems={[
                { icon: '💬', text: 'Agent opens secure channel with supplier bot.' },
                { icon: '📉', text: 'Counters initial offer of $820 with market data and competitor pricing.' },
                { icon: '📦', text: 'Negotiates for faster shipping as a value-add when price hits a floor.' },
                { icon: '🤝', text: 'Secures a final price of $765/unit with expedited 2-day shipping.' },
            ]}
            outcome="Achieves a 6.7% price reduction and improved logistics, saving $550,000 on the order."
            outcomeColor="cyan"
        />
    );
};
