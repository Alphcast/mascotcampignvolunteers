const validators = (function () {
  const rules = {
    fullName: {
      validate: (v) => v.trim().length >= 2,
      msg: "Enter your full name (at least 2 characters).",
    },
    gender: {
      validate: (v) => v !== "",
      msg: "Select your gender.",
    },
    dob: {
      validate: (v) => v !== "" && new Date(v) < new Date(),
      msg: "Enter a valid date of birth.",
    },
    age: {
      validate: (v) => parseInt(v, 10) >= 16,
      msg: "You must be at least 16 years old.",
    },
    email: {
      validate: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v),
      msg: "Enter a valid email address.",
    },
    phone: {
      validate: (v) => /^0\d{10}$/.test(v.trim()),
      msg: "Enter a valid 11-digit phone number (e.g. 08012345678).",
    },
    whatsapp: {
      validate: (v) => /^0\d{10}$/.test(v.trim()),
      msg: "Enter a valid 11-digit WhatsApp number.",
    },
    occupation: {
      validate: (v) => v.trim().length >= 2,
      msg: "Enter your occupation.",
    },
    state: {
      validate: (v) => v.trim() !== "",
      msg: "State is required.",
    },
    lga: {
      validate: (v) => v !== "",
      msg: "Select your local government.",
    },
    country: {
      validate: (v) => v.trim() !== "",
      msg: "Country is required.",
    },
    address: {
      validate: (v) => v.trim().length >= 5,
      msg: "Enter your residential address (at least 5 characters).",
    },
    pvc: {
      validate: (v) => v !== "",
      msg: "Indicate whether you have a PVC.",
    },
    skills: {
      validate: (v) => v.trim().length >= 3,
      msg: "List your relevant skills.",
    },
    reason: {
      validate: (v) => v.trim().length >= 10,
      msg: "Tell us why you want to volunteer (at least 10 characters).",
    },
    days: {
      validate: (v) => v.length > 0,
      msg: "Select at least one available day.",
    },
  };

  function validateField(field) {
    const id = field.id || field.name;
    const errEl = document.getElementById("err-" + id);
    const parent = field.closest(".form-field");
    const rule = rules[id];
    let value;

    if (field.type === "radio" || (field.type === "checkbox" && field.name === "days")) {
      const checked = document.querySelectorAll(`[name="${field.name}"]:checked`);
      value = Array.from(checked).map((c) => c.value);
    } else if (field.type === "checkbox") {
      value = field.checked ? field.value : "";
    } else {
      value = field.value;
    }

    let valid = true;
    if (field.required) {
      valid = rule ? rule.validate(value) : value !== "";
    }

    if (parent) parent.classList.toggle("has-error", !valid);
    if (errEl) errEl.textContent = valid ? "" : (rule ? rule.msg : "This field is required.");

    return valid;
  }

  function validateForm(form) {
    let allValid = true;
    const fields = form.querySelectorAll("[required]");
    fields.forEach((f) => {
      if (!validateField(f)) allValid = false;
    });
    return allValid;
  }

  return { validateField, validateForm };
})();
