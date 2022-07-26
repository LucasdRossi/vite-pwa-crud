import Pages from "./pages";

import { AuthProvider } from "./pages/auth/useAuth";
import { AthletesProvider } from "./pages/athlete/useAthletes";
import { CompaniesProvider } from "./pages/company/useCompanies";

function App() {
  return (
    <AuthProvider>
      <AthletesProvider>
        <CompaniesProvider>
          <Pages />
        </CompaniesProvider>
      </AthletesProvider>
    </AuthProvider>
  );
}

export default App;
