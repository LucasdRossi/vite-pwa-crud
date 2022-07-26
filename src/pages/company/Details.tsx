import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import useAuth from "../auth/useAuth";
import useCompanies, { CompanyDetails } from "./useCompanies";
import { Dialog } from "@reach/dialog";
import "@reach/dialog/styles.css";
import LinkText from "../../components/LinkText";

export default function () {
  const [company, setCompany] = useState<CompanyDetails>();

  const { getCompany, removeCompany } = useCompanies();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { id } = useParams<"id">();

  useEffect(() => {
    if (id) fetchCompany(id);
  }, []);

  const fetchCompany = async (id: string) => {
    const data = await getCompany(Number(id));

    if (!data.error) {
      setCompany(data.payload);
    }
  };

  const handleEdit = () => {
    if (id) navigate(`/companies/edit/${id}`);
  };

  const handleRemove = async () => {
    if (id) {
      const { error } = await removeCompany(Number(id));
      if (!error) onDismiss();
    }
  };

  const onDismiss = () => {
    navigate("/companies");
  };

  return (
    <Dialog
      isOpen
      onDismiss={onDismiss}
      aria-labelledby="company details"
      className="rounded-lg shadow-md sm:w-screen lg:w-3/6"
    >
      {!company ? (
        <p>Loading...</p>
      ) : (
        <div>
          <h1>Company {company.name}</h1>
          <p>Description: {company.description}</p>
          {company.athletes.length > 0 && (
            <>
              <p>Athletes:</p>
              {company.athletes.map((athlete) => (
                <p key={athlete.id}>
                  <Link
                    to={`/athletes/${athlete.id}`}
                    className="text-blue-500 hover:text-blue-700 cursor-pointer"
                  >
                    {athlete.firstName} {athlete.lastName}
                  </Link>
                </p>
              ))}
            </>
          )}
        </div>
      )}
      {isAuthenticated && (
        <footer className="flex justify-end">
          <button onClick={handleRemove} className="mr-2">
            <LinkText>Remove</LinkText>
          </button>
          <button onClick={handleEdit}>
            <LinkText>Edit</LinkText>
          </button>
        </footer>
      )}
    </Dialog>
  );
}
