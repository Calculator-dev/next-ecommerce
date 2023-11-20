import { redirect } from "next/navigation";
import { FormSubmitButton } from "@/components/FormSubmitButton";
import { prisma } from "@/lib/db/prisma";

export const metadata = {
  title: "Add Product - E-commerce",
};

async function addProduct(formData: FormData) {
  "use server";

  const name = formData.get("name")?.toString();
  const description = formData.get("description")?.toString();
  const imageUrl = formData.get("imageUrl")?.toString();
  const price = Number(formData.get("price") || 0);

  if (!name || !description || !imageUrl || !price) {
    throw Error("Missing required fields");
  }
  //hitting server only not client side
  await prisma.product.create({
    data: {
      name,
      description,
      price,
      imageUrl,
    },
  });

  redirect("/");
}

export default function AddProductPage() {
  return (
    <div>
      <h1 className="text-lg mb-3 font-bold">Add Product</h1>
      <form action={addProduct}>
        <input
          className="mb-3 w-full input input-bordered"
          required
          name="name"
          placeholder="Name"
        />
        <textarea
          required
          name="description"
          placeholder="Description"
          className="textarea textarea-bordered mb-3 w-full"
        />
        <input
          className="mb-3 w-full input input-bordered"
          required
          name="imageUrl"
          placeholder="Image Url"
          type="url"
        />
        <input
          className="mb-3 w-full input input-bordered"
          required
          name="price"
          placeholder="Price"
          type="number"
        />
        <FormSubmitButton className="btn-block" type="submit">
          Add Product
        </FormSubmitButton>
      </form>
    </div>
  );
}
