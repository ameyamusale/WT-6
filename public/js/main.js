function toggleMenu() {
  const nav = document.getElementById("mainNav");
  nav.classList.toggle("show");
}

function addToCart(title) {
  alert(`"${title}" has been added to the cart. (Demo feature)`);
}

function validateRegistration() {
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirmPassword").value;

  if (password !== confirmPassword) {
    alert("Passwords do not match.");
    return false;
  }

  if (password.length < 6) {
    alert("Password must contain at least 6 characters.");
    return false;
  }

  return true;
}