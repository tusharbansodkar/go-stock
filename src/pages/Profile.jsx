import { useForm } from "react-hook-form";
import ControlledInput from "../components/shared/ControlledInput";
import { Button } from "@/components/ui/button";

const Profile = () => {
  const { control, handleSubmit } = useForm({
    // mode: "all",
    defaultValues: {},
  });

  const onSubmit = (data) => {
    console.log(data);
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
          <div className="flex flex-col gap-2">
            <label htmlFor="fullName">Name:</label>
            <ControlledInput
              control={control}
              name="fullName"
              placeholder="your name"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="Email">Email:</label>
            <ControlledInput
              control={control}
              name="email"
              placeholder="your email"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="password">Password:</label>
            <ControlledInput
              control={control}
              name="password"
              placeholder="password"
            />
          </div>
          <Button
            type="submit"
            className="w-full cursor-pointer bg-[#7C444F] hover:bg-[#9F5255] drop-shadow-sm drop-shadow-[#7c444f] hover:drop-shadow-[#9f5255]"
          >
            Save
          </Button>
        </form>
      </div>
    </div>
  );
};
export default Profile;
