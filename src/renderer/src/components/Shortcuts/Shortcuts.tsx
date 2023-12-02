import React, { useState } from "react"
import { Help } from "../../assets"
import { Card } from "antd"
import { HotkeysData } from "../../data"
import { useHotkeys } from "react-hotkeys-hook"
import "../../index.css"

const tabList = [
    {
        key: "Walkthrough",
        label: <p className="text-base-content text-2xl hurme">Walkthrough</p>,
    },
    {
        key: "Shortcuts",
        label: <p className="text-base-content text-2xl hurme">Shortcuts</p>,
    },
]

export const Shortcut: React.FC = () => {
    return (
        <>
            <h3 className="font-extrabold text-2xl text-base-content">ProRef SHORTCUTS</h3>
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
        </>
    )
}

export const Walkthrough: React.FC = () => {
    return (
        <div className="space-y-4 overflow-y-auto scrollbar">
            <h3 className="font-extrabold text-2xl text-base-content">Use Guide</h3>
            <div className="space-y-6">
                <div>
                    <p>This app is based on medias (Images, videos) drag and drop. The dropped media element is called a 'Node'. The minimap on the bottom right is mapping the medias by using different colors :</p>
                    <ul>
                        <li>
                            {" "}
                            - <span className="text-red-500">Red</span> for Videos
                        </li>
                        <li>
                            {" "}
                            - <span className="text-black">Black</span> for Images
                        </li>
                        <li>
                            {" "}
                            - <span className="text-yellow-400">Yellow</span> for Texts
                        </li>
                        <li>
                            {" "}
                            - <span className="text-blue-500">Blue</span> for Links
                        </li>
                    </ul>
                </div>
                <div className="space-y-4">
                    <div>
                        <p className="text-base-content text-xl font-bold">1. Add media node</p>
                        <p>Drag and drop media to the panel from your local or from website that can handle image drag</p>
                    </div>
                    <div>
                        <p className="text-base-content text-xl font-bold">2. Select media node</p>
                        <p>
                            All nodes are listed automatically on the 'List' bar on the left and keep the real file name as the node ID. <br />
                            <br />
                            And selected nodes are surrounded by a red resizer, and the 4 dots at the edge of the node is called a 'Handle'. <br />
                            <br />
                            Selected node position is displayed on the 'Position' bar on the right. <br />
                            <br />
                            To select node :
                        </p>
                        <ul>
                            <li> - Click on the node directly.</li>
                            <li> - Click on the icon on the 'List' bar.</li>
                        </ul>
                    </div>
                    <div>
                        <p className="text-base-content text-xl font-bold">3. Edit media</p>
                        <ul className="space-y-2">
                            <li> - Long press on the node handle to resize the node to the desired size.</li>
                            <li> - You can rotate the media by long pressing on (icon) and dragging the mouse to the desired angle.</li>
                            <li> - You can duplicate the node by pressing the copy icon button and delete it by pressing the trash icon button</li>
                            <li> - You can move the media by dragging the node to the desired position. And the position is displayed on 'Properties' bar with its ID.</li>
                            <li> - You can modify directly the node position by setting X and Y to your desired value on the 'Properties' bar.</li>
                        </ul>
                    </div>
                    <div>
                        <p className="text-base-content text-xl font-bold">3. Add text as a node</p>
                        <p>On the 'Tools' of 'Properties' bar, you can add your text.</p>
                    </div>
                    <div>
                        <p className="text-base-content text-xl font-bold">4. Connect all nodes</p>
                        <p>Nodes can be connected with the black and sky blue 'Connection Handles' that are located on the center left and center right of the node. Long press on any connection handle and connect them. Only Black and sky blue connection handles are connectable</p>
                    </div>
                    <div>
                        <p className="text-base-content text-xl font-bold">5. Export your references workspace as an image</p>
                        <p>You can do it by going to the 'Export' section and click on 'Export to PNG'. You can choose your own resolution by setting the values.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

const contentList = {
    Walkthrough: <Walkthrough />,
    Shortcuts: <Shortcut />,
}

const Shortcuts: React.FC = () => {
    const [activeTabKey, setActiveTabKey] = useState("Walkthrough")

    const onTab2Change = (key) => {
        setActiveTabKey(key)
    }

    const openModal = () => {
        const modal = document.getElementById("shortcut_modal")
        if (modal instanceof HTMLDialogElement) {
            modal.showModal()
        }
    }

    useHotkeys("ctrl+h", openModal)

    return (
        <div className="absolute top-5 right-[250px]">
            <button className="p-2 rounded-full hover:bg-base-200 duration-300 active:scale-95" onClick={openModal}>
                <Help />
            </button>
            <dialog id="shortcut_modal" className="modal modal-bottom sm:modal-middle">
                <div className="modal-box space-y-8">
                    <Card
                        style={{ width: "100%", backgroundColor: "transparent", border: "none", color: "currentColor" }}
                        tabList={tabList}
                        activeTabKey={activeTabKey}
                        onTabChange={onTab2Change}
                        tabProps={{
                            size: "middle",
                        }}
                        className="hurme"
                    >
                        {contentList[activeTabKey]}
                    </Card>
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
        </div>
    )
}

export default Shortcuts
