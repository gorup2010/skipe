import { FC, memo } from "react";
import { Link } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { TextInput } from "@/components/ui/input";
import { LoginSpinner } from "@/components/ui/spinner";
import { useLogin } from "@/hooks/use-login";
import { loginInputSchema, LoginInput } from "@/lib/auth";

const Login: FC = memo(() => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginInputSchema),
  });
  const { login, isPending, isError, errorMessage } = useLogin();

  const handleLogin: SubmitHandler<LoginInput> = async (data: LoginInput) => {
    login(data);
  };

  return (
    <div className="h-screen">
      {/* <!-- Global Container --> */}
      <div className="flex items-center justify-center min-h-screen bg-blue-50">
        {/* <!-- Card Container --> */}
        <div className="relative flex flex-col m-6 space-y-10 bg-white shadow-2xl rounded-2xl md:flex-row md:space-y-0 md:m-0">
          {/* <!-- Left Side --> */}
          <div className="p-20">
            {/* <!-- Top Content --> */}
            <h2 className="font-mono mb-5 text-4xl font-bold">{"Đăng nhập"}</h2>
            <form onSubmit={handleSubmit(handleLogin)}>
              <div className="my-6">
                <TextInput
                  type="text"
                  placeholder={"Nhập username"}
                  label="username"
                  register={register}
                  errors={errors}
                  validatedObject={{}}
                />
              </div>
              <div className="my-6">
                <TextInput
                  type="password"
                  placeholder={"Nhập mặt khẩu"}
                  label="password"
                  register={register}
                  errors={errors}
                  validatedObject={{}}
                />
              </div>
              {isError && (
                <div>
                  <p className="text-red-600 text-sm">{errorMessage}</p>
                </div>
              )}
              {/* <!-- Middle Content --> */}
              <div className="flex flex-col items-center justify-between mt-6 space-y-6  md:flex-row md:space-y-0 md:space-x-6">
                <button disabled={isPending} type="submit" className="w-full md:w-auto flex justify-center items-center p-4 space-x-2 font-sans font-bold text-white rounded-md px-9 bg-blue-500  shadow-cyan-100 hover:bg-opacity-90 shadow-sm hover:shadow-lg border transition hover:-translate-y-0.5 duration-150">
                  <span>{"Đăng nhập"}</span>
                  {isPending ? (
                    <LoginSpinner className="w-4 h-4" />
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="#ffffff"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <line x1="13" y1="18" x2="19" y2="12" />
                      <line x1="13" y1="6" x2="19" y2="12" />
                    </svg>
                  )}
                </button>

                <Link to="/register">
                  <button className="w-full md:w-auto flex justify-center items-center p-4 space-x-2 font-sans font-bold text-blue-500 outline outline-blue-500 bg-white rounded-md px-9 shadow-cyan-100 hover:bg-opacity-90 shadow-sm hover:shadow-lg border transition hover:-translate-y-0.5 duration-150">
                    {"Đăng ký"}
                  </button>
                </Link>
              </div>
            </form>

            {/* <!-- Border --> */}
            <div className="mt-12 border-b border-b-gray-300"></div>
          </div>

          {/* <!-- Close Button --> */}
          {/* <Link to="/">
            <div className="group absolute hidden -top-5 right-4 md:flex items-center justify-center w-10 h-10 bg-gray-200 rounded-full md:bg-white md:top-4 hover:cursor-pointer hover:-translate-y-0.5 transition duration-150">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 text-black group-hover:text-gray-600"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </div>
          </Link> */}
        </div>
      </div>
    </div>
  );
});

export default Login;
