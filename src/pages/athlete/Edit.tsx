import { Dialog } from "@reach/dialog";
import "@reach/dialog/styles.css";
import { useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import LinkText from "../../components/LinkText";
import useCompanies from "../company/useCompanies";
import useAthletes from "./useAthletes";

export default function () {
  const { companies } = useCompanies();
  const { getAthlete, updateAthlete } = useAthletes();
  const navigation = useNavigate();
  const { id } = useParams<"id">();

  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (id) fetchAthlete();
  }, []);

  const fetchAthlete = async () => {
    const data = await getAthlete(Number(id));

    if (!data.error && formRef.current) {
      formRef.current.firstName.value = data.payload.firstName;
      formRef.current.lastName.value = data.payload.lastName;
      formRef.current.age.value = data.payload.age.toString();

      if (data.payload.company) {
        formRef.current.company.value = data.payload.company.id.toString();
      }
    }
  };

  const onDismiss = () => {
    navigation("/athletes");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { firstName, lastName, age, company: formCompany } = e.currentTarget;

    const { error } = await updateAthlete({
      id: Number(id),
      firstName: firstName.value,
      lastName: lastName.value,
      age: Number(age.value),
      companyId: Number(formCompany.value),
    });

    if (!error) onDismiss();
  };

  return (
    <Dialog
      isOpen
      onDismiss={onDismiss}
      aria-labelledby="edit athlete"
      className="rounded-lg shadow-md w-screen lg:w-3/6"
    >
      <h1 className="text-xl">Add Athlete</h1>
      <form onSubmit={handleSubmit} ref={formRef}>
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
        <div className="w-full flex flex-col mt-5">
          <label htmlFor="company">Company</label>
          <select
            name="company"
            id="company"
            className="rounded-sm shadow-sm border h-11 px-3"
            defaultValue={""}
          >
            <option value="" disabled>
              Select a company
            </option>
            {companies.map((company) => (
              <option key={company.id} value={company.id}>
                {company.name}
              </option>
            ))}
          </select>
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
