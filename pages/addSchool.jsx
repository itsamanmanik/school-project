// pages/addSchool.jsx
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout"); // clears cookie
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      router.push("/"); // go home after logout
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
    >
      Logout
    </button>
  );
}

export default function AddSchool() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    // check logged-in user
    let mounted = true;
    fetch("/api/auth/me")
      .then((r) => r.json())
      .then((data) => {
        if (!mounted) return;
        if (data.user) {
          setUser(data.user);
        } else {
          // not logged in -> redirect to login (preserve next)
          router.replace("/login?next=/addSchool");
        }
      })
      .catch((err) => {
        console.error("auth check error:", err);
        router.replace("/login?next=/addSchool");
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });
    return () => { mounted = false; };
  }, [router]);

  const onSubmit = async (formData) => {
    try {
      const res = await fetch("/api/addSchool", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const result = await res.json();

      if (res.ok) {
        // success — optionally show toast then redirect
        alert(result.message || "School added");
        router.push("/showSchools"); // redirect to showSchools after adding
      } else {
        alert(result.message || "Error adding school");
      }
    } catch (err) {
      console.error("Submit error:", err);
      alert("Error: " + err.message);
    }
  };

  if (loading) return <p className="p-4">Checking authentication...</p>;
  if (!user) return null; // redirect in progress

  return (
    <div className="p-4 max-w-xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Add School</h2>
        <div className="flex gap-2">
          <button
            onClick={() => router.push("/showSchools")}
            className="bg-gray-200 px-3 py-1 rounded"
          >
            View Schools
          </button>
          <LogoutButton />
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
        <input
          {...register("name", { required: true })}
          placeholder="School Name"
          className="border p-2"
        />
        {errors.name && <span className="text-red-500">Name is required</span>}

        <input
          {...register("address", { required: true })}
          placeholder="Address"
          className="border p-2"
        />
        {errors.address && <span className="text-red-500">Address required</span>}

        <input
          {...register("city", { required: true })}
          placeholder="City"
          className="border p-2"
        />
        {errors.city && <span className="text-red-500">City required</span>}

        <input
          {...register("state", { required: true })}
          placeholder="State"
          className="border p-2"
        />
        {errors.state && <span className="text-red-500">State required</span>}

        <input
          {...register("contact", { required: true, minLength: 10, maxLength: 12 })}
          placeholder="Contact No"
          className="border p-2"
        />
        {errors.contact && <span className="text-red-500">Contact required (10-12 digits)</span>}

        <input
          {...register("email_id", { required: true, pattern: /^\S+@\S+\.\S+$/ })}
          placeholder="Contact Email"
          className="border p-2"
        />
        {errors.email_id && <span className="text-red-500">Valid email required</span>}

        <input
          {...register("image", { required: true })}
          placeholder="Image URL (https://...)"
          className="border p-2"
        />
        {errors.image && <span className="text-red-500">Image URL required</span>}

        <div className="flex gap-2">
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
            Add School
          </button>

          <button
            type="button"
            onClick={() => router.push("/showSchools")}
            className="bg-gray-300 px-4 py-2 rounded"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
