import { GoogleGenAI, Type, Modality } from "@google/genai";
import type { ShoppingResults, MoodAnalysisResult, TrendForecast, ContingencyPlan, SourcingStrategy } from '../types';

let aiInstance: GoogleGenAI | null = null;

function getAIInstance(): GoogleGenAI {
    if (!aiInstance) {
        const apiKey = process.env.API_KEY;
        if (!apiKey) {
            throw new Error("Google Gemini API key is not configured. Please add API_KEY to your .env file.");
        }
        aiInstance = new GoogleGenAI({ apiKey });
    }
    return aiInstance;
}

export async function getShoppingSuggestions(prompt: string): Promise<ShoppingResults> {
    const ai = getAIInstance();
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: `Parse the following user request and provide shopping suggestions for each context. The user request is: "${prompt}"`,
        config: {
            responseMimeType: "application/json",
            responseSchema: {
                type: Type.OBJECT,
                properties: {
                    anniversary: {
                        type: Type.ARRAY,
                        description: "Suggestions for anniversary gifts.",
                        items: {
                            type: Type.OBJECT,
                            properties: {
                                title: { type: Type.STRING, description: "Title of the gift suggestion." },
                                description: { type: Type.STRING, description: "Description of the gift." },
                                icon: { type: Type.STRING, description: "An emoji representing the gift." }
                            },
                            required: ['title', 'description', 'icon']
                        }
                    },
                    office: {
                        type: Type.ARRAY,
                        description: "List of office supplies to order.",
                        items: {
                            type: Type.OBJECT,
                            properties: {
                                item: { type: Type.STRING, description: "Name of the office supply." },
                                details: { type: Type.STRING, description: "Details about the order (e.g., quantity, type)." },
                                icon: { type: Type.STRING, description: "An emoji representing the item." }
                            },
                            required: ['item', 'details', 'icon']
                        }
                    },
                    emergency: {
                        type: Type.ARRAY,
                        description: "Status of emergency supply orders.",
                        items: {
                            type: Type.OBJECT,
                            properties: {
                                item: { type: Type.STRING, description: "Name of the emergency item." },
                                status: { type: Type.STRING, description: "Current status of the order." },
                                icon: { type: Type.STRING, description: "An emoji representing the status." }
                            },
                            required: ['item', 'status', 'icon']
                        }
                    }
                }
            }
        }
    });

    try {
        const jsonText = response.text.trim();
        const json = JSON.parse(jsonText);
        return {
            anniversary: json.anniversary || [],
            office: json.office || [],
            emergency: json.emergency || [],
        };
    } catch (e) {
        console.error("Failed to parse JSON from Gemini:", response.text);
        throw new Error("Failed to get shopping suggestions.");
    }
}

export async function editImageWithPrompt(base64: string, mimeType: string, prompt: string): Promise<string> {
    const ai = getAIInstance();
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: {
            parts: [
                {
                    inlineData: {
                        data: base64,
                        mimeType: mimeType,
                    },
                },
                {
                    text: prompt,
                },
            ],
        },
        config: {
            responseModalities: [Modality.IMAGE],
        },
    });

    for (const part of response.candidates[0].content.parts) {
        if (part.inlineData) {
            return part.inlineData.data;
        }
    }
    throw new Error('No image was generated.');
}

export async function analyzeMoodAndSuggestProducts(text: string): Promise<MoodAnalysisResult> {
    const ai = getAIInstance();
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: `Analyze the mood of the following text and suggest 3 relevant products. Text: "${text}"`,
        config: {
            responseMimeType: "application/json",
            responseSchema: {
                type: Type.OBJECT,
                properties: {
                    detectedMood: { type: Type.STRING, description: "The primary mood detected in the text." },
                    explanation: { type: Type.STRING, description: "A brief explanation for why this mood was chosen." },
                    suggestions: {
                        type: Type.ARRAY,
                        description: "A list of 3 product suggestions.",
                        items: {
                            type: Type.OBJECT,
                            properties: {
                                icon: { type: Type.STRING, description: "An emoji for the product." },
                                productName: { type: Type.STRING, description: "The name of the suggested product." },
                                reason: { type: Type.STRING, description: "Why this product is a good suggestion for the detected mood." }
                            },
                            required: ['icon', 'productName', 'reason']
                        }
                    }
                },
                required: ['detectedMood', 'explanation', 'suggestions']
            }
        }
    });

    try {
        const jsonText = response.text.trim();
        return JSON.parse(jsonText);
    } catch (e) {
        console.error("Failed to parse JSON from Gemini:", response.text, e);
        throw new Error("Failed to analyze mood. The AI returned an invalid format.");
    }
}

export async function forecastProductTrend(category: string, season: string): Promise<TrendForecast> {
    const ai = getAIInstance();
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-pro',
        contents: `Forecast a single viral product trend for the category "${category}" during the "${season}" season. Provide a catchy name, a description, and a confidence score.`,
        config: {
            responseMimeType: "application/json",
            responseSchema: {
                type: Type.OBJECT,
                properties: {
                    trendName: { type: Type.STRING, description: "A catchy name for the predicted trend." },
                    description: { type: Type.STRING, description: "A detailed description of the trend." },
                    confidence: { type: Type.NUMBER, description: "A confidence score from 0 to 100." }
                },
                required: ['trendName', 'description', 'confidence']
            }
        }
    });

    try {
        const jsonText = response.text.trim();
        return JSON.parse(jsonText);
    } catch (e) {
        console.error("Failed to parse JSON from Gemini:", response.text, e);
        throw new Error("Failed to forecast trend. The AI returned an invalid format.");
    }
}

export async function generateContingencyPlan(scenario: string): Promise<ContingencyPlan> {
    const ai = getAIInstance();
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-pro',
        contents: `Given the following supply chain crisis scenario, create a high-level 3-step contingency plan. Scenario: "${scenario}"`,
        config: {
            responseMimeType: "application/json",
            responseSchema: {
                type: Type.OBJECT,
                properties: {
                    planTitle: { type: Type.STRING, description: "A title for the contingency plan." },
                    steps: {
                        type: Type.ARRAY,
                        description: "An array of 3 steps for the plan.",
                        items: {
                            type: Type.OBJECT,
                            properties: {
                                step: { type: Type.INTEGER, description: "The step number (1, 2, or 3)." },
                                icon: { type: Type.STRING, description: "An emoji representing the step." },
                                action: { type: Type.STRING, description: "The title of the action for this step." },
                                rationale: { type: Type.STRING, description: "A brief rationale for this action." }
                            },
                            required: ['step', 'icon', 'action', 'rationale']
                        }
                    }
                },
                required: ['planTitle', 'steps']
            }
        }
    });
    
    try {
        const jsonText = response.text.trim();
        return JSON.parse(jsonText);
    } catch (e) {
        console.error("Failed to parse JSON from Gemini:", response.text, e);
        throw new Error("Failed to generate a contingency plan. The AI returned an invalid format.");
    }
}

export async function findEmergencySourcing(item: string, location: string): Promise<SourcingStrategy> {
    const ai = getAIInstance();
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-pro',
        contents: `We have a critical shortage of "${item}" at our "${location}". Generate 3 diverse, actionable emergency sourcing strategies with different priority levels (High, Medium, Low).`,
        config: {
            responseMimeType: "application/json",
            responseSchema: {
                type: Type.OBJECT,
                properties: {
                    strategies: {
                        type: Type.ARRAY,
                        description: "An array of 3 sourcing strategies.",
                        items: {
                            type: Type.OBJECT,
                            properties: {
                                option: { type: Type.STRING, description: "The name of the sourcing option." },
                                icon: { type: Type.STRING, description: "An emoji representing the option." },
                                details: { type: Type.STRING, description: "Details about this sourcing strategy." },
                                priority: { type: Type.STRING, enum: ['High', 'Medium', 'Low'], description: "Priority level: 'High', 'Medium', or 'Low'." }
                            },
                            required: ['option', 'icon', 'details', 'priority']
                        }
                    }
                },
                required: ['strategies']
            }
        }
    });

    try {
        const jsonText = response.text.trim();
        return JSON.parse(jsonText);
    } catch(e) {
        console.error("Failed to parse JSON from Gemini:", response.text, e);
        throw new Error("Failed to find sourcing strategies. The AI returned an invalid format.");
    }
}
