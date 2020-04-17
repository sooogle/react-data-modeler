import React from 'react'

interface IProps {
  physical_name: string,
  logical_name: string,
}

function ColumnViewer(props: IProps) {
  return (<>
    <div className="row">
      <div className="col-lg-6 row">
        <div className="col-3">物理名</div>
        <div className="col-9">{props.physical_name}</div>
      </div>
      <div className="col-lg-6 row">
        <label className="col-3">論理名</label>
        <div className="col-9">{props.logical_name}</div>
      </div>
    </div>
  </>)
}

export default ColumnViewer