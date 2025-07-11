import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign In",
};

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex justify-center items-center w-full min-h-screen">
      {children}
    </div>
  );
};

export default AuthLayout;
