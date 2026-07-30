(function () {
  const form = document.getElementById("volunteer-form");
  const submitBtn = document.getElementById("submit-btn");
  const statusEl = document.getElementById("form-status");
  const modal = document.getElementById("success-modal");
  const modalClose = document.getElementById("modal-close");

  function setLoading(loading) {
    submitBtn.classList.toggle("is-loading", loading);
    submitBtn.disabled = loading;
  }

  function showStatus(msg, type) {
    statusEl.textContent = msg;
    statusEl.className = "form-status" + (type ? " " + type : "");
  }

  function calcAge(dob) {
    const birth = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const m = today.getMonth() - birth.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--;
    return age;
  }

  const dobField = document.getElementById("dob");
  const ageField = document.getElementById("age");
  if (dobField && ageField) {
    dobField.addEventListener("change", function () {
      if (this.value) {
        ageField.value = calcAge(this.value);
      } else {
        ageField.value = "";
      }
      validators.validateField(ageField);
    });
  }

  form.addEventListener("input", function (e) {
    validators.validateField(e.target);
  });

  form.addEventListener("change", function (e) {
    if (e.target.type === "radio" || e.target.type === "checkbox") {
      validators.validateField(e.target);
    }
  });

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    if (!validators.validateForm(form)) {
      showStatus("Please fix the highlighted errors.", "error");
      return;
    }

    setLoading(true);
    showStatus("Submitting...", "");

    const formData = new FormData(form);

    const days = Array.from(document.querySelectorAll("[name='days']:checked")).map((c) => c.value);

    const data = {
      fullName: formData.get("fullName"),
      gender: formData.get("gender"),
      dob: formData.get("dob"),
      age: formData.get("age"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      whatsapp: formData.get("whatsapp"),
      occupation: formData.get("occupation"),
      state: formData.get("state"),
      lga: formData.get("lga"),
      ward: formData.get("ward"),
      country: formData.get("country"),
      address: formData.get("address"),
      pvc: formData.get("pvc"),
      skills: formData.get("skills"),
      reason: formData.get("reason"),
      days: days.join(", "),
      emergency: formData.get("emergency"),
    };

    emailService
      .send(data)
      .then(() => {
        setLoading(false);
        showStatus("Registration submitted successfully!", "success");
        modal.classList.add("active");
        form.reset();
        if (ageField) ageField.value = "";
      })
      .catch((err) => {
        setLoading(false);
        showStatus("Something went wrong. Please try again.", "error");
        console.error(err);
      });
  });

  function closeModal() {
    modal.classList.remove("active");
  }

  modalClose.addEventListener("click", closeModal);
  modal.addEventListener("click", function (e) {
    if (e.target === modal) closeModal();
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && modal.classList.contains("active")) closeModal();
  });
})();
