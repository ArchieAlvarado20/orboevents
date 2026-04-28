import { useEffect, useRef, useState } from "react";
import { BrowserMultiFormatReader } from "@zxing/browser";
import QRCode from "qrcode";

type Controls = {
  stop: () => void;
};

export default function QRScanner() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [message, setMessage] = useState("");
  const [scanned, setScanned] = useState(false);

  // 👉 FOR MANUAL QR TEST
  const [inputToken, setInputToken] = useState("aL-xupmP6pCCk266vGKJr");
  const [qrImage, setQrImage] = useState("");

  // SCANNER
  useEffect(() => {
    if (!videoRef.current) return;

    const codeReader = new BrowserMultiFormatReader();

    let controls: Controls | null = null;

    codeReader
      .decodeFromVideoDevice(undefined, videoRef.current, async (result) => {
        if (result && !scanned) {
          setScanned(true);

          try {
            const data = JSON.parse(result.getText());

            const res = await fetch(
              "http://localhost:5000/api/tickets/verify",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: "Bearer YOUR_ADMIN_TOKEN",
                },
                body: JSON.stringify({
                  qrToken: data.qrToken,
                }),
              },
            );

            const response = await res.json();
            setMessage(response.message);
          } catch {
            setMessage("Invalid QR");
          }
        }
      })
      .then((ctrl) => (controls = ctrl));

    return () => {
      controls?.stop();
    };
  }, []);

  // 👉 MANUAL QR GENERATOR
  const generateQR = async () => {
    const data = {
      qrToken: inputToken,
    };

    const qr = await QRCode.toDataURL(JSON.stringify(data));
    setQrImage(qr);
  };

  return (
    <div>
      <h2>QR Scanner</h2>

      {/* SCANNER */}
      <video ref={videoRef} style={{ width: 300 }} />

      <p>{message}</p>

      <button onClick={() => setScanned(false)}>Scan Again</button>

      <hr />

      {/* MANUAL TEST SECTION */}
      <h3>Manual QR Test</h3>

      <input
        type="text"
        placeholder="Enter qrToken"
        value={inputToken}
        onChange={(e) => setInputToken(e.target.value)}
      />

      <button onClick={generateQR}>Generate QR</button>

      {qrImage && (
        <div>
          <img src={qrImage} alt="QR Code" style={{ width: 200 }} />
        </div>
      )}
    </div>
  );
}
