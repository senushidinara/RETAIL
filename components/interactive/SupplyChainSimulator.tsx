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
        <div className="bg-gradient-to-br from-slate-800/40 to-slate-900/40 border border-cyan-500/15 rounded-2xl p-10 backdrop-blur-sm shadow-lg shadow-cyan-500/5">
            <h3 className="text-3xl font-bold bg-gradient-to-r from-cyan-300 via-blue-300 to-cyan-400 bg-clip-text text-transparent mb-3 text-center">Supply Chain Crisis Simulator</h3>
            <p className="text-slate-300 mb-8 text-center max-w-2xl mx-auto text-sm">
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
                    className="w-full bg-gradient-to-br from-slate-800/60 to-slate-800/40 border border-cyan-500/30 text-slate-100 rounded-xl p-4 text-sm focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 focus:outline-none transition-all duration-300 placeholder-slate-500 resize-none"
                />
                <div className="text-center mt-3 mb-5">
                    <button
                        onClick={() => setScenario(exampleScenario)}
                        className="text-xs font-semibold text-cyan-300 hover:text-cyan-200 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 hover:from-cyan-500/30 hover:to-blue-500/30 px-5 py-2 rounded-full border border-cyan-500/40 transition-all duration-300"
                    >
                        Try Example
                    </button>
                </div>
                 <button
                    onClick={handleGeneratePlan}
                    disabled={isLoading || !scenario.trim()}
                    className="w-full flex items-center justify-center gap-3 p-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold hover:shadow-lg hover:shadow-cyan-500/40 disabled:bg-slate-600 disabled:cursor-not-allowed transition-all duration-300 text-sm uppercase tracking-wide"
                >
                    {isLoading ? <><LoadingSpinner /> Generating Plan...</> : <><ZapIcon className="w-5 h-5" /> Generate Contingency Plan</>}
                </button>
                {error && <p className="text-rose-400 text-center mt-4 text-sm font-medium">{error}</p>}
            </div>

            {isLoading && !plan && (
                 <div className="text-center mt-10 text-slate-400">
                    <p className="text-sm">Running simulations and formulating response strategies...</p>
                </div>
            )}

            {plan && (
                 <div className="mt-10 p-8 bg-gradient-to-br from-slate-800/40 to-slate-900/40 rounded-2xl border border-cyan-500/15">
                    <h4 className="text-2xl font-bold bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent mb-6 text-center">{plan.planTitle}</h4>
                    <ul className="space-y-4">
                        {plan.steps.map((step) => (
                            <li key={step.step} className="flex items-start gap-5 p-6 bg-gradient-to-br from-slate-800/50 to-slate-900/30 rounded-xl border border-cyan-500/10 hover:border-cyan-500/20 hover:bg-slate-800/70 transition-all duration-300">
                                <div className="text-3xl mt-1 flex-shrink-0">{step.icon}</div>
                                <div className="flex-1">
                                    <p className="font-bold text-white text-base">Step {step.step}: {step.action}</p>
                                    <p className="text-sm text-slate-300 mt-2">{step.rationale}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};
