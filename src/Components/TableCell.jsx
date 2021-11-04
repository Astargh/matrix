import React from "react";

const TableCell = ({active, onMouseDown, onMouseMove, row, index}) => {
  return (<div
    draggable="false"
    onMouseDown={(event) => onMouseDown(event, row, index, active)}
    onMouseOver={(event) => onMouseMove(event, row, index)}
    style={{width: "30px", height: "30px", border: "1px solid #000", background: active ? "#F00" : "#FFF"}}
  />)
}

export default TableCell;
