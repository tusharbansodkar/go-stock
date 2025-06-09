import { useForm } from "react-hook-form";
import ControlledInput from "../components/shared/ControlledInput";
import { Button } from "@/components/ui/button";
import { useContext, useEffect } from "react";
import { AuthContext } from "@/context";
import { showToast } from "@/utils/toast";
import axios from "axios";

const Profile = () => {
  const { user, updateProfileDetails } = useContext(AuthContext);

  const { control, handleSubmit, reset } = useForm({
    mode: "onChange",
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    if (user) {
      reset({
        fullName: `${user.firstName} ${user.lastName}`,
        email: user.email,
        password: "",
      });
    }
  }, [user]);

  const onSubmit = async (data) => {
    const { fullName, email, password } = data;
    const payload = { email };
    const nameParts = fullName.split(" ");
    payload.firstName = nameParts[0];
    payload.lastName = nameParts.slice(1).join(" ");
    if (password) {
      payload.password = password;
    }
    try {
      await axios.put("http://localhost:5000/api/user/profile", payload, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const { firstName, lastName } = payload;
      updateProfileDetails({ firstName, lastName, email });
      showToast.success("Profile updated successfully!");
    } catch (error) {
      showToast.error(
        error.response?.data?.message || "Failed to update profile."
      );
    }
  };

  return (
    <div className="h-screen p-4 overflow-auto ">
      <div className="w-[80%] m-auto">
        <h2 className="font-bold text-3xl tracking-wide">Profile</h2>
        <hr className="border-gray-300 border-1 mt-4" />
        <form
          className="flex flex-col w-[60%] m-auto gap-y-2 mt-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <ControlledInput
            label="Name:"
            control={control}
            name="fullName"
            rules={{ required: "Name is required" }}
          />
          <ControlledInput
            label="Email:"
            control={control}
            name="email"
            rules={{ required: "Email is required" }}
          />
          <ControlledInput
            label="New Password (leave blank to keep current):"
            control={control}
            name="password"
            placeholder="Enter new password"
            type="password"
            rules={{
              // Password is not required, but if entered, it must meet criteria
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters long",
              },
            }}
          />

          <Button
            type="submit"
            className="w-full cursor-pointer bg-[#7C444F] hover:bg-[#9F5255] drop-shadow-sm drop-shadow-[#7c444f] hover:drop-shadow-[#9f5255]"
          >
            Save Changes
          </Button>
        </form>
      </div>
    </div>
  );
};
export default Profile;
