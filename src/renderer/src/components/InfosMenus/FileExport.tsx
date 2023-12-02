import React, { useState } from "react"
import { Download } from "../../assets"
import JSZip from "jszip"
import { saveAs } from "file-saver"
import { useNodesAndEdgesState } from "@renderer/hooks"

const FileExport: React.FC = () => {
    const { nodes, edges, setNodes, setEdges } = useNodesAndEdgesState() as any
    const [selectedFile, setSelectedFile] = useState(null) as any

    // NOTE: EXPORT
    const prepareDataForExport = async () => {
        const zip = new JSZip()
        const nodesToExport = []
        const mediaPromises: any = []

        nodes.forEach((node) => {
            if (node.type === "ImageNode" || node.type === "VideoNode") {
                // Extract URL from the 'label' property
                let mediaUrl = ""
                if (node.data.label.props.src) {
                    mediaUrl = node.data.label.props.src
                }

                if (mediaUrl) {
                    const mediaPromise = fetch(mediaUrl)
                        .then((response) => response.blob())
                        .then((blob) => {
                            const fileExtension = blob.type.split("/")[1]
                            const filename = `${node.id}.${fileExtension}` // Example: node-123.jpg
                            zip.file(`media/${filename}`, blob) // Add to zip under media folder
                            // Update node data with new media path
                            const updatedNode = {
                                ...node,
                                data: {
                                    ...node.data,
                                    label: React.cloneElement(node.data.label, { src: `media/${filename}` }),
                                },
                            }
                            return updatedNode
                        })
                    mediaPromises.push(mediaPromise)
                } else {
                    nodesToExport.push(node as never)
                }
            } else {
                nodesToExport.push(node as never)
            }
        })

        const mediaNodes = await Promise.all(mediaPromises)
        const allNodes = [...nodesToExport, ...mediaNodes]
        const projectData = {
            nodes: allNodes,
            edges,
        }

        zip.file("project.json", JSON.stringify(projectData))

        const blob = await zip.generateAsync({ type: "blob" })
        return blob
    }

    const handleExportClick = async () => {
        try {
            const projectBlob = await prepareDataForExport()
            saveAs(projectBlob, "project.proref")
        } catch (error) {
            console.error("Error exporting project:", error)
        }
    }

    // NOTE: IMPORT

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0])
    }

    const handleImportClick = async () => {
        if (selectedFile && selectedFile.name.endsWith(".proref")) {
            try {
                const zip = new JSZip()
                const content: any = await zip.loadAsync(selectedFile)
                const projectJson = await content.file("project.json").async("string")
                const projectData = JSON.parse(projectJson)

                // ... handle media files and update nodes and edges
                const updatedNodes = await Promise.all(
                    projectData.nodes.map(async (node) => {
                        if (node.type === "ImageNode" || node.type === "VideoNode") {
                            const mediaFile = await content.file(node.data.label.props.src).async("blob")
                            const mediaUrl = URL.createObjectURL(mediaFile)
                            return {
                                ...node,
                                data: {
                                    ...node.data,
                                    label: React.cloneElement(node.data.label, { src: mediaUrl }),
                                },
                            }
                        }
                        return node
                    })
                )
                setNodes(updatedNodes)
                setEdges(projectData.edges)
            } catch (error) {
                console.error("Error importing project:", error)
            }
        }
    }

    return (
        <>
            <div className="space-y-4 p-2">
                <h1 className="text-xs">Import proref file</h1>
                <div>
                    <input type="file" accept=".proref" onChange={handleFileChange} className="w-full" />
                    <button className="flex items-center justify-center gap-2 px-3 py-2 rounded-md bg-primary text-slate-200 text-sm font-bold w-full hover:bg-primary/75 active:scale-95 duration-300" onClick={handleImportClick}>
                        Import proref file
                    </button>
                </div>
            </div>
            <div className="p-2 space-y-4">
                <div className="space-y-2">
                    <h1 className="text-xs font-bold">Export your project</h1>
                </div>
                <div>
                    <button className="flex items-center justify-center gap-2 px-3 py-2 rounded-md bg-primary text-slate-200 text-sm font-bold w-full hover:bg-primary/75 active:scale-95 duration-300" onClick={handleExportClick}>
                        <Download />
                        <span>Export proref file</span>
                    </button>
                </div>
            </div>
        </>
    )
}

export default FileExport
