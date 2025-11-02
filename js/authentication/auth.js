
    // ---------- Simple client-side auth with hashing ----------
    // NOT a substitute for server-side authentication in production.
    // For production: use a backend or a service (Firebase Auth, Auth0, etc).
    const encoder = new TextEncoder();

    async function generateSalt() {
      const salt = crypto.getRandomValues(new Uint8Array(16));
      return arrayBufferToBase64(salt);
    }

    async function deriveKey(password, saltBase64) {
      const salt = base64ToArrayBuffer(saltBase64);
      const keyMaterial = await crypto.subtle.importKey(
        "raw",
        encoder.encode(password),
        "PBKDF2",
        false,
        ["deriveBits", "deriveKey"]
      );
      const key = await crypto.subtle.deriveKey(
        {
          name: "PBKDF2",
          salt: salt,
          iterations: 100000,
          hash: "SHA-256"
        },
        keyMaterial,
        { name: "AES-GCM", length: 256 },
        true,
        ["encrypt", "decrypt"]
      );
      const exported = await crypto.subtle.exportKey("raw", key);
      return arrayBufferToBase64(exported);
    }

    function arrayBufferToBase64(buffer) {
      const bytes = new Uint8Array(buffer);
      let binary = '';
      for (let i=0;i<bytes.byteLength;i++) binary += String.fromCharCode(bytes[i]);
      return btoa(binary);
    }
    function base64ToArrayBuffer(base64) {
      const binary = atob(base64);
      const len = binary.length;
      const bytes = new Uint8Array(len);
      for (let i=0;i<len;i++) bytes[i] = binary.charCodeAt(i);
      return bytes.buffer;
    }

    function getUsersStore() {
      return JSON.parse(localStorage.getItem("vusers") || "{}");
    }
    function saveUsersStore(store) {
      localStorage.setItem("vusers", JSON.stringify(store));
    }

    document.getElementById("show-signup").addEventListener("click", () => {
      document.getElementById("login-form").classList.add("d-none");
      document.getElementById("signup-form").classList.remove("d-none");
      document.getElementById("auth-title").textContent = "Create an Account";
    });
    document.getElementById("show-login").addEventListener("click", () => {
      document.getElementById("signup-form").classList.add("d-none");
      document.getElementById("login-form").classList.remove("d-none");
      document.getElementById("auth-title").textContent = "Login to Your Account";
    });

    // SIGNUP
    document.getElementById("signup-form").addEventListener("submit", async (e) => {
      e.preventDefault();
      const name = document.getElementById("signup-name").value.trim();
      const email = document.getElementById("signup-email").value.trim().toLowerCase();
      const password = document.getElementById("signup-password").value;
      const phone = document.getElementById("signup-phone").value;
      const location = document.getElementById("signup-location").value;

      if (!email || !password || !name) return alert("Please fill all required fields.");

      const users = getUsersStore();
      if (users[email]) return alert("An account with that email already exists. Please log in.");

      const salt = await generateSalt();
      const derived = await deriveKey(password, salt);

      users[email] = {
        name, email, phone, location,
        salt, derived // store salt + derived key (not raw password)
      };
      saveUsersStore(users);
      alert("Signup successful! You can now log in.");
      // switch to login
      document.getElementById("show-login").click();
    });

    // LOGIN
    document.getElementById("login-form").addEventListener("submit", async (e) => {
      e.preventDefault();
      const email = document.getElementById("login-email").value.trim().toLowerCase();
      const password = document.getElementById("login-password").value;

      const users = getUsersStore();
      const record = users[email];
      if (!record) return alert("No account found. Please sign up.");

      const derived = await deriveKey(password, record.salt);
      if (derived === record.derived) {
        // successful login
        // set session using the function from index.js (global)
        if (typeof setUserSession === 'function') {
          setUserSession(record.name, record.email);
        } else {
          localStorage.setItem("user", JSON.stringify({ name: record.name, email: record.email }));
        }
        alert("Login successful.");
        window.location.href = "index.html";
      } else {
        alert("Incorrect password.");
      }
    });