import React from "react"
import { Help } from "../../assets"
import { HotkeysData } from "../../data"
import { useHotkeys } from "react-hotkeys-hook";

const Shortcuts: React.FC = () => {
  const openModal = () => {
    const modal = document.getElementById("shortcut_modal");
    if (modal instanceof HTMLDialogElement) {
      modal.showModal();
    }
  };

  useHotkeys("ctrl+h", openModal);

  return (
    <>
      <button className="p-2 rounded-md hover:bg-base-200 duration-300 active:scale-95" onClick={openModal}>
        <Help />
      </button>
      <dialog id="shortcut_modal" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box space-y-8">
          <h3 className="font-extrabold text-2xl text-base-content">ProRef SHORTCUTS</h3>
          {/* Modal Content */}
          <div>
            {HotkeysData.map((hotkey, index) => {
              return (
                <div className="py-2" key={index}>
                  <div className="flex justify-between items-center">
                    <div>{hotkey.label}</div>
                    <kbd className="kbd-sm">{hotkey.hotkey}</kbd>
                  </div>
                </div>
              )
            }, [])}
          </div>
          {/* Button Close */}
          <div className="modal-action absolute -top-3 right-5">
            <form method="dialog">
              <button className="p-2 rounded-full bg-base-200 hover:bg-base-300 duration-300">
                <svg viewBox="0 -960 960 960" className="w-4 h-4 fill-current">
                  <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
                </svg>
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  )
}

export default Shortcuts
