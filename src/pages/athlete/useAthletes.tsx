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
import useAuth from "../auth/useAuth";
import type { Company } from "../company/useCompanies";

export interface Athlete {
  id: number;
  firstName: string;
  lastName: string;
  age: number;
}

export interface AthleteDetails extends Athlete {
  company?: Company;
}

interface AthletesContextData {
  athletes: Athlete[];
  isLoading: boolean;

  addAthlete: (
    athlete: Omit<Athlete, "id">
  ) => Promise<ValidationResponse | PayloadResponse<Athlete>>;
  removeAthlete: (id: number) => Promise<MessageResponse>;
  updateAthlete: (
    athlete: Athlete & { companyId?: number }
  ) => Promise<ValidationResponse | PayloadResponse<AthleteDetails>>;
  getAthlete: (id: number) => Promise<PayloadResponse<AthleteDetails>>;
}

const AthletesContext = createContext({} as AthletesContextData);

export function AthletesProvider({ children }: { children: React.ReactNode }) {
  const [athletes, setAthletes] = useState<Athlete[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { token } = useAuth();

  const fetchAthletes = useCallback(async () => {
    setIsLoading(true);
    const data = await makeRequest<PayloadResponse<Athlete[]>>("/athlete");
    setAthletes(data.payload);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchAthletes();
  }, []);

  const addAthlete = useCallback(
    async (athlete: Omit<Athlete, "id">) => {
      setIsLoading(true);
      const response = await makeRequest<
        ValidationResponse | PayloadResponse<Athlete>
      >("/athlete", {
        method: "POST",
        data: athlete,
        token,
      });
      fetchAthletes();
      return response;
    },
    [fetchAthletes, token]
  );

  const removeAthlete = useCallback(
    async (id: number) => {
      setIsLoading(true);
      const response = await makeRequest<MessageResponse>(`/athlete/${id}`, {
        method: "DELETE",
        token,
      });
      fetchAthletes();
      return response;
    },
    [fetchAthletes, token]
  );

  const updateAthlete = useCallback(
    async (athlete: Athlete & { companyId?: number }) => {
      setIsLoading(true);
      const response = await makeRequest<
        ValidationResponse | PayloadResponse<AthleteDetails>
      >(`/athlete/${athlete.id}`, {
        method: "PUT",
        data: athlete,
        token,
      });
      fetchAthletes();
      return response;
    },
    [fetchAthletes, token]
  );

  const getAthlete = useCallback(
    async (id: number) => {
      setIsLoading(true);
      const data = await makeRequest<PayloadResponse<AthleteDetails>>(
        `/athlete/${id}`
      );
      setIsLoading(false);
      return data;
    },
    [fetchAthletes]
  );

  return (
    <AthletesContext.Provider
      value={{
        athletes,
        addAthlete,
        removeAthlete,
        updateAthlete,
        isLoading,
        getAthlete,
      }}
    >
      {children}
    </AthletesContext.Provider>
  );
}

export default function () {
  return useContext(AthletesContext);
}
