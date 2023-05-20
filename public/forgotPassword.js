const passwordForm = document.getElementById("passwordForm");

passwordForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const urlParams = new URLSearchParams(window.location.search);
  const code = urlParams.get("code");
  const password = document.getElementById("password").value;
  const confirmPassword =
    document.getElementById("confirm-password").value;

  if (password !== confirmPassword) {
    alert("As senhas não são iguais");
    return;
  }

  axios
    .post("http://localhost:1337/api/auth/reset-password", {
      passwordConfirmation: confirmPassword,
      password: password,
      code: code,
    })
    .then((response) => {
      window.location.href = "/api/email-pages/forgot-password-success";
    })
    .catch((e) => alert("Ocorreu um Erro"));
});