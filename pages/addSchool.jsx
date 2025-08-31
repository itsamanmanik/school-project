import { useForm } from "react-hook-form";

export default function AddSchool() {
  const { register, handleSubmit, formState: { errors } } = useForm();

 const onSubmit = async (data) => {
  try {
    const res = await fetch("/api/addSchool", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = await res.json();
    alert(result.message || "Something went wrong!");
  } catch (err) {
    alert("Error: " + err.message);
  }
};

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-4 flex flex-col gap-3 max-w-md mx-auto">
      <input {...register("name", { required: true })} placeholder="School Name" />
      <input {...register("address", { required: true })} placeholder="Address" />
      <input {...register("city", { required: true })} placeholder="City" />
      <input {...register("state", { required: true })} placeholder="State" />
      <input {...register("contact", { required: true, minLength: 10, maxLength: 10 })} placeholder="Contact No" />
      <input {...register("email_id", { required: true, pattern: /^\S+@\S+$/i })} placeholder="Email" />
      <input {...register("image", { required: true })} placeholder="Image URL" />
      <button type="submit">Add School</button>
    </form>
  );
}
