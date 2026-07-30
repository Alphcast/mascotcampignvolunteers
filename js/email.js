const emailService = (function () {
  const SERVICE_ID = "service_placeholder";
  const TEMPLATE_ID = "template_placeholder";
  const PUBLIC_KEY = "public_key_placeholder";

  function init() {
    if (typeof emailjs !== "undefined") {
      emailjs.init(PUBLIC_KEY);
    }
  }

  function send(formData) {
    if (typeof emailjs === "undefined") {
      console.warn("EmailJS not loaded. Simulating send.");
      return Promise.resolve({ status: 200, text: "OK (simulated)" });
    }
    return emailjs.send(SERVICE_ID, TEMPLATE_ID, formData);
  }

  return { init, send };
})();
