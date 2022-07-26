import { Dialog } from "@reach/dialog";
import "@reach/dialog/styles.css";
import { useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import LinkText from "../../components/LinkText";
import useAthletes from "../athlete/useAthletes";
import useCompanies from "./useCompanies";

export default function () {
  const { athletes } = useAthletes();
  const { getCompany, updateCompany } = useCompanies();
  const navigation = useNavigate();
  const { id } = useParams<"id">();

  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (id) fetchCompany();
  }, []);

  const fetchCompany = async () => {
    const data = await getCompany(Number(id));

    if (!data.error && formRef.current) {
      formRef.current.companyName.value = data.payload.name;
      formRef.current.description.value = data.payload.description;
    }
  };

  const onDismiss = () => {
    navigation("/companies");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { companyName, description } = e.currentTarget;

    const { error } = await updateCompany({
      id: Number(id),
      name: companyName.value,
      description: description.value,
    });

    if (!error) onDismiss();
  };

  return (
    <Dialog
      isOpen
      onDismiss={onDismiss}
      aria-labelledby="edit company"
      className="rounded-lg shadow-md sm:w-screen lg:w-3/6"
    >
      <h1 className="text-xl">Edit Company</h1>
      <form ref={formRef} onSubmit={handleSubmit}>
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
