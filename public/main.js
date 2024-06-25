// const socket = io();

// const clientsTotal = document.getElementById("client-total");

// const messageContainer = document.getElementById("message-container");
// const nameInput = document.getElementById("name-input");
// const messageForm = document.getElementById("message-form");
// const messageInput = document.getElementById("message-input");

// const messageTone = new Audio("/message-tone.mp3");

// messageForm.addEventListener("submit", (e) => {
//   e.preventDefault();
//   sendMessage();
// });

// socket.on("clients-total", (data) => {
//   clientsTotal.innerText = `Total Clients: ${data}`;
// });

// function sendMessage() {
//   if (messageInput.value === "") return;
//   // console.log(messageInput.value)
//   const data = {
//     name: nameInput.value,
//     message: messageInput.value,
//     dateTime: new Date(),
//   };
//   socket.emit("message", data);
//   addMessageToUI(true, data);
//   messageInput.value = "";
// }

// socket.on("chat-message", (data) => {
//   // console.log(data)
//   messageTone.play();
//   addMessageToUI(false, data);
// });

// socket.on("user connected", (username) => {
//   const element = `
//     <li class="message-notification">
//       <p class="notification">${username} has joined the chat</p>
//     </li>
//   `;
//   messageContainer.innerHTML += element;
//   scrollToBottom();
// });

// function addMessageToUI(isOwnMessage, data) {
//   clearFeedback();
//   const element = `
//       <li class="${isOwnMessage ? "message-right" : "message-left"}">
//           <p class="message">
//             ${data.message}
//             <span>${data.name} ● ${moment(data.dateTime).fromNow()}</span>
//           </p>
//         </li>
//         `;

//   messageContainer.innerHTML += element;
//   scrollToBottom();
// }

// function scrollToBottom() {
//   messageContainer.scrollTo(0, messageContainer.scrollHeight);
// }

// messageInput.addEventListener("focus", (e) => {
//   socket.emit("feedback", {
//     feedback: `✍️ ${nameInput.value} is typing a message`,
//   });
// });

// messageInput.addEventListener("keypress", (e) => {
//   socket.emit("feedback", {
//     feedback: `✍️ ${nameInput.value} is typing a message`,
//   });
// });
// messageInput.addEventListener("blur", (e) => {
//   socket.emit("feedback", {
//     feedback: "",
//   });
// });

// socket.on("feedback", (data) => {
//   clearFeedback();
//   const element = `
//         <li class="message-feedback">
//           <p class="feedback" id="feedback">${data.feedback}</p>
//         </li>
//   `;
//   messageContainer.innerHTML += element;
// });

// function clearFeedback() {
//   document.querySelectorAll("li.message-feedback").forEach((element) => {
//     element.parentNode.removeChild(element);
//   });
// }

// // Emit join event after user enters their name
// nameInput.addEventListener("blur", () => {
//   const username = nameInput.value || "anonymous";
//   socket.emit("join", username);
// });

// const socket = io();

// const clientsTotal = document.getElementById("client-total");
// const messageContainer = document.getElementById("message-container");
// const nameInput = document.getElementById("name-input");
// const messageForm = document.getElementById("message-form");
// const messageInput = document.getElementById("message-input");

// const messageTone = new Audio("/message-tone.mp3");

// messageForm.addEventListener("submit", (e) => {
//   e.preventDefault();
//   sendMessage();
// });

// socket.on("clients-total", (data) => {
//   clientsTotal.innerText = `Total Clients: ${data}`;
// });

// function sendMessage() {
//   if (messageInput.value === "") return;
//   const data = {
//     name: nameInput.value,
//     message: messageInput.value,
//     dateTime: new Date(),
//   };
//   socket.emit("message", data);
//   addMessageToUI(true, data);
//   messageInput.value = "";
// }

// socket.on("chat-message", (data) => {
//   messageTone.play();
//   addMessageToUI(false, data);
// });

// socket.on("user connected", (username) => {
//   showTemporaryNotification(`${username} has joined the chat`);
// });

// socket.on("user disconnected", (username) => {
//   showTemporaryNotification(`${username} has left the chat`);
// });

// function addMessageToUI(isOwnMessage, data) {
//   clearFeedback();
//   const element = `
//     <li class="${isOwnMessage ? "message-right" : "message-left"}">
//       <p class="message">
//         ${data.message}
//         <span>${data.name} ● ${moment(data.dateTime).fromNow()}</span>
//       </p>
//     </li>
//   `;
//   messageContainer.innerHTML += element;
//   scrollToBottom();
// }

// function scrollToBottom() {
//   messageContainer.scrollTo(0, messageContainer.scrollHeight);
// }

// messageInput.addEventListener("focus", () => {
//   socket.emit("feedback", {
//     feedback: `✍️ ${nameInput.value} is typing a message`,
//   });
// });

// messageInput.addEventListener("keypress", () => {
//   socket.emit("feedback", {
//     feedback: `✍️ ${nameInput.value} is typing a message`,
//   });
// });

// messageInput.addEventListener("blur", () => {
//   socket.emit("feedback", {
//     feedback: "",
//   });
// });

// socket.on("feedback", (data) => {
//   clearFeedback();
//   const element = `
//     <li class="message-feedback">
//       <p class="feedback" id="feedback">${data.feedback}</p>
//     </li>
//   `;
//   messageContainer.innerHTML += element;
// });

// function clearFeedback() {
//   document.querySelectorAll("li.message-feedback").forEach((element) => {
//     element.parentNode.removeChild(element);
//   });
// }

// function showTemporaryNotification(message) {
//   const notification = document.createElement("div");
//   notification.className = "notification";
//   notification.innerText = message;
//   document.body.appendChild(notification);
//   setTimeout(() => {
//     notification.classList.add("fade-out");
//     setTimeout(() => {
//       document.body.removeChild(notification);
//     }, 1000); // match with CSS animation duration
//   }, 3000); // show for 3 seconds
// }

// // Emit join event after user enters their name
// nameInput.addEventListener("blur", () => {
//   const username = nameInput.value || "anonymous";
//   socket.emit("join", username);
// });

const socket = io();

const clientsTotal = document.getElementById("client-total");
const messageContainer = document.getElementById("message-container");
const nameInput = document.getElementById("name-input");
const messageForm = document.getElementById("message-form");
const messageInput = document.getElementById("message-input");
const exitButton = document.getElementById("exit-button");

const messageTone = new Audio("/message-tone.mp3");

messageForm.addEventListener("submit", (e) => {
  e.preventDefault();
  sendMessage();
});

exitButton.addEventListener("click", () => {
  const username = nameInput.value || "anonymous";
  socket.emit("leave", username);
  showTemporaryNotification(`${username} has left the chat`);
  socket.disconnect();
  nameInput.disabled = false; // Re-enable name input for potential re-join

  setTimeout(() => {
    window.close(); // Attempt to close the window after a short delay
  }, 1000);
});

socket.on("clients-total", (data) => {
  clientsTotal.innerText = `Total Clients: ${data}`;
});

function sendMessage() {
  if (messageInput.value === "") return;
  const data = {
    name: nameInput.value,
    message: messageInput.value,
    dateTime: new Date(),
  };
  socket.emit("message", data);
  addMessageToUI(true, data);
  messageInput.value = "";
}

socket.on("chat-message", (data) => {
  messageTone.play();
  addMessageToUI(false, data);
});

socket.on("user connected", (username) => {
  showTemporaryNotification(`${username} has joined the chat`);
});

socket.on("user disconnected", (username) => {
  showTemporaryNotification(`${username} has left the chat`);
});

function addMessageToUI(isOwnMessage, data) {
  clearFeedback();
  const element = `
    <li class="${isOwnMessage ? "message-right" : "message-left"}">
      <p class="message">
        ${data.message}
        <span>${data.name} ● ${moment(data.dateTime).fromNow()}</span>
      </p>
    </li>
  `;
  messageContainer.innerHTML += element;
  scrollToBottom();
}

function scrollToBottom() {
  messageContainer.scrollTo(0, messageContainer.scrollHeight);
}

messageInput.addEventListener("focus", () => {
  socket.emit("feedback", {
    feedback: `✍️ ${nameInput.value} is typing a message`,
  });
});

messageInput.addEventListener("keypress", () => {
  socket.emit("feedback", {
    feedback: `✍️ ${nameInput.value} is typing a message`,
  });
});

messageInput.addEventListener("blur", () => {
  socket.emit("feedback", {
    feedback: "",
  });
});

socket.on("feedback", (data) => {
  clearFeedback();
  const element = `
    <li class="message-feedback">
      <p class="feedback" id="feedback">${data.feedback}</p>
    </li>
  `;
  messageContainer.innerHTML += element;
});

function clearFeedback() {
  document.querySelectorAll("li.message-feedback").forEach((element) => {
    element.parentNode.removeChild(element);
  });
}

function showTemporaryNotification(message) {
  const notification = document.createElement("div");
  notification.className = "notification";
  notification.innerText = message;
  document.body.appendChild(notification);
  setTimeout(() => {
    notification.classList.add("fade-out");
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 1000); // match with CSS animation duration
  }, 3000); // show for 3 seconds
}

// Emit join event after user enters their name
nameInput.addEventListener("blur", () => {
  const username = nameInput.value || "anonymous";
  socket.emit("join", username);
  nameInput.disabled = true; // Disable name input to prevent changing while connected
});
