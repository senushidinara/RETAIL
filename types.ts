
export interface ChatMessage {
    sender: 'user' | 'ai';
    content: string;
}

export interface AnniversarySuggestion {
    title: string;
    description: string;
    icon?: string;
}

export interface OfficeSupply {
    item: string;
    details: string;
    icon?: string;
}

export interface EmergencyItem {
    item: string;
    status: string;
    icon?: string;
}

export interface ShoppingResults {
    anniversary: AnniversarySuggestion[];
    office: OfficeSupply[];
    emergency: EmergencyItem[];
}

export interface MoodAnalysisResult {
    detectedMood: string;
    explanation: string;
    suggestions: {
        icon: string;
        productName: string;
        reason: string;
    }[];
}

export interface TrendForecast {
    trendName: string;
    description: string;
    confidence: number;
}

export interface ContingencyPlan {
    planTitle: string;
    steps: {
        step: number;
        icon: string;
        action: string;
        rationale: string;
    }[];
}

export interface SourcingStrategy {
    strategies: {
        option: string;
        icon: string;
        details: string;
        priority: 'High' | 'Medium' | 'Low';
    }[];
}