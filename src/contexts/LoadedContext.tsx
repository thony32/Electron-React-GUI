import { createContext, useState } from "react";

export const LoadedContext = createContext<any | undefined>(undefined)

export const LoadedContextProvider = ({ children }: any) => {
  const [loaded, setLoaded] = useState<any>(false)

  return <LoadedContext.Provider value={{ loaded, setLoaded }}>{children}</LoadedContext.Provider>
}

export default LoadedContext