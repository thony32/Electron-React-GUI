import { createContext, useState } from "react";
import { ProviderProps } from "../utils";

export const LoadedContext = createContext<any | undefined>(undefined)

export const LoadedContextProvider = ({ children }: ProviderProps) => {
  const [loaded, setLoaded] = useState<any>(false)

  return <LoadedContext.Provider value={{ loaded, setLoaded }}>{children}</LoadedContext.Provider>
}

export default LoadedContext