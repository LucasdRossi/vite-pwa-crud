import { Link } from "react-router-dom";
import useAuth from "../pages/auth/useAuth";
import LinkText from "../components/LinkText";

interface HeaderProps {
  login?: boolean;
  goHome?: boolean;
}

export default function (props: HeaderProps) {
  const { isAuthenticated, logout } = useAuth();

  return (
    <header className="relative h-20 w-full pt-4">
      {props.goHome && (
        <Link to="/" className="mr-4 self-start absolute left-3">
          <LinkText>🏠 Home</LinkText>
        </Link>
      )}
      {props.login &&
        (!isAuthenticated ? (
          <Link to="/login" className="mr-4 absolute right-0">
            <LinkText>Login 🔑</LinkText>
          </Link>
        ) : (
          <button onClick={logout} className="mr-4 absolute right-0">
            <LinkText>Logout 🚪</LinkText>
          </button>
        ))}
    </header>
  );
}
