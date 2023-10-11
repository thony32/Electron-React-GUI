/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react"

import { Winter, Night, ThemeIcon } from "../../assets"

const ThemeChanger: React.FC = () => {
  useEffect(() => {
    if (localStorage.getItem("theme") != null) {
      document
        .getElementById("app")!
        .setAttribute("data-theme", localStorage.getItem("theme") as any)
      window.dispatchEvent(new Event("themeChanged"))
    } else {
      localStorage.setItem("theme", "light")
      document.getElementById("app")!.setAttribute("data-theme", "light")
      window.dispatchEvent(new Event("themeChanged"))
    }
  }, [])

  //* handle theme change
  const [theme_value, setThemeCurrent] = useState(localStorage.getItem("theme"))

  function HandleTheme(theme: any) {
    document.getElementById("app")!.setAttribute("data-theme", theme)
    localStorage.setItem("theme", theme)
    setThemeCurrent(theme)
    window.dispatchEvent(new Event("themeChanged"))
  }

  useEffect(() => {
    function onThemeChanged() {
      setThemeCurrent(localStorage.getItem("theme"))
    }
    window.addEventListener("themeChanged", onThemeChanged)
    return () => window.removeEventListener("themeChanged", onThemeChanged)
  }, [])


  // FIXME: Theme Changer
  return (
    <div tabIndex={0} className="collapse collapse-arrow bg-base-300">
      <div className="collapse-title">
        <ThemeIcon />
      </div>
      <div className="collapse-content">
        <div className="flex flex-col gap-4 justify-center items-center">
          <button onClick={() => HandleTheme("winter")}>
            <Winter />
          </button>
          <button onClick={() => HandleTheme("night")}>
            <Night />
          </button>
        </div>
      </div>
    </div>
  )
}

export default ThemeChanger
