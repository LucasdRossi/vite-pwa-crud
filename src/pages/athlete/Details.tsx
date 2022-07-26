import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import useAthletes, { AthleteDetails } from "./useAthletes";
import { Dialog } from "@reach/dialog";
import "@reach/dialog/styles.css";
import useAuth from "../auth/useAuth";
import LinkText from "../../components/LinkText";

export default function () {
  const [athlete, setAthlete] = useState<AthleteDetails>();

  const { getAthlete, removeAthlete } = useAthletes();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { id } = useParams<"id">();

  useEffect(() => {
    if (id) fetchAthlete(id);

    return () => {
      setAthlete(undefined);
    };
  }, []);

  const fetchAthlete = async (id: string) => {
    const data = await getAthlete(Number(id));

    if (!data.error) {
      setAthlete(data.payload);
    }
  };

  const handleEdit = () => {
    if (id) navigate(`/athletes/edit/${id}`);
  };

  const handleRemove = async () => {
    if (id) {
      const { error } = await removeAthlete(Number(id));
      if (!error) onDismiss();
    }
  };

  const onDismiss = () => {
    navigate("/athletes");
  };

  return (
    <Dialog
      isOpen
      onDismiss={onDismiss}
      aria-labelledby="athlete details"
      className="rounded-lg shadow-md sm:w-screen lg:w-3/6"
    >
      {!athlete ? (
        <p>Loading...</p>
      ) : (
        <div>
          <h1>
            Athlete {athlete.firstName} {athlete.lastName}
          </h1>
          <p>Id: {athlete.id}</p>
          <p>Age: {athlete.age}</p>
          {athlete.company && (
            <p>
              Company:{" "}
              <Link
                to={`/companies/${athlete.company.id}`}
                className="text-blue-500 hover:text-blue-700 cursor-pointer"
              >
                {athlete.company.name}
              </Link>
            </p>
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
