import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { FaFacebookF, FaGoogle } from "react-icons/fa";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import ControlledInput from "../components/shared/ControlledInput";
import ImageSlider from "@/components/shared/ImageSlider";
import axios from "axios";
import { showToast } from "@/utils/toast";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const { control, handleSubmit, watch } = useForm({
    mode: "all",
    defaultValues: {
      firstName: "",
      lastName: "",
      password: "",
      confirmPassword: "",
      terms: false,
    },
  });
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const { firstName, lastName, email, password } = data;
      await axios.post("http://localhost:5000/api/auth/register", {
        firstName,
        lastName,
        email,
        password,
      });

      showToast.success("Account created successfully");
      navigate("/");
    } catch (error) {
      console.error(
        "Signup error:",
        error.response?.data?.message || "Signup failed. Please try again."
      );

      showToast.error(
        error.response?.data?.message || "Signup failed. Please try again."
      );
    }
  };

  let passwordValue = watch("password");

  return (
    <div className="flex justify-center items-center h-screen md:space-x-15 lg:space-x-50">
      <ImageSlider />
      <div className="w-[80%] sm:w-96">
        <h2 className="scroll-m-20 border-b pb-1 text-3xl font-semibold tracking-tight first:mt-0">
          Create an account
        </h2>
        <p className="leading-7 [&:not(:first-child)]:mt-4">
          Already have an account?{" "}
          <span>
            <a href="/" className="text-primary underline ">
              Log in
            </a>
          </span>
        </p>

        <form
          className="flex flex-col gap-y-2 mt-2"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="grid  grid-cols-2 gap-x-3">
            <ControlledInput
              control={control}
              name="firstName"
              placeholder="First name"
              rules={{ required: "First name is required" }}
              autoFocus={true}
            />
            <ControlledInput
              control={control}
              name="lastName"
              placeholder="Last name"
              rules={{ required: "Last name is required" }}
            />
          </div>
          <ControlledInput
            control={control}
            name="email"
            placeholder="Email"
            type="email"
            rules={{ required: "Email is required" }}
          />
          <div>
            <ControlledInput
              control={control}
              name="password"
              placeholder="Enter your password"
              type="password"
              rules={{
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters long",
                },
              }}
            />
          </div>
          <div>
            <ControlledInput
              control={control}
              name="confirmPassword"
              placeholder="Confirm your password"
              type="password"
              rules={{
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters long",
                },
                validate: (value) =>
                  value === passwordValue || "Passwords do not match",
              }}
            />
          </div>
          <Controller
            name="terms"
            control={control}
            rules={{ required: "You must accept the terms and conditions" }}
            render={({ field, fieldState }) => (
              // container for checkbox, label and error message
              <div className=" h-[40px]">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="terms"
                    // use field props provided by Controller
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    ref={field.ref}
                    className={`cursor-pointer ${
                      fieldState.error ? "border-red-500" : ""
                    }`}
                  />
                  <label
                    htmlFor="terms"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                  >
                    I agree to the{" "}
                    <span className="underline">Terms and Conditions</span>
                  </label>
                </div>
                {/* display error message if validaiton fails */}
                {fieldState.error && (
                  <p className="text-sm text-red-500 ">
                    {fieldState.error.message}
                  </p>
                )}
              </div>
            )}
          />

          <Button
            type="submit"
            className="w-full cursor-pointer bg-[#7C444F] hover:bg-[#9F5255] drop-shadow-sm drop-shadow-[#7c444f] hover:drop-shadow-[#9f5255]"
          >
            Sign Up
          </Button>

          <div className="flex items-center gap-4 text-sm text-muted-foreground ">
            <div className="flex-1 h-px bg-muted-foreground "></div>
            <span>Or register with</span>
            <div className="flex-1 h-px bg-muted-foreground"></div>
          </div>
          <div className="grid grid-cols-2 gap-x-3">
            <Button variant="outline">
              <FaFacebookF /> Facebook
            </Button>
            <Button variant="outline">
              <FaGoogle /> Google
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default Signup;
