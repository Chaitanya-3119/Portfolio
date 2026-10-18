"use client";

import { useState, useRef, ChangeEvent, DragEvent } from "react";
import { Upload, X, ExternalLink, Loader2, Image as ImageIcon } from "lucide-react";

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  label?: string;
  folder?: string;
  placeholder?: string;
  required?: boolean;
}

export default function ImageUpload({
  value,
  onChange,
  label = "Image",
  folder = "portfolio",
  placeholder = "https://res.cloudinary.com/... or upload below",
  required = false,
}: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (file: File) => {
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Please select a valid image file (PNG, JPG, WebP, etc.).");
      return;
    }

    // 10 MB limit
    if (file.size > 10 * 1024 * 1024) {
      setError("Image size must be less than 10MB.");
      return;
    }

    setError(null);
    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", folder);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || data.error || "Failed to upload image");
      }

      onChange(data.url);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Upload failed";
      setError(msg);
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const onFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFileUpload(file);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleFileUpload(file);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
      {label && (
        <label
          style={{
            display: "block",
            fontSize: "0.75rem",
            color: "#a0a0b8",
            textTransform: "uppercase",
            letterSpacing: "0.05em",
            fontWeight: 600,
          }}
        >
          {label} {required && <span style={{ color: "#ff6b6b" }}>*</span>}
        </label>
      )}

      {/* URL Input Bar */}
      <div style={{ display: "flex", gap: "8px" }}>
        <input
          type="text"
          value={value || ""}
          onChange={(e) => {
            setError(null);
            onChange(e.target.value);
          }}
          placeholder={placeholder}
          style={{
            flex: 1,
            padding: "10px 14px",
            borderRadius: "8px",
            border: "1px solid rgba(255, 255, 255, 0.12)",
            background: "rgba(18, 18, 24, 0.6)",
            color: "#fff",
            fontSize: "0.875rem",
            outline: "none",
          }}
        />

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={onFileChange}
          style={{ display: "none" }}
        />

        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={isUploading}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            padding: "8px 14px",
            borderRadius: "8px",
            border: "1px solid rgba(99, 102, 241, 0.4)",
            background: "rgba(99, 102, 241, 0.15)",
            color: "#a5b4fc",
            fontSize: "0.85rem",
            fontWeight: 500,
            cursor: isUploading ? "not-allowed" : "pointer",
            transition: "all 0.2s ease",
            whiteSpace: "nowrap",
          }}
        >
          {isUploading ? (
            <>
              <Loader2 size={16} className="animate-spin" />
              <span>Uploading...</span>
            </>
          ) : (
            <>
              <Upload size={16} />
              <span>Upload to Cloudinary</span>
            </>
          )}
        </button>
      </div>

      {/* Drag & Drop Zone (if no image or drag active) */}
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={() => fileInputRef.current?.click()}
        style={{
          border: `1px dashed ${
            isDragging ? "#6366f1" : "rgba(255, 255, 255, 0.15)"
          }`,
          borderRadius: "8px",
          padding: "14px",
          textAlign: "center",
          cursor: "pointer",
          background: isDragging
            ? "rgba(99, 102, 241, 0.08)"
            : "rgba(255, 255, 255, 0.02)",
          transition: "all 0.2s ease",
        }}
      >
        <p style={{ margin: 0, fontSize: "0.78rem", color: "#8e8ea0" }}>
          Drop image file here or <span style={{ color: "#818cf8", textDecoration: "underline" }}>browse</span> to upload via Cloudinary
        </p>
      </div>

      {/* Error message */}
      {error && (
        <p
          style={{
            margin: "2px 0 0",
            fontSize: "0.75rem",
            color: "#f87171",
            lineHeight: 1.4,
          }}
        >
          ⚠️ {error}
        </p>
      )}

      {/* Image Preview */}
      {value && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            padding: "8px 12px",
            background: "rgba(255, 255, 255, 0.03)",
            border: "1px solid rgba(255, 255, 255, 0.08)",
            borderRadius: "8px",
            marginTop: "2px",
          }}
        >
          <div
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "6px",
              overflow: "hidden",
              background: "#181820",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={value}
              alt="Preview"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
              onError={(e) => {
                (e.currentTarget as HTMLElement).style.display = "none";
              }}
            />
            <ImageIcon size={20} style={{ color: "#555", display: "none" }} />
          </div>

          <div style={{ flex: 1, minWidth: 0 }}>
            <p
              style={{
                margin: 0,
                fontSize: "0.78rem",
                color: "#e2e8f0",
                textOverflow: "ellipsis",
                overflow: "hidden",
                whiteSpace: "nowrap",
              }}
            >
              {value}
            </p>
            <span style={{ fontSize: "0.7rem", color: "#64748b" }}>
              {value.includes("cloudinary") ? "Hosted on Cloudinary" : "External URL"}
            </span>
          </div>

          <div style={{ display: "flex", gap: "6px" }}>
            <a
              href={value}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                width: "28px",
                height: "28px",
                borderRadius: "6px",
                color: "#94a3b8",
                background: "rgba(255, 255, 255, 0.05)",
                textDecoration: "none",
              }}
              title="Open full size"
            >
              <ExternalLink size={14} />
            </a>
            <button
              type="button"
              onClick={() => {
                onChange("");
                setError(null);
              }}
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                width: "28px",
                height: "28px",
                borderRadius: "6px",
                color: "#f87171",
                background: "rgba(239, 68, 68, 0.1)",
                border: "none",
                cursor: "pointer",
              }}
              title="Remove image"
            >
              <X size={14} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
