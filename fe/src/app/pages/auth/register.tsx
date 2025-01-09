import { FC, memo } from 'react';
import { Link } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { useRegister } from '@/hooks/use-register';
import { LoginSpinner } from '@/components/ui/spinner';
import { TextInput } from '@/components/ui/input';
import { registerInputSchema, RegisterInput } from "@/lib/auth";


const Register: FC = memo(() => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterInput>({
    resolver: zodResolver(registerInputSchema),
  });
  const {
    register: registerUser,
    isPending,
    isSuccess,
    isError,
    errorMessage,
  } = useRegister();
  const handleRegister: SubmitHandler<RegisterInput> = (data) => {
    registerUser(data);
  };

  return (
    <div className="h-screen">
      {/* <!-- Global Container --> */}
      <div className="flex items-center justify-center min-h-screen bg-blue-50">
        {/* <!-- Card Container --> */}
        <div className="relative flex flex-col m-6 space-y-10 bg-white shadow-2xl rounded-2xl md:flex-row md:space-y-0 md:m-0">
          {/* <!-- Left Side --> */}
          <form
            onSubmit={handleSubmit(handleRegister)}
            className="p-6 md:p-20 space-y-4"
          >
            {/* <!-- Top Content --> */}
            <h2 className="font-mono mb-5 text-4xl font-bold">
              {"Đăng ký"}
            </h2>
            <div>
              <TextInput
                label="username"
                type="text"
                placeholder={"Nhập tài khoản"}
                register={register}
                errors={errors}
                validatedObject={{}}
              />
            </div>
            <div>
              <TextInput
                label="email"
                type="text"
                placeholder={"Nhập địa chỉ email"}
                register={register}
                errors={errors}
                validatedObject={{}}
              />
            </div>
            <div>
              <TextInput
                label="password"
                type="password"
                placeholder={"Nhập mật khẩu"}
                register={register}
                errors={errors}
                validatedObject={{}}
              />
            </div>
            <div>
              <TextInput
                label="confirmedPassword"
                type="password"
                placeholder={"Nhập lại mật khẩu"}
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
            {isSuccess && (
              <div>
                <p className="text-green-600 text-sm">{"Đăng ký thành công"}</p>
              </div>
            )}
            {/* <!-- Middle Content --> */}
            <div className="flex flex-col items-center justify-between mt-6 space-y-6  md:flex-row md:space-y-0 md:space-x-6">
              <div className="font-regular text-blue-500 hover:cursor-pointer">
                <Link to="/login">{"Đã có tài khoản?"}</Link>
              </div>

              <button
                disabled={isPending}
                className="w-full md:w-auto flex justify-center items-center p-4 space-x-2 font-sans font-bold text-white rounded-md px-9 bg-blue-500 shadow-cyan-100 hover:bg-opacity-90 shadow-sm hover:shadow-lg border transition hover:-translate-y-0.5 duration-150"
              >
                <span>{"Đăng ký"}</span>
                {isPending ? (
                  <LoginSpinner className="w-4 h-4 text-white" />
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-7"
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
            </div>
          </form>

          {/* <!-- Right Side --> */}
          {/* <img
            src={sideImage}
            alt=""
            className="w-[430px] h-[670px] hidden md:block"
          /> */}

        </div>
      </div>
    </div>
  );
});

export default Register;
