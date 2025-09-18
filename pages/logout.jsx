import { useRouter } from "next/router";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/auth/logout");
    router.push("/"); // back to homepage
  };

  return (
    <button onClick={handleLogout} className="bg-red-600 text-white px-3 py-1 rounded">
      Logout
    </button>
  );
}
