import supabase, { supabaseUrl } from "./supabase";
export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");
  if (error) {
    console.error(error);
    throw new Error("Cabins Could NotBe Loaded !");
  }

  return data;
}

export async function CreateEditCabin(newCabin, id) {
  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);
  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );

  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  //example of an image in supabase table
  // https://ifyiuznxehaedeloesmn.supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg

  // 1- create/edit cabin itself (if there is no id or there is one)
  let query = supabase.from("cabins");

  //A ) For Create New Cabin
  if (!id) query = query.insert([{ ...newCabin, image: imagePath }]);

  //B ) For Edit Cabin
  if (id)
    query = query
      .update({ ...newCabin, image: imagePath })
      .eq("id", id)
      .select();

  const { data, error } = await query.select().single();
  if (error) {
    console.error(error);
    throw new Error("Cabins Could Not Be Created !");
  }

  // 2- upload the image
  if (hasImagePath) return data;

  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);

  // 3- delete the cabin if ther was an error while imgae uploading
  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data.id);
    console.error(storageError);
    throw new Error("Cabins image could not be uploaed !");
  }

  return data;
}

export async function deleteCabin(id) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);
  if (error) {
    console.error(error);
    throw new Error("Cabins Could Not Be Deleted !");
  }
}
