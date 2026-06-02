import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { auth } from "@/lib/firebase";

export const sendOtp = async (phone: string) => {
  if (!window.recaptchaVerifier) {
    window.recaptchaVerifier = new RecaptchaVerifier(
      auth,
      "recaptcha-container",
      {
        size: "invisible", // or invisible
      },
    );
  }

  const appVerifier = window.recaptchaVerifier;

  const confirmation = await signInWithPhoneNumber(auth, phone, appVerifier);

  return confirmation;
};
