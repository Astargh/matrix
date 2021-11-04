import React, {useState, useEffect} from "react";
import TableCell from "./TableCell";

const Table = () => {
  const createMatrix = () => {
    const rows = [...Array(7)].map((item, i) => i);
    return rows.map(row => ([...Array(24)].map((item, i) => ({
      id: `${row}-${i}`,
      active: false,
      row,
      index: i
    }))))
  }

  const [matrix, setMatrix] = useState(createMatrix());
  const [mouseDown, setMouseDown] = useState(false);
  const [start, setStart] = useState(null);
  const [finish, setFinish] = useState(null);
  const [active, setActive] = useState(false);

  document.onmouseup = () => setMouseDown(false);
  document.onmousedown = () => setMouseDown(true);

  const onMouseDown = (e, row, cellIndex, active) => {
    setStart({row, cellIndex})
    setActive(!active)
  }

  const onMouseUp = () => {
    setMouseDown(false);
    setFinish(null);
    setStart(null);
  }

  const handleMouseMove = (e, row, cellIndex) => {
    if (mouseDown) {
      if (!start) {
        setStart({row, cellIndex});
        setActive(!matrix[row][cellIndex].active);
      }
      setFinish({row, cellIndex});
    }
  }

  const onChangeStatus = (row, cellIndex) => {
    const newStateMatrix = [...matrix];
    newStateMatrix[row][cellIndex].active = active;
    setMatrix(newStateMatrix)
  }

  const brushMatrix = () => {
    let rowStart = start.row < finish.row ? start.row : finish.row;
    let rowFinish = start.row < finish.row ? finish.row : start.row;
    let cellStart = start.cellIndex < finish.cellIndex ? start.cellIndex : finish.cellIndex;
    let cellFinish = start.cellIndex < finish.cellIndex ? finish.cellIndex : start.cellIndex;
    for (let i = rowStart; i <= rowFinish; i++) {
      for (let j = cellStart; j <= cellFinish; j++) {
        onChangeStatus(i, j);
      }
    }
  }

  useEffect(() => {
    if (start && finish) {
      brushMatrix()
    }
  }, [start, finish])

  return (<div style={{margin: 50}}>
    {
      matrix.map((row, index) => (<div style={{display: "flex"}} key={index}>
        {
          row && row.map(cell => (<TableCell
            key={cell.id}
            onMouseDown={onMouseDown}
            onMouseUp={onMouseUp}
            {...cell}
            onMouseMove={handleMouseMove}/>))
        }
      </div>))
    }
  </div>)
}

export default Table;
