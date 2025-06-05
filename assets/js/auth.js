document.addEventListener("DOMContentLoaded", function () {
  // --- Login Form Logic ---
  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", function (event) {
      event.preventDefault();
      const usernameInput = document.getElementById("username");
      const passwordInput = document.getElementById("password");
      const errorMessageElement = document.getElementById("loginErrorMessage");

      if (!usernameInput || !passwordInput || !errorMessageElement) {
        console.error(
          "Login form elements not found. Check IDs: username, password, loginErrorMessage"
        );
        return;
      }

      const username = usernameInput.value.trim();
      const password = passwordInput.value;
      errorMessageElement.textContent = "";

      if (username === "" || password === "") {
        errorMessageElement.textContent =
          "Vui lòng nhập tên người dùng và mật khẩu.";
        return;
      }

      // MOCK LOGIN CHECK
      if (username === "admin" && password === "password") {
        alert("Đăng nhập thành công (admin)!");
        window.location.href = "index.html";
      } else {
        const storedUser = localStorage.getItem("tempRegisteredUser");
        const storedPass = localStorage.getItem("tempRegisteredPass"); // WARNING: Not secure for production
        if (username === storedUser && password === storedPass) {
          alert("Đăng nhập thành công với tài khoản vừa đăng ký!");
          window.location.href = "index.html";
        } else {
          errorMessageElement.textContent =
            "Tên người dùng hoặc mật khẩu không đúng.";
        }
      }
    });
  }

  // --- Register Form Logic ---
  const registerForm = document.getElementById("registerForm");
  if (registerForm) {
    registerForm.addEventListener("submit", function (event) {
      event.preventDefault();
      const usernameInput = document.getElementById("registerUsername");
      const emailInput = document.getElementById("registerEmail");
      const passwordInput = document.getElementById("registerPassword");
      const confirmPasswordInput = document.getElementById("confirmPassword");
      const errorMessageElement = document.getElementById(
        "registerErrorMessage"
      );

      if (
        !usernameInput ||
        !emailInput ||
        !passwordInput ||
        !confirmPasswordInput ||
        !errorMessageElement
      ) {
        console.error("Register form elements not found. Check IDs.");
        return;
      }

      const username = usernameInput.value.trim();
      const email = emailInput.value.trim();
      const password = passwordInput.value;
      const confirmPassword = confirmPasswordInput.value;
      errorMessageElement.textContent = "";

      if (!username || !email || !password || !confirmPassword) {
        errorMessageElement.textContent = "Vui lòng điền đầy đủ thông tin.";
        return;
      }

      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(email)) {
        errorMessageElement.textContent = "Định dạng email không hợp lệ.";
        return;
      }

      if (password.length < 6) {
        errorMessageElement.textContent = "Mật khẩu phải có ít nhất 6 ký tự.";
        return;
      }

      if (password !== confirmPassword) {
        errorMessageElement.textContent = "Mật khẩu xác nhận không khớp.";
        return;
      }

      // MOCK REGISTRATION - WARNING: Storing plain password is insecure for production
      localStorage.setItem("tempRegisteredUser", username);
      localStorage.setItem("tempRegisteredPass", password);

      console.log("Đã đăng ký (mô phỏng):", { username, email });
      alert(
        `Đăng ký thành công cho người dùng: ${username}!\nBạn sẽ được chuyển đến trang đăng nhập.`
      );
      window.location.href = "log_in.html";
    });
  }
});

// --- Password Toggle Visibility Function (Global) ---
function togglePasswordVisibility(passwordFieldId, iconId) {
  const passwordInput = document.getElementById(passwordFieldId);
  const iconElement = document.getElementById(iconId);

  if (!passwordInput || !iconElement) {
    console.error(
      "Password field or icon not found for toggle:",
      passwordFieldId,
      iconId
    );
    return;
  }

  if (passwordInput.type === "password") {
    passwordInput.type = "text";
    iconElement.classList.remove("bi-eye-slash");
    iconElement.classList.add("bi-eye");
  } else {
    passwordInput.type = "password";
    iconElement.classList.remove("bi-eye");
    iconElement.classList.add("bi-eye-slash");
  }
}
