import React from 'react'
import { Field } from 'formik'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import Checkbox from './Checkbox'

interface IndexItemProps {
  idxIndex: number
  onDeleteIndex: (index: number) => void
}

function IndexItem(props: IndexItemProps) {
  const { idxIndex, onDeleteIndex } = props
  return (<>
    <div className="form-row">
      <div className="form-group col-lg-4">
        <label className="form-control-sm mb-0">カラム</label>
        <Field type="text" className="form-control form-control-sm" name={`indexes[${idxIndex}].columns`} />
      </div>
      <div className="form-group col-lg-4">
        <label className="form-control-sm mb-0">インデックス名</label>
        <Field type="text" className="form-control form-control-sm" name={`indexes[${idxIndex}].name`} />
      </div>
      <div className="form-group col-lg-4">
        <div className="d-flex justify-content-between align-items-end h-100">
          <div className="ml-2 mb-1">
            <Checkbox label="ユニーク" name={`indexes[${idxIndex}].is_unique`} />
          </div>
          <button type="button" className="btn btn-sm btn-danger" onClick={(e) => { e.preventDefault(); onDeleteIndex(idxIndex) }} >
            <FontAwesomeIcon icon={faTrash} className="mr-1" />削除
          </button>
        </div>
      </div>
    </div>
  </>)
}

export default IndexItem