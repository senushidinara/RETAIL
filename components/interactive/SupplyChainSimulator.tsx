import React, { useState } from 'react';
import { generateContingencyPlan } from '../../services/geminiService';
import type { ContingencyPlan } from '../../types';
import { LoadingSpinner } from '../icons/LoadingSpinner';
import { ZapIcon } from '../icons/ZapIcon';

const exampleScenario = "A key microchip factory in Taiwan is shut down due to an earthquake, impacting our electronics production line.";

export const SupplyChainSimulator: React.FC = () => {
    const [scenario, setScenario] = useState('');
    const [plan, setPlan] = useState<ContingencyPlan | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleGeneratePlan = async () => {
        if (!scenario.trim()) return;
        setIsLoading(true);
        setError(null);
        setPlan(null);
        try {
            const result = await generateContingencyPlan(scenario);
            setPlan(result);
        } catch (e) {
            setError((e as Error).message || 'An unknown error occurred.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-8">
            <h3 className="text-3xl font-bold text-white mb-4 text-center">Supply Chain Crisis Simulator</h3>
            <p className="text-slate-400 mb-6 text-center max-w-2xl mx-auto text-lg">
                Describe a potential supply chain disruption to instantly generate a high-level contingency plan.
            </p>

            <div className="max-w-3xl mx-auto">
                <label htmlFor="crisis-scenario-input" className="sr-only">Describe a crisis scenario...</label>
                 <textarea
                    id="crisis-scenario-input"
                    value={scenario}
                    onChange={(e) => setScenario(e.target.value)}
                    placeholder="Describe a crisis scenario..."
                    rows={3}
                    className="w-full bg-slate-800 border border-slate-700 text-slate-200 rounded-lg p-3 text-lg focus:ring-2 focus:ring-cyan-500 focus:outline-none transition"
                />
                <div className="text-center mt-2 mb-4">
                    <button
                        onClick={() => setScenario(exampleScenario)}
                        className="text-sm text-cyan-400 hover:text-cyan-300 bg-slate-800/50 px-3 py-1 rounded-full border border-slate-700 transition-colors"
                    >
                        Try Example
                    </button>
                </div>
                 <button
                    onClick={handleGeneratePlan}
                    disabled={isLoading || !scenario.trim()}
                    className="w-full flex items-center justify-center gap-3 p-3 rounded-lg bg-cyan-600 text-white font-semibold hover:bg-cyan-500 disabled:bg-slate-600 disabled:cursor-not-allowed transition-colors text-lg"
                >
                    {isLoading ? <><LoadingSpinner /> Generating Plan...</> : <><ZapIcon className="w-5 h-5" /> Generate Contingency Plan</>}
                </button>
                {error && <p className="text-rose-400 text-center mt-4">{error}</p>}
            </div>

            {isLoading && !plan && (
                 <div className="text-center mt-8 text-slate-400">
                    <p>Running simulations and formulating response strategies...</p>
                </div>
            )}

            {plan && (
                 <div className="mt-8 p-6 bg-slate-900/50 rounded-lg border border-slate-700">
                    <h4 className="text-2xl font-bold text-cyan-400 mb-4 text-center">{plan.planTitle}</h4>
                    <ul className="space-y-4">
                        {plan.steps.map((step) => (
                            <li key={step.step} className="flex items-start gap-4 p-4 bg-slate-800 rounded-lg">
                                <div className="text-2xl mt-1">{step.icon}</div>
                                <div>
                                    <p className="font-semibold text-slate-200 text-lg">Step {step.step}: {step.action}</p>
                                    <p className="text-base text-slate-400">{step.rationale}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};