import React from "react"

const VideoList: React.FC = () => {
  return (
    <div className="collapse collapse-arrow bg-base-300">
      <input type="radio" name="my-accordion-2" checked={true} />
      <div className="collapse-title text-xl font-medium">Your Ref Videos</div>
      <div className="collapse-content">
        <p>hello</p>
      </div>
    </div>
  )
}

export default VideoList
