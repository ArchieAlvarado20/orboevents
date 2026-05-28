export {};

declare global {
  interface Window {
    confirmationResult: any;
    recaptchaVerifier: any;
  }
}
