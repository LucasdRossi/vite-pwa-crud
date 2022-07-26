import { Dialog } from "@reach/dialog";
import "@reach/dialog/styles.css";
import { useNavigate } from "react-router-dom";
import LinkText from "../../components/LinkText";
import useAthletes from "./useAthletes";

export default function () {
  const navigate = useNavigate();
  const { addAthlete } = useAthletes();

  const onDismiss = () => {
    navigate("/athletes");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { firstName, lastName, age } = e.currentTarget;

    const { error } = await addAthlete({
      firstName: firstName.value,
      lastName: lastName.value,
      age: Number(age.value),
    });

    if (!error) onDismiss();
  };

  return (
    <Dialog
      isOpen
      onDismiss={onDismiss}
      aria-labelledby="create athlete"
      className="rounded-lg shadow-md sm:w-screen lg:w-3/6"
    >
      <h1 className="text-xl">Add Athlete</h1>
      <form onSubmit={handleSubmit}>
        <div className="w-full flex flex-col mt-5">
          <label htmlFor="firstName">First Name</label>
          <input
            required
            name="firstName"
            id="firstName"
            className="rounded-sm shadow-sm border h-11 px-3"
          />
        </div>
        <div className="w-full flex flex-col mt-5">
          <label htmlFor="lastName">Last Name</label>
          <input
            required
            name="lastName"
            id="lastName"
            className="rounded-sm shadow-sm border h-11 px-3"
          />
        </div>
        <div className="w-full flex flex-col mt-5">
          <label htmlFor="age">Age</label>
          <input
            required
            name="age"
            id="age"
            type="number"
            className="rounded-sm shadow-sm border h-11 px-3"
          />
        </div>
        <div className="mt-7 w-full flex justify-end">
          <button type="submit">
            <LinkText>Submit</LinkText>
          </button>
        </div>
      </form>
    </Dialog>
  );
}
