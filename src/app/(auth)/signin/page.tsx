"use client";

import LoaderScreen from "@/src/components/global/app-loading/LoaderScreen";
import { SubmitButton } from "@/src/components/global/ui/auth/Button";
import Input from "@/src/components/global/ui/auth/Input";
import { signInUser } from "@/src/lib/actions/auth";
import { getUserInfo } from "@/src/lib/actions/user";
import { useQueryClient } from "@tanstack/react-query";
import { LockKeyhole, Mail, ShoppingBag } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, Suspense } from "react"; // 1. Import Suspense
import { useForm } from "react-hook-form";
import { toast } from "sonner";
type FormValues = {
  email: string;
  password: string;
};

// 2. Rename the main logic component (This was your original SignInPage)
const SignInContent = () => {
  const queryClient = useQueryClient();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // This hook is the culprit! It needs to be inside Suspense.
  const searchParams = useSearchParams();
  const redirectTo = searchParams?.get("redirect") || "/ads/active";

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>();

  const onSubmit = async (data: FormValues) => {
    try {
      setLoading(true);
      await signInUser(data.email, data.password);
      const userData = await getUserInfo();
      queryClient.setQueryData(["user"], userData);
      toast(`Welcome Back! ${userData?.full_name}`, {
        description: "You have successfully logged in.",
      });
      setLoading(false);
      reset();

      router.push(redirectTo);
    } catch (error) {
      setLoading(false);
      if (error instanceof Error) {
        toast.error("Login Failed", {
          description: error.message as string,
        });
      }
    }
  };

  return (
    <div
      className={`h-dvh w-full flex justify-center items-center bg-hero-fade bg-cover bg-center `}
    >
      <div className="max-w-md w-full p-8 m-4 bg-white  rounded-2xl shadow auth-form-container backdrop-blur-sm!">
        <div className="flex flex-col items-center max-w-md w-full my-6 ">
          {/* <Image
            src={"/images/logo1.png"}
            height={60}
            width={230}
            alt="logo"
            className="h-full object-contain mx-auto mb-8"
          /> */}
          <div className="h-16 flex items-center  border-b border-slate-100 shrink-0">
            <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center mr-3">
              <ShoppingBag className="text-white" size={20} />
            </div>
          </div>
          <h2 className="font-bold text-2xl">Welcome Back!</h2>
          <span className="text-gray-500 text-sm text-center">
            Manage users, ads, plans, subscriptions, and more — all from one
            secure dashboard.
          </span>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4 p-2">
            <div>
              <Input
                type="email"
                placeholder="Email Address"
                icon={Mail}
                error={errors.email?.message as string}
                {...register("email", { required: "Email is required" })}
              />
            </div>
            <Input
              type="password"
              placeholder="Password"
              passwordType="confirmPassword"
              icon={LockKeyhole}
              error={errors.password?.message as string}
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters long",
                },
              })}
            />

            <SubmitButton isLoading={loading}>
              {loading ? "Signing In..." : "Sign In"}
            </SubmitButton>
          </div>
        </form>
      </div>
    </div>
  );
};

const SignInPage = () => {
  return (
    <Suspense fallback={<LoaderScreen />}>
      <SignInContent />
    </Suspense>
  );
};

export default SignInPage;
