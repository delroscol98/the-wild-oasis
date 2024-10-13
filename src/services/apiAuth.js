import supabase, { supabaseUrl } from "./supabase";

export async function signUp({ fullName, email, password }) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        fullName,
        avatar: "",
      },
    },
  });

  if (error) throw new Error(error.message);

  return data;
}

export async function login({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw new Error(error.message);

  return data;
}

export async function getCurrentUser() {
  const { data: session, error: sessionError } =
    await supabase.auth.getSession();

  if (sessionError) throw new Error("Login error: ", { cause: sessionError });
  if (!session?.session) return null;

  const { data: user, error: userError } = await supabase.auth.getUser();

  if (userError) throw new Error("Login error: ", { cause: userError });

  return user?.user;
}

export async function logout() {
  const { error: logoutError } = supabase.auth.signOut();

  if (logoutError) throw new Error("Logout error: ", { cause: logoutError });
}

export async function updateUser({ fullName, password, avatar }) {
  //1. Update password OR fullname
  let updateData;
  if (password) updateData = { data: { password } };
  if (fullName) updateData = { data: { fullName } };

  const { data, error: updateUserError } = await supabase.auth.updateUser(
    updateData
  );

  if (updateUserError)
    throw new Error("There was a problem while updating user details");
  console.log(data);
  if (!avatar) return data;

  //2. Upload the avatar images
  const fileName = `avatar-${data.user.id}-${Math.random()}`;

  const { error: storageError } = await supabase.storage
    .from("avatars")
    .upload(fileName, avatar);

  if (storageError)
    throw new Error("There was a problem while uploading the avatar image");

  //3. Update avatar in the user
  const { data: updatedUser, error: updateAvatarError } =
    await supabase.auth.updateUser({
      data: {
        avatar: `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`,
      },
    });

  if (updateAvatarError)
    throw new Error("There was a problem while updating the avatar image");

  return updatedUser;
}
