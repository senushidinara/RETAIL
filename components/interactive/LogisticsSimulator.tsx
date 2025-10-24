import React from 'react';
import { ScenarioCard } from '../ui/ScenarioCard';

export const LogisticsSimulator: React.FC = () => {
    return (
        <ScenarioCard
            title="Scenario: Port Disruption"
            userPrompt="System alert: Port of Los Angeles is closed due to a strike. 5 containers are en route."
            aiResponseItems={[
                { icon: '🗺️', text: 'Instantly recalculates routes for all affected shipments.' },
                { icon: '🚢', text: 'Diverts 3 containers to the Port of Oakland and 2 to Tacoma.' },
                { icon: '🚚', text: 'Pre-books ground transportation from the new ports to the distribution center.' },
                { icon: '🔔', text: 'Updates delivery ETAs for all affected orders and notifies stakeholders.' },
            ]}
            outcome="Potential 2-week delay is reduced to an average of 48 hours, preventing major stockouts."
            outcomeColor="green"
        />
    );
};
