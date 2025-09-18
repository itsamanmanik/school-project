import { useState } from "react";
import { useRouter } from "next/router";

export default function VerifyOTP() {
  const router = useRouter();
  const { email } = router.query;
  const [otp, setOtp] = useState("");
  const [msg, setMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/auth/verify-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, otp }),
    });
    const data = await res.json();
    if (res.ok) {
      router.push("/addSchool");
    } else {
      setMsg(data.message);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold">Verify OTP</h2>
      <p>OTP sent to: {email}</p>
      <form onSubmit={handleSubmit}>
        <input value={otp} onChange={(e) => setOtp(e.target.value)} placeholder="Enter OTP" className="border p-2 w-full mt-2"/>
        <button className="bg-green-600 text-white p-2 mt-2">Verify</button>
      </form>
      {msg && <p className="text-red-500 mt-2">{msg}</p>}
    </div>
  );
}
