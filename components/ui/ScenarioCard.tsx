import React from 'react';

interface ScenarioCardProps {
    title: string;
    userPrompt: string;
    aiResponseItems: { icon: string; text: string }[];
    outcome: string;
    outcomeColor: 'green' | 'cyan';
}

const colorClasses = {
    green: 'text-green-400 bg-green-500/10',
    cyan: 'text-cyan-400 bg-cyan-500/10',
};

export const ScenarioCard: React.FC<ScenarioCardProps> = ({ title, userPrompt, aiResponseItems, outcome, outcomeColor }) => {
    return (
        <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-6 flex flex-col">
            <h3 className="text-2xl font-semibold text-slate-100 mb-4">{title}</h3>
            
            <div className="mb-4">
                <p className="text-sm font-medium text-slate-400 mb-1">User Prompt:</p>
                <p className="text-slate-300 italic bg-slate-800 p-3 rounded-lg text-base">"{userPrompt}"</p>
            </div>

            <div className="mb-4">
                <p className="text-sm font-medium text-slate-400 mb-2">AI Response:</p>
                <ul className="space-y-2">
                    {aiResponseItems.map((item, index) => (
                        <li key={index} className="flex items-start gap-3">
                            <span className="text-xl">{item.icon}</span>
                            <span className="text-slate-300 text-base">{item.text}</span>
                        </li>
                    ))}
                </ul>
            </div>
            
            <div className="mt-auto pt-4">
                 <p className="text-sm font-medium text-slate-400 mb-1">Outcome:</p>
                 <p className={`font-semibold text-center p-2 rounded-md text-base ${colorClasses[outcomeColor]}`}>
                    {outcome}
                </p>
            </div>
        </div>
    );
};