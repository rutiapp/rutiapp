export default function captchaHeader() {
    const captchaToken = JSON.parse(localStorage.getItem('captchaToken'));
    if (captchaToken) {
      return { 'x-captcha-token' :  captchaToken.value };
    } else {
      return {};
    }
  }