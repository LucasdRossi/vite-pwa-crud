import { Link } from "react-router-dom";
import Header from "../components/Header";

export default function Home() {
  return (
    <>
      <Header login />
      <main className="flex justify-center items-center h-96 flex-col md:flex-row">
        <ListCard title="Athletes ⛹🏼‍♂️" to="/athletes" />
        <ListCard title="Companies 🏢" to="/companies" />
      </main>
    </>
  );
}

interface ListCardProps {
  title: string;
  to: string;
}

function ListCard(props: ListCardProps) {
  return (
    <Link
      to={props.to}
      className="w-96 hover:bg-zinc-300 cursor-pointer hover:shadow-xl transition-all rounded-md h-52 text-3xl flex justify-center items-center shadow-md m-10"
    >
      <p>{props.title}</p>
    </Link>
  );
}
