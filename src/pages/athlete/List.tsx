import useAthletes from "./useAthletes";
import Header from "../../components/Header";
import LinkText from "../../components/LinkText";
import { Link, Outlet, useNavigate } from "react-router-dom";
import useAuth from "../auth/useAuth";

const tableClasses = {
  table:
    "h-5/6 overflow-y-scroll w-full h-auto border-collapse border-2 border-zinc-300 rounded-md shadow-md text-lg",
  thead: "bg-zinc-100 text-zinc-500",
  th: "text-left p-3 border-b border-zinc-300 border-solid",
  tbody: "bg-white ",
  tr: "hover:bg-zinc-100",
  td: "p-3 border-b border-zinc-300 cursor-pointer",
};

export default function () {
  const { athletes } = useAthletes();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleClick = (id: number) => {
    navigate(`/athletes/${id}`);
  };

  return (
    <>
      <Header goHome login />
      <table className={tableClasses.table}>
        <thead className={tableClasses.thead}>
          <tr className={tableClasses.tr}>
            <th className={tableClasses.th}>ID</th>
            <th className={tableClasses.th}>First Name</th>
            <th className={tableClasses.th}>Last Name</th>
            <th className={tableClasses.th}>Age</th>
          </tr>
        </thead>
        <tbody className={tableClasses.tbody}>
          {athletes.map((athlete) => (
            <tr
              className={tableClasses.tr}
              key={athlete.id}
              onClick={() => handleClick(athlete.id)}
            >
              <td className={tableClasses.td}>{athlete.id}</td>
              <td className={tableClasses.td}>{athlete.firstName}</td>
              <td className={tableClasses.td}>{athlete.lastName}</td>
              <td className={tableClasses.td}>{athlete.age}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {isAuthenticated && (
        <footer className="absolute bottom-5 right-5">
          <Link to="/athletes/add">
            <LinkText>Add ⛹🏼‍♂️</LinkText>
          </Link>
        </footer>
      )}
      <Outlet />
    </>
  );
}
