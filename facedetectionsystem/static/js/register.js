const usernamefield = document.querySelector("#usernamefield");
const feedbackerror = document.querySelector(".invalid_feedback");

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
        console.log("data", data);
        if (data.username_error) {
          usernamefield.classList.add("is-invalid");
          feedbackerror.style.display = "block";
          feedbackerror.innerHTML = `<p>${data.username_error}</p>`;
        }
      });
  }
});
