import { useState } from "react";
import { useRouter } from "next/router";  // ✅ Import router

export default function Login() {
  const [email, setEmail] = useState("");
  const router = useRouter();  // ✅ Initialize router

  const handleSendOtp = async () => {
    console.log("Send OTP clicked"); // Debug

    try {
      const res = await fetch("/api/auth/request-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      console.log("Response status:", res.status); // Debug

      if (!res.ok) {
        const text = await res.text();
        throw new Error("Server error: " + text);
      }

      const data = await res.json();
      alert(data.message || "OTP sent successfully");

      // ✅ Redirect to /verify-otp and pass email in query string
      if (res.ok) {
        router.push(`/verify-otp?email=${email}`);
      }

    } catch (err) {
      console.error("Frontend Error:", err);
      alert("Error: " + err.message);
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-2xl mb-4">Login</h2>
      <input
        type="email"
        placeholder="Enter email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border p-2 w-full mb-4"
      />
      <button
        onClick={handleSendOtp}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Send OTP
      </button>
    </div>
  );
}
