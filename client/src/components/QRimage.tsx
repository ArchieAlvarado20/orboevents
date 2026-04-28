import { useEffect, useState } from "react";
import jsQR from "jsqr";

export default function QRPasteScanner() {
  const [message, setMessage] = useState("");
  const [imagePreview, setImagePreview] = useState("");

  useEffect(() => {
    const handlePaste = async (event: ClipboardEvent) => {
      const items = event.clipboardData?.items;
      if (!items) return;

      for (const item of items) {
        if (item.type.startsWith("image/")) {
          const file = item.getAsFile();
          if (!file) return;

          const reader = new FileReader();

          reader.onload = async () => {
            const img = new Image();

            img.onload = async () => {
              const canvas = document.createElement("canvas");
              const ctx = canvas.getContext("2d");
              if (!ctx) return;

              canvas.width = img.width;
              canvas.height = img.height;

              ctx.drawImage(img, 0, 0);

              const imageData = ctx.getImageData(
                0,
                0,
                canvas.width,
                canvas.height,
              );

              const code = jsQR(
                imageData.data,
                imageData.width,
                imageData.height,
              );

              if (!code) {
                setMessage("No QR detected");
                return;
              }

              try {
                const data = JSON.parse(code.data);

                const res = await fetch(
                  "http://localhost:5000/api/tickets/verify",
                  {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                      Authorization:
                        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5ZTljNjdkYTcwNzBiOGI4OTc3MjBjMSIsImVtYWlsIjoiYWRtaW4xQGdtYWlsLmNvbSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTc3NjkyODQwMSwiZXhwIjoxNzc3MDE0ODAxfQ._YJmM5HtUrOeiMaxt3sKg7cdKo8fayMd7WS3OJr01no",
                    },
                    body: JSON.stringify({
                      qrToken: data.qrToken,
                    }),
                  },
                );

                const response = await res.json();
                setMessage(response.message);
              } catch {
                setMessage("Invalid QR format");
              }
            };

            img.src = reader.result as string;
            setImagePreview(reader.result as string);
          };

          reader.readAsDataURL(file);
        }
      }
    };

    window.addEventListener("paste", handlePaste);

    return () => window.removeEventListener("paste", handlePaste);
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h2>📋 Paste QR Scanner</h2>

      <p>👉 Press CTRL + V to paste QR image</p>

      {imagePreview && (
        <img src={imagePreview} style={{ width: 250, marginTop: 10 }} />
      )}

      <p
        style={{
          color: message.includes("allowed") ? "green" : "red",
          fontWeight: "bold",
        }}
      >
        {message}
      </p>
    </div>
  );
}
