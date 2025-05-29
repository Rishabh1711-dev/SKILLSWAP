document.addEventListener("DOMContentLoaded", () => {
  const filterLinks = document.querySelectorAll(".filter-link");
  const productBoxes = document.querySelectorAll(".product-box");

  filterLinks.forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();
      const filter = link.id.toUpperCase();
      let shown = 0;
      productBoxes.forEach(box => {
        const category = box.getAttribute("data-category");
        if ((filter === "ALL" || category === filter) && shown < 3) {
          box.style.display = "flex";
          shown++;
        } else {
          box.style.display = "none";
        }
      });
    });
  });
  const menuToggle = document.getElementById("menu-toggle");
  const navLinks = document.getElementById("nav-links");
  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      navLinks.classList.toggle("active");
    });
  }
  const ctaButtons = document.querySelectorAll(".btn-primary, .btn-secondary");
  ctaButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      btn.classList.add("clicked");
      setTimeout(() => btn.classList.remove("clicked"), 300);
    });
  });

  const anchorLinks = document.querySelectorAll('a[href^="#"]');
  anchorLinks.forEach(link => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    });
  });
});
const chatBody = document.querySelector(".chat-body");
const messageInput = document.querySelector(".message-input");
const sendMessageButton = document.querySelector("#send-message");

const userData = {
  message: null
};

const createMessageElement = (content, ...classes) => {
  const div = document.createElement("div");
  div.classList.add("message", ...classes);
  div.innerHTML = content;
  return div;
};
const API_KEY = "AIzaSyCxZ0iQGncn8PVas25hh19vTbq7lXoPDSI";
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`;

const generateBotResponse = async (incomingMessageDiv) => {
  const messageElement = incomingMessageDiv.querySelector(".message-text");
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      contents: [
        {
          parts: [{ text: userData.message }]
        }
      ]
    })
  };

  try {
    const response = await fetch(API_URL, requestOptions);
    const data = await response.json();
    if (!response.ok) throw new Error(data.error.message);
    const apiResponseText = data.candidates[0].content.parts[0].text.trim();
    messageElement.innerText = apiResponseText;
  } catch (error) {
    console.error("Error from API:", error);
    messageElement.innerText = "Oops! Something went wrong.";
  }
};

const handleOutgoingMessage = (e) => {
  e.preventDefault();
  userData.message = messageInput.value.trim();
  if (!userData.message) return;
  messageInput.value = "";

  const userMessageHTML = `<div class="message-text"></div>`;
  const outgoingMessageDiv = createMessageElement(userMessageHTML, "user-message");
  outgoingMessageDiv.querySelector(".message-text").textContent = userData.message;
  chatBody.appendChild(outgoingMessageDiv);
  chatBody.scrollTop = chatBody.scrollHeight;

  setTimeout(() => {
    const botMessageHTML = `
      <img class="bot-avatar" src="media/bot.png" alt="chatbotlogo">
      <div class="message-text">
        <div class="thinking-indicator">
          <div class="dot"></div>
          <div class="dot"></div>
          <div class="dot"></div>
        </div>
      </div>`;
    const incomingMessageDiv = createMessageElement(botMessageHTML, "bot-message");
    chatBody.appendChild(incomingMessageDiv);
    chatBody.scrollTop = chatBody.scrollHeight;
    generateBotResponse(incomingMessageDiv);
  }, 600);
};

messageInput.addEventListener("keydown", (e) => {
  const userMessage = e.target.value.trim();
  if (e.key === "Enter" && userMessage) {
    handleOutgoingMessage(e);
  }
});
  document.addEventListener("DOMContentLoaded", function () {
    const toggler = document.getElementById("chatbot-toggler");
    const body = document.body;
    const closeBtn = document.getElementById("close-chatbot");

    toggler.addEventListener("click", () => {
      body.classList.toggle("show-chatbot");
    });

    if (closeBtn) {
      closeBtn.addEventListener("click", () => {
        body.classList.remove("show-chatbot");
      });
    }
  });

