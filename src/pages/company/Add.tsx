import { Dialog } from "@reach/dialog";
import "@reach/dialog/styles.css";
import { useNavigate } from "react-router-dom";
import LinkText from "../../components/LinkText";
import useCompanies from "./useCompanies";

export default function () {
  const navigate = useNavigate();
  const { addCompany } = useCompanies();

  const onDismiss = () => {
    navigate("/companies");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { companyName, description } = e.currentTarget;

    const { error } = await addCompany({
      name: companyName.value,
      description: description.value,
    });

    if (!error) onDismiss();
  };

  return (
    <Dialog
      isOpen
      onDismiss={onDismiss}
      aria-labelledby="add company"
      className="rounded-lg shadow-md sm:w-screen lg:w-3/6"
    >
      <h1 className="text-xl">Add Company</h1>
      <form onSubmit={handleSubmit}>
        <div className="w-full flex flex-col mt-5">
          <label htmlFor="companyName">Name</label>
          <input
            required
            name="companyName"
            id="companyName"
            className="rounded-sm shadow-sm border h-11 px-3"
          />
        </div>
        <div className="w-full flex flex-col mt-5">
          <label htmlFor="description">Description</label>
          <input
            required
            name="description"
            id="description"
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
