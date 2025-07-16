import ImageSlider from "@/components/shared/ImageSlider";
import ControlledInput from "@/components/shared/ControlledInput";
import { Eye, EyeOff } from "lucide-react";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { FaFacebookF, FaGoogle } from "react-icons/fa";
import { AuthContext } from "../context";
import Header from "@/components/shared/Header";
import { useNavigate } from "react-router-dom";
import "animate.css";
import SwitchTheme from "@/components/shared/SwitchTheme";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm({
    mode: "all",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    let { email, password } = data;
    await login(email, password);
    // Redirect to home page after successful login
    navigate("/dashboard");
  };

  return (
    <>
      <div className="flex justify-center items-center h-screen md:space-x-15 lg:space-x-50 animate__animated animate__fadeIn">
        <ImageSlider />
        <div className="w-[80%] sm:w-96">
          <Header />
          <h2 className="scroll-m-20 border-b pb-1 text-3xl font-semibold tracking-tight first:mt-0">
            Login
          </h2>
          <p className="leading-7 [&:not(:first-child)]:mt-4">
            Don't have an account?{" "}
            <span>
              <a href="/signup" className="text-primary underline ">
                Sign up
              </a>
            </span>
          </p>

          <form
            className="flex flex-col gap-y-2 mt-2"
            onSubmit={handleSubmit(onSubmit)}
          >
            <ControlledInput
              control={control}
              name="email"
              placeholder="Email"
              type="email"
              rules={{ required: "Email is required" }}
              autoFocus={true}
            />
            <div className="relative">
              <ControlledInput
                control={control}
                name="password"
                placeholder="Enter your password"
                type={showPassword ? "text" : "password"}
                rules={{
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters long",
                  },
                }}
              />
            </div>

            <Button
              type="submit"
              className="w-full cursor-pointer bg-[#7C444F] hover:bg-[#9F5255] drop-shadow-sm drop-shadow-[#7c444f] hover:drop-shadow-[#9f5255]"
            >
              {isSubmitting ? "Logging in..." : "Log In"}
            </Button>

            <div className="flex items-center gap-4 text-sm text-muted-foreground ">
              <div className="flex-1 h-px bg-muted-foreground "></div>
              <span>Or log in with</span>
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
      <div className="absolute top-5 right-10">
        <SwitchTheme />
      </div>
    </>
  );
};
export default Login;
