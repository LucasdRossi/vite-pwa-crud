import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import LinkText from "../../components/LinkText";
import useAuth from "./useAuth";

export default function Login() {
  const { login, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    logout();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { email, password } = e.currentTarget;

    const { error } = await login(email.value, password.value);
    if (!error) navigate("/", { replace: true });
  };

  const handleRegister = () => {
    navigate("/register");
  };

  return (
    <>
      <Header goHome />
      <div className="flex justify-center">
        <form
          onSubmit={handleSubmit}
          className="xl:w-2/5 lg:w-2/5 md:w-4/5 w-4/5 mt-52 h-72 px-5 text-lg shadow-md rounded-md flex flex-col justify-center"
        >
          <div className="w-full flex flex-col">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              required
              name="email"
              className="peer rounded-sm shadow-sm border h-11 px-3"
            />
          </div>
          <div className="w-full flex flex-col mt-5">
            <label htmlFor="password">Password</label>
            <input
              required
              name="password"
              id="password"
              type="password"
              className="rounded-sm shadow-sm border h-11 px-3"
            />
          </div>
          <div className="mt-7 w-full flex justify-end">
            <button onClick={handleRegister}>
              <LinkText className="mr-4">Register</LinkText>
            </button>
            <button type="submit">
              <LinkText>Login</LinkText>
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
