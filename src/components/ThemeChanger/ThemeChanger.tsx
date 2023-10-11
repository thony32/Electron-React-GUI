/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react"

import { Winter, Night, ThemeIcon } from "../../assets"

const ThemeChanger: React.FC = () => {
  useEffect(() => {
    if (localStorage.getItem("theme") != null) {
      document.getElementById("app")!.setAttribute("data-theme", localStorage.getItem("theme") as any)
      window.dispatchEvent(new Event("themeChanged"))
    } else {
      localStorage.setItem("theme", "night")
      document.getElementById("app")!.setAttribute("data-theme", "night")
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

  //! FIXME: Theme Changer

  return (
    // <div tabIndex={0} className="collapse collapse-arrow bg-base-300">
    //   <div className="collapse-title text-xl">Theme</div>
    //   <div className="collapse-content">
    //     <div className="flex flex-col gap-4 justify-center items-center">
    //       <button onClick={() => HandleTheme("winter")} className="bg-red-200">
    //         <Winter />
    //       </button>
    //       <button onClick={() => HandleTheme("night")} className="bg-red-200">
    //         <Night />
    //       </button>
    //     </div>

    //   </div>

    // </div>
    <div className="dropdown dropdown-right dropdown-bottom">
      <label tabIndex={0} className="flex items-center cursor-pointer hover:scale-125 duration-100">
        <ThemeIcon />
      </label>
      <ul tabIndex={0} className="dropdown-content menu p-2 pb-6 shadow bg-base-100 rounded-box w-52">
        <div className="font-asap-bold absolute bottom-2 right-5 text-[11px] opacity-70">Theme</div>
        <li onClick={() => HandleTheme("winter")}>
          <a className="flex justify-between">
            <span className={theme_value === "light" ? "text-secondary" : ""}>Let the light be</span>
            {theme_value === "winter" && (
              <span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 text-secondary">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
                </svg>
              </span>
            )}
          </a>
        </li>
        <li onClick={() => HandleTheme("night")}>
          <a className="flex justify-between">
            <span className={theme_value === "night" ? "text-secondary" : ""}>Night fall</span>
            {theme_value === "night" && (
              <span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 text-secondary">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
                </svg>
              </span>
            )}
          </a>
        </li>
        {/* <li onClick={() => HandleTheme("valentine")}>
                <a className="flex justify-between">
                  <span
                    className={
                      theme_value === "valentine" ? "text-secondary" : ""
                    }
                  >
                    Unless
                  </span>
                  {theme_value === "valentine" && (
                    <span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-6 text-secondary"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                        />
                      </svg>
                    </span>
                  )}
                </a>
              </li> */}
      </ul>
    </div>
  )
}

export default ThemeChanger
