// Function to handle drag-over event
const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
  event.preventDefault()
  event.dataTransfer.dropEffect = 'move'
}

export default handleDragOver
