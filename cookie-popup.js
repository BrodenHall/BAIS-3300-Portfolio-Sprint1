// Description: This script is used to show a cookie popup on the website

(function () {
  // Get the cookie popup element
  const cookiePopup = document.getElementById("cookie-popup");

  // Get the accept button
  const acceptCookies = document.getElementById("accept-cookies");

  // Function to set a cookie (may fail silently if browser blocks cookies)
  function setCookie(cname, cvalue, exdays) {
    try {
      const d = new Date();
      d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
      const expires = "expires=" + d.toUTCString();
      document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    } catch (e) {
      // Cookie blocked by browser - continue anyway
    }
  }

  // Function to get a cookie value
  function getCookie(cname) {
    try {
      const name = cname + "=";
      const decodedCookie = decodeURIComponent(document.cookie);
      const ca = decodedCookie.split(";");
      for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == " ") {
          c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
          return c.substring(name.length, c.length);
        }
      }
    } catch (e) {
      // Cookie access blocked by browser
    }
    return "";
  }

  // Function to check if the cookie has been set and show popup if needed
  function checkCookie() {
    const cookieAccepted = getCookie("cookieAccepted");
    if (cookieAccepted === "") {
      // Show the cookie popup
      cookiePopup.style.display = "block";
    }
  }

  // Event listener for the accept button
  acceptCookies.addEventListener("click", function () {
    // Hide the popup first (this always works, even if cookies are blocked)
    cookiePopup.style.display = "none";
    // Try to set the cookie (may be blocked by browser privacy settings)
    setCookie("cookieAccepted", "true", 30);
  });

  // Call the checkCookie function
  checkCookie();
})();
