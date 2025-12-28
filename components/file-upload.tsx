"use client";

import { UploadButton } from "@/lib/uploadthing";
import { X } from "lucide-react";

interface FileUploadProps {
    endpoint: "imageUploader";
    value: string;
    onChange: (url?: string) => void;
}

export const FileUpload = ({ endpoint, value, onChange }: FileUploadProps) => {
    if (value) {
        return (
            <div className="relative h-20 w-20">
                <img
                    src={value}
                    alt="Upload"
                    className="rounded-full object-cover h-full w-full border border-white/10"
                />
                <button
                    onClick={() => onChange("")}
                    className="bg-red-500 text-white p-1 rounded-full absolute top-0 right-0 shadow-sm hover:bg-red-600 transition-colors"
                    type="button"
                >
                    <X className="h-3 w-3" />
                </button>
            </div>
        );
    }

    return (
        <UploadButton
            endpoint={endpoint}
            onClientUploadComplete={(res) => {
                onChange(res?.[0].url);
            }}
            onUploadError={(error: Error) => {
                console.error(error);
            }}
            appearance={{
                button: "bg-white/10 text-white hover:bg-white/20 text-xs font-bold uppercase tracking-widest px-4 py-2 border border-white/10 rounded-none transition-all",
                allowedContent: "text-zinc-500 text-[9px] uppercase tracking-widest mt-2"
            }}
        />
    );
};
