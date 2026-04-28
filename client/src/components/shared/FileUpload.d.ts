import React from "react";
export interface FileUploadProps {
    label?: string;
    onChange: (file: File | null) => void;
    value?: File | null;
    accept?: string;
    error?: string;
}
declare const FileUpload: React.FC<FileUploadProps>;
export default FileUpload;
