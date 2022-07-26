import { Link, Outlet, useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import LinkText from "../../components/LinkText";
import useAuth from "../auth/useAuth";
import useCompanies from "./useCompanies";

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
  const { companies } = useCompanies();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleClick = (id: number) => {
    navigate(`/companies/${id}`);
  };

  return (
    <>
      <Header goHome login />
      <table className={tableClasses.table}>
        <thead className={tableClasses.thead}>
          <tr className={tableClasses.tr}>
            <th className={tableClasses.th}>ID</th>
            <th className={tableClasses.th}>Name</th>
            <th className={tableClasses.th}>Description</th>
          </tr>
        </thead>
        <tbody className={tableClasses.tbody}>
          {companies.map((company) => (
            <tr
              className={tableClasses.tr}
              key={company.id}
              onClick={() => handleClick(company.id)}
            >
              <td className={tableClasses.td}>{company.id}</td>
              <td className={tableClasses.td}>{company.name}</td>
              <td className={tableClasses.td}>{company.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {isAuthenticated && (
        <footer className="absolute bottom-5 right-5">
          <Link to="/companies/add">
            <LinkText>Add 🏢</LinkText>
          </Link>
        </footer>
      )}
      <Outlet />
    </>
  );
}
