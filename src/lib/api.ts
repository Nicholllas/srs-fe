const API_URL = "http://localhost:8000/api"; // ganti sesuai host Laravel

// LOGIN
export async function loginUser(email: string, password: string) {
  const res = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json", // ← Tambahkan ini
    },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    throw new Error("Login gagal");
  }

  return res.json();
}

export async function getUser(token: string) {
  const res = await fetch(`${API_URL}/user`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error("Gagal ambil data user");
  }

  return res.json();
}

// REGISTER
export async function register(name: string, email: string, password: string) {
  const res = await fetch(`${API_URL}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json", // ← Tambahkan ini
    },
    body: JSON.stringify({ name, email, password }),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message ?? "Gagal daftar");
  }

  return res.json();
}
