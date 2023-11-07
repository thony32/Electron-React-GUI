import React, { useState } from "react"
import { Text } from "../../assets"

const InputText: React.FC<{ addTextNode: (text: string) => void }> = ({ addTextNode }) => {
  const [text, setText] = useState("");

  const handleAddClick = () => {
    if (text.trim()) {
      addTextNode(text);
      // Close the modal here if needed
      setText(""); // Reset the text field
    }
  };
  const openModal = () => {
    const modal = document.getElementById("inputtext")
    if (modal instanceof HTMLDialogElement) {
      modal.showModal()
    }
  }
  return (
    <>
      <button className="p-2 rounded-md hover:bg-base-200 duration-300 active:scale-95" onClick={openModal}>
        <Text />
      </button>
      <dialog id="inputtext" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box space-y-8">
          <h3 className="font-extrabold text-2xl text-base-content">Add your note</h3>
          {/* Modal Content */}
          <div className="space-y-4">
            <div className="relative">
              <input
                type="text"
                className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-base-content bg-transparent rounded-lg border-1 border-base-content appearance-none focus:outline-none focus:ring-0 peer"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder=" "
              />
              <label className="absolute text-sm text-base-content duration-300 bg-base-100 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] px-2 peer-focus:px-2  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">
                Your text
              </label>
            </div>
            <div className="flex justify-end">
              <button className="py-2 px-5 bg-neutral/75 rounded-md hover:bg-neutral/90 active:scale-95 text-neutral-content font-bold duration-300" onClick={handleAddClick}>Add</button>
            </div>
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

export default InputText
