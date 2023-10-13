import React, { useCallback } from 'react'
import { Trashbin } from '../../assets'

const DeleteBtn: React.FC = () => {
  // const onNodesDelete = useCallback(
  //   (deleted) => {
  //     setEdges(
  //       deleted.reduce((acc, node) => {
  //         const incomers = getIncomers(node, nodes, edges);
  //         const outgoers = getOutgoers(node, nodes, edges);
  //         const connectedEdges = getConnectedEdges([node], edges);

  //         const remainingEdges = acc.filter((edge) => !connectedEdges.includes(edge));

  //         const createdEdges = incomers.flatMap(({ id: source }) =>
  //           outgoers.map(({ id: target }) => ({ id: `${source}->${target}`, source, target }))
  //         );

  //         return [...remainingEdges, ...createdEdges];
  //       }, edges)
  //     );
  //   },
  //   [nodes, edges]
  // );

  return (
    <button className="hover:bg-gray-200 duration-300 rounded-full p-2">
      <Trashbin/>
    </button>
  )
}

export default DeleteBtn