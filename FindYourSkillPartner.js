document.addEventListener("DOMContentLoaded", () => {
  const formInputs = document.querySelectorAll(".skills-form input");
  const submitBtn = document.querySelector(".cta a");

  submitBtn.addEventListener("click", (e) => {
    e.preventDefault();

    let isValid = true;
    formInputs.forEach(input => {
      if (input.value.trim() === "") {
        input.classList.add("error");
        isValid = false;
      } else {
        input.classList.remove("error");
      }
    });

    if (!isValid) {
      alert("Please fill out all fields before submitting.");
      return;
    }
    const formData = {};
    formInputs.forEach(input => {
      const placeholder = input.getAttribute("placeholder").toLowerCase().replace(/\.+$/, '');
      formData[placeholder] = input.value.trim();
    });
    console.log("Form submitted:", formData);
    showSuccessMessage();
  });

  function showSuccessMessage() {
    const messageBox = document.createElement("div");
    messageBox.className = "success-message";
    messageBox.textContent = "🎉 Skill Partner search initiated successfully!";
    document.body.appendChild(messageBox);

    setTimeout(() => {
      messageBox.remove();
    }, 4000);
  }
});
