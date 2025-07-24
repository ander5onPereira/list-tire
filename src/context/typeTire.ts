import type { TireItem } from "../services/api/requests/tire/types";

export interface TireContextType {
  isLoading: boolean;
  tire: TireItem | null | undefined;
  handleCurrentDetail: (value: number | null) => void;
  currentId: number | null;
}
export const defaultTireContext: TireContextType = {
  isLoading: false,
  tire: undefined,
  handleCurrentDetail: () => {},
  currentId: null,}

  export interface Props {
  children: React.ReactNode;
}