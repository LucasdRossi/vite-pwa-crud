import { useNavigate } from "react-router-dom";
import LinkText from "../../components/LinkText";
import useAuth from "./useAuth";

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { email, password, confirmation } = e.currentTarget;

    if (password.value === confirmation.value) {
      const { error } = await register(email.value, password.value);

      if (!error) navigate("/login", { replace: true });
    }
  };

  const handleGoBack = () => {
    navigate("/login");
  };

  return (
    <div className="flex justify-center w-full h-scree">
      <form
        onSubmit={handleSubmit}
        className="xl:w-2/5 lg:w-2/5 md:w-4/5 sm:w-4/5 mt-52 h-96 px-5 text-lg shadow-md rounded-md bg-white flex flex-col justify-center"
      >
        <div className="w-full flex flex-col mt-5">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            required
            className="rounded-sm shadow-sm border h-11 px-3"
          />
        </div>
        <div className="w-full flex flex-col mt-5">
          <label htmlFor="password">Password</label>
          <input
            required
            id="password"
            name="password"
            type="password"
            className="rounded-sm shadow-sm border h-11 px-3"
          />
        </div>
        <div className="w-full flex flex-col mt-5">
          <label htmlFor="confirmation">Confirm Password</label>
          <input
            required
            id="confirmation"
            name="confirmation"
            type="password"
            className="rounded-sm shadow-sm border h-11 px-3"
          />
        </div>
        <div className="mt-7 w-full flex justify-end">
          <button onClick={handleGoBack}>
            <LinkText className="mr-4">Return</LinkText>
          </button>
          <button type="submit">
            <LinkText>Register</LinkText>
          </button>
        </div>
      </form>
    </div>
  );
}
