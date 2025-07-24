import { useQuery } from '@tanstack/react-query';
import { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import tireApi from '../services/api/requests/tire';
import {
  defaultTireContext,
  type Props,
  type TireContextType,
} from './typeTire';

const TireContext = createContext<TireContextType>(defaultTireContext);

export function TireProvider({ children }: Props) {
  const [currentId, setCurrentId] = useState<number | null>(null);
  const navigate = useNavigate();

  function handleCurrentDetail(value: number | null) {
    setCurrentId(value);
  }

  const isValidId = currentId !== null && !isNaN(currentId);

  const { data: tire, isLoading } = useQuery({
    queryKey: ['tire', currentId],
    queryFn: () => tireApi.getTire(Number(currentId!)),
    staleTime: 60000,
    enabled: isValidId,
  });

  useEffect(() => {
    if (currentId != null) {
      navigate(`/tire/${currentId}`);
    }
  }, [currentId, navigate]);

  return (
    <TireContext.Provider
      value={{
        tire,
        isLoading,
        currentId,
        handleCurrentDetail,
      }}
    >
      {children}
    </TireContext.Provider>
  );
}
export default TireContext;
