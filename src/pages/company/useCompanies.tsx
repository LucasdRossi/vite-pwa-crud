import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import makeRequest, {
  PayloadResponse,
  MessageResponse,
  ValidationResponse,
} from "../../api/makeRequest";
import type { Athlete } from "../athlete/useAthletes";
import useAuth from "../auth/useAuth";

export interface Company {
  id: number;
  name: string;
  description: string;
}

export interface CompanyDetails extends Company {
  athletes: Athlete[];
}

interface CompaniesContextData {
  companies: Company[];
  isLoading: boolean;

  addCompany: (
    company: Omit<Company, "id">
  ) => Promise<ValidationResponse | PayloadResponse<Company>>;
  removeCompany: (id: number) => Promise<MessageResponse>;
  updateCompany: (
    company: Company
  ) => Promise<ValidationResponse | PayloadResponse<CompanyDetails>>;
  getCompany: (id: number) => Promise<PayloadResponse<CompanyDetails>>;
}

const CompaniesContext = createContext({} as CompaniesContextData);

export function CompaniesProvider({ children }: { children: React.ReactNode }) {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { token } = useAuth();

  const fetchCompanies = useCallback(async () => {
    setIsLoading(true);
    const data = await makeRequest<PayloadResponse<Company[]>>("/company");
    setCompanies(data.payload);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchCompanies();
  }, []);

  const addCompany = useCallback(
    async (company: Omit<Company, "id">) => {
      setIsLoading(true);
      const response = await makeRequest<
        ValidationResponse | PayloadResponse<Company>
      >("/company", {
        method: "POST",
        data: company,
        token,
      });
      fetchCompanies();
      return response;
    },
    [fetchCompanies, token]
  );

  const removeCompany = useCallback(
    async (id: number) => {
      setIsLoading(true);
      const response = await makeRequest<MessageResponse>(`/company/${id}`, {
        method: "DELETE",
        token,
      });
      fetchCompanies();
      return response;
    },
    [fetchCompanies, token]
  );

  const updateCompany = useCallback(
    async (company: Company) => {
      setIsLoading(true);
      const response = await makeRequest<
        ValidationResponse | PayloadResponse<CompanyDetails>
      >("/company", {
        method: "PUT",
        data: company,
        token,
      });
      fetchCompanies();
      return response;
    },
    [fetchCompanies, token]
  );

  const getCompany = useCallback(
    async (id: number) => {
      setIsLoading(true);
      const response = await makeRequest<PayloadResponse<CompanyDetails>>(
        `/company/${id}`
      );
      setIsLoading(false);
      return response;
    },
    [fetchCompanies]
  );

  return (
    <CompaniesContext.Provider
      value={{
        companies,
        addCompany,
        removeCompany,
        updateCompany,
        isLoading,
        getCompany,
      }}
    >
      {children}
    </CompaniesContext.Provider>
  );
}

export default function () {
  return useContext(CompaniesContext);
}
