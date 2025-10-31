import React, { useState, useRef } from 'react';
import { TabHeader } from '../ui/TabHeader';
import { editImageWithPrompt } from '../../services/geminiService';
import { LoadingSpinner } from '../icons/LoadingSpinner';
import { WandSparklesIcon } from '../icons/WandSparklesIcon';
import { UploadCloudIcon } from '../icons/UploadCloudIcon';
import { XIcon } from '../icons/XIcon';

const fileToGenerativePart = async (file: File) => {
    const base64EncodedDataPromise = new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            if (typeof reader.result === 'string') {
                resolve(reader.result.split(',')[1]);
            }
        };
        reader.readAsDataURL(file);
    });
    return {
        base64: await base64EncodedDataPromise,
        mimeType: file.type
    };
};

export const ImageStudioTab: React.FC = () => {
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [prompt, setPrompt] = useState('');
    const [editedImageUrl, setEditedImageUrl] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImageFile(file);
            setPreviewUrl(URL.createObjectURL(file));
            setEditedImageUrl(null);
        }
    };

    const handleEditImage = async () => {
        if (!imageFile || !prompt.trim()) return;

        setIsLoading(true);
        setError(null);
        setEditedImageUrl(null);

        try {
            const { base64, mimeType } = await fileToGenerativePart(imageFile);
            const editedBase64 = await editImageWithPrompt(base64, mimeType, prompt);
            setEditedImageUrl(`data:${mimeType};base64,${editedBase64}`);
        } catch (e) {
            setError((e as Error).message || 'An unknown error occurred.');
        } finally {
            setIsLoading(false);
        }
    };
    
    const clearImage = () => {
        setImageFile(null);
        setPreviewUrl(null);
        setEditedImageUrl(null);
        if(fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    }

    return (
        <div className="h-full flex flex-col gap-8">
            <TabHeader
                image="https://cdn.builder.io/api/v1/image/assets%2Fb3ca505f4755410ca1f128143966e5c6%2F1c7481a8d19e4df78caf6f0e5c123930?format=webp"
                title="Image Studio"
                description="Instantly edit product photos, create marketing assets, or generate new visual concepts with simple text prompts."
            />
            <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-8 flex-grow">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div>
                        <h3 className="text-2xl font-bold text-white mb-4">1. Upload your Image</h3>
                        <div 
                            className="relative border-2 border-dashed border-slate-600 rounded-xl p-8 text-center flex flex-col items-center justify-center h-64 cursor-pointer hover:border-cyan-500 hover:bg-slate-800 transition-colors"
                            onClick={() => fileInputRef.current?.click()}
                        >
                            <UploadCloudIcon className="w-12 h-12 text-slate-400 mb-2" />
                            <p className="text-slate-300">
                                {imageFile ? `Selected: ${imageFile.name}` : 'Click or drag & drop to upload'}
                            </p>
                            <p className="text-xs text-slate-500">PNG, JPG, WEBP up to 4MB</p>
                            <input
                                ref={fileInputRef}
                                type="file"
                                accept="image/png, image/jpeg, image/webp"
                                className="hidden"
                                onChange={handleFileChange}
                            />
                        </div>
                        {previewUrl && (
                             <button onClick={clearImage} className="mt-2 text-sm text-rose-400 hover:text-rose-300 flex items-center gap-1">
                                <XIcon className="w-4 h-4" /> Clear Image
                            </button>
                        )}
                        <h3 id="describe-edit-label" className="text-2xl font-bold text-white mt-8 mb-4">2. Describe your Edit</h3>
                        <textarea
                            aria-labelledby="describe-edit-label"
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                            placeholder="e.g., 'Change the background to a sunny beach' or 'Add a birthday hat on the cat'"
                            rows={3}
                            className="w-full bg-slate-800 border border-slate-700 text-slate-200 rounded-lg p-3 text-lg focus:ring-2 focus:ring-cyan-500 focus:outline-none transition"
                        />
                        <button
                            onClick={handleEditImage}
                            disabled={isLoading || !imageFile || !prompt.trim()}
                            className="w-full flex items-center justify-center gap-3 mt-4 p-3 rounded-lg bg-cyan-600 text-white font-semibold hover:bg-cyan-500 disabled:bg-slate-600 disabled:cursor-not-allowed transition-colors text-lg"
                        >
                            {isLoading ? <><LoadingSpinner /> Generating...</> : <><WandSparklesIcon className="w-5 h-5" /> Generate Image</>}
                        </button>
                         {error && <p className="text-rose-400 text-center mt-4">{error}</p>}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <h3 className="text-xl font-semibold text-slate-300 mb-2 text-center">Original</h3>
                            <div className="aspect-square bg-slate-800 rounded-lg flex items-center justify-center">
                                {previewUrl ? <img src={previewUrl} alt="Original preview" className="max-w-full max-h-full object-contain rounded-lg" /> : <p className="text-slate-500">Upload an image</p>}
                            </div>
                        </div>
                        <div>
                            <h3 className="text-xl font-semibold text-slate-300 mb-2 text-center">Edited</h3>
                            <div className="aspect-square bg-slate-800 rounded-lg flex items-center justify-center">
                                {isLoading && <LoadingSpinner />}
                                {!isLoading && editedImageUrl && <img src={editedImageUrl} alt="Edited result" className="max-w-full max-h-full object-contain rounded-lg" />}
                                {!isLoading && !editedImageUrl && !error && <p className="text-slate-500">Your edited image will appear here</p>}
                                {!isLoading && error && <p className="text-rose-400 text-sm p-4 text-center">Image generation failed.</p>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
