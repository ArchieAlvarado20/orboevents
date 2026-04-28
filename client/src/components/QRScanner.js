import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useRef, useState } from "react";
import { BrowserMultiFormatReader } from "@zxing/browser";
import QRCode from "qrcode";
export default function QRScanner() {
    const videoRef = useRef(null);
    const [message, setMessage] = useState("");
    const [scanned, setScanned] = useState(false);
    // 👉 FOR MANUAL QR TEST
    const [inputToken, setInputToken] = useState("aL-xupmP6pCCk266vGKJr");
    const [qrImage, setQrImage] = useState("");
    // SCANNER
    useEffect(() => {
        if (!videoRef.current)
            return;
        const codeReader = new BrowserMultiFormatReader();
        let controls = null;
        codeReader
            .decodeFromVideoDevice(undefined, videoRef.current, async (result) => {
            if (result && !scanned) {
                setScanned(true);
                try {
                    const data = JSON.parse(result.getText());
                    const res = await fetch("http://localhost:5000/api/tickets/verify", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: "Bearer YOUR_ADMIN_TOKEN",
                        },
                        body: JSON.stringify({
                            qrToken: data.qrToken,
                        }),
                    });
                    const response = await res.json();
                    setMessage(response.message);
                }
                catch {
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
    return (_jsxs("div", { children: [_jsx("h2", { children: "QR Scanner" }), _jsx("video", { ref: videoRef, style: { width: 300 } }), _jsx("p", { children: message }), _jsx("button", { onClick: () => setScanned(false), children: "Scan Again" }), _jsx("hr", {}), _jsx("h3", { children: "Manual QR Test" }), _jsx("input", { type: "text", placeholder: "Enter qrToken", value: inputToken, onChange: (e) => setInputToken(e.target.value) }), _jsx("button", { onClick: generateQR, children: "Generate QR" }), qrImage && (_jsx("div", { children: _jsx("img", { src: qrImage, alt: "QR Code", style: { width: 200 } }) }))] }));
}
