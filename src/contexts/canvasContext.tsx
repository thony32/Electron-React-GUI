import { createContext, ReactNode } from "react"

// Définir le type pour le context
interface ContextTypes {
  myFunction: () => void // Remplacez le type de retour et les paramètres en fonction de votre fonction.
}

const CanvasContext = createContext<ContextTypes | undefined>(undefined)

// Créez un provider pour envelopper votre application
interface ProviderProps {
  children: ReactNode
}

export const FunctionProvider = ({ children }: ProviderProps) => {
  // La fonction que vous souhaitez partager
  function myFunction() {
    // ...
  }

  const contextValue: ContextTypes = {
    myFunction,
  }

  return <CanvasContext.Provider value={contextValue}>{children}</CanvasContext.Provider>
}

export default CanvasContext
