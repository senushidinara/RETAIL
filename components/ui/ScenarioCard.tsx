import React from 'react';

interface ScenarioCardProps {
    title: string;
    userPrompt: string;
    aiResponseItems: { icon: string; text: string }[];
    outcome: string;
    outcomeColor: 'green' | 'cyan';
}

const colorClasses = {
    green: 'text-emerald-300 bg-emerald-500/15 border border-emerald-500/30',
    cyan: 'text-cyan-300 bg-cyan-500/15 border border-cyan-500/30',
};

export const ScenarioCard: React.FC<ScenarioCardProps> = ({ title, userPrompt, aiResponseItems, outcome, outcomeColor }) => {
    return (
        <div className="bg-gradient-to-br from-slate-800/40 to-slate-900/40 border border-cyan-500/15 rounded-2xl p-7 flex flex-col backdrop-blur-sm hover:border-cyan-500/25 transition-all duration-300 shadow-lg shadow-cyan-500/5 hover:shadow-cyan-500/10 group">
            <h3 className="text-2xl font-bold text-white mb-5 group-hover:text-cyan-300 transition-colors duration-300">{title}</h3>

            <div className="mb-5">
                <p className="text-xs font-bold text-cyan-400/70 mb-2 uppercase tracking-wide">User Prompt:</p>
                <p className="text-slate-200 italic bg-gradient-to-br from-slate-800/50 to-slate-900/30 p-4 rounded-xl text-sm border border-cyan-500/10">"{userPrompt}"</p>
            </div>

            <div className="mb-5">
                <p className="text-xs font-bold text-cyan-400/70 mb-3 uppercase tracking-wide">AI Response:</p>
                <ul className="space-y-2">
                    {aiResponseItems.map((item, index) => (
                        <li key={index} className="flex items-start gap-3 p-2">
                            <span className="text-lg">{item.icon}</span>
                            <span className="text-slate-300 text-sm">{item.text}</span>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="mt-auto pt-5">
                 <p className="text-xs font-bold text-cyan-400/70 mb-2 uppercase tracking-wide">Outcome:</p>
                 <p className={`font-bold text-center p-3 rounded-xl text-sm ${colorClasses[outcomeColor]}`}>
                    {outcome}
                </p>
            </div>
        </div>
    );
};
