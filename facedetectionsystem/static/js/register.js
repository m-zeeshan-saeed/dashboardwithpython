const usernamefield = document.querySelector("#usernamefield");
const feedbackerror = document.querySelector(".invalid_feedback");
const emailfield = document.querySelector("#emailfield");
const emailFeedBackArea = document.querySelector(".emailFeedBackArea");
const showPasswordToggle = document.querySelector(".showPasswordToggle");
const passwordfield = document.querySelector("#passwordfield");
const submitbtn = document.querySelector(".submit-btn");

const handleToggleInput = (e) => {
  if (showPasswordToggle.textContent === "SHOW") {
    showPasswordToggle.textContent = "HIDE";
    passwordfield.setAttribute("type", "text");
  } else {
    showPasswordToggle.textContent = "SHOW";
    passwordfield.setAttribute("type", "password");
  }
};

showPasswordToggle.addEventListener("click", handleToggleInput);

emailfield.addEventListener("keyup", (e) => {
  const emailVal = e.target.value;
  emailfield.classList.remove("is-invalid");
  emailFeedBackArea.style.display = "none";

  if (emailVal.length > 0) {
    fetch("/authentication/validate-email", {
      body: JSON.stringify({ email: emailVal }),
      method: "POST",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("data", data);
        if (data.email_error) {
          submitbtn.disabled = true;
          emailfield.classList.add("is-invalid");
          emailFeedBackArea.style.display = "block";
          emailFeedBackArea.innerHTML = `<p>${data.email_error}</p>`;
        } else {
          submitbtn.removeAttribute("disabled");
        }
      });
  }
});

usernamefield.addEventListener("keyup", (e) => {
  const usernameVal = e.target.value;
  usernamefield.classList.remove("is-invalid");
  feedbackerror.style.display = "none";

  if (usernameVal.length > 0) {
    fetch("/authentication/validate-username", {
      body: JSON.stringify({ username: usernameVal }),
      method: "POST",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.username_error) {
          usernamefield.classList.add("is-invalid");
          feedbackerror.style.display = "block";
          feedbackerror.innerHTML = `<p>${data.username_error}</p>`;
          submitbtn.disabled = true;
        } else {
          submitbtn.removeAttribute("disabled");
        }
      });
  }
});
