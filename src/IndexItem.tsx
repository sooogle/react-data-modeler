import React from 'react'
import { Field } from 'formik'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'


interface IProps {
  index: number
  onDeleteColumn: (index: number) => void
}

function IndexItem(props: IProps) {
  const { index, onDeleteColumn } = props
  return (<>
    <div className="form-row">
      <div className="form-group col-lg-10">
        <label className="form-control-sm mb-0">インデックス名</label>
        <Field type="text" className="form-control form-control-sm" name={`indexes[${index}].name`} />
      </div>
      <div className="form-group col-lg-2 text-center">
         <div className="custom-control custom-switch align-middle h-100">
            <input type="checkbox" className="custom-control-input" name="is_nullable" id={`unique${index}`} />
            <label className="custom-control-label form-control-sm" htmlFor={`unique${index}`}>ユニーク</label>
          </div>
       </div>
    </div>
    <div className="form-row">
      <div className="form-group col-lg-10">
        <label className="form-control-sm mb-0">カラム</label>
        <Field type="text" className="form-control form-control-sm" name={`indexes[${index}].columns`} />
      </div>
      <div className="form-group col-lg-2">
        <button className="btn btn-sm btn-danger" onClick={(e) => { e.preventDefault(); onDeleteColumn(index) }} >
          <FontAwesomeIcon icon={faTrash} className="mr-1" />削除
        </button>
      </div>
    </div>
  </>)
}

export default IndexItem