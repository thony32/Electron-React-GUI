import React from "react"

const Others: React.FC = () => {
  return (
    <div className="collapse collapse-arrow bg-base-300">
      <input type="radio" name="my-accordion-2" checked={true} />
      <div className="collapse-title text-xl font-medium">Your other Refs</div>
      <div className="collapse-content">
        <p>hello</p>
      </div>
    </div>
  )
}

export default Others
