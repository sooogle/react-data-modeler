import React from 'react'
import { Field } from 'formik'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faPlus } from '@fortawesome/free-solid-svg-icons'


interface IProps {
  index: number
  selected: boolean
  onAddColumn: (index: number) => void
  onDeleteColumn: (index: number) => void
}

function ColumnItem(props: IProps) {
  const { index, selected, onAddColumn, onDeleteColumn } = props
  return (<>
    <div className="form-row">
      <div className="form-group col-lg-3">
        <label className="form-control-sm mb-0">物理名</label>
        <Field type="text" className="form-control form-control-sm" name={`columns[${index}].physical_name`} />
      </div>
      <div className="form-group col-lg-3">
        <label className="form-control-sm mb-0">論理名</label>
        <Field type="text" className="form-control form-control-sm" name={`columns[${index}].logical_name`} />
      </div>
      <div className="form-group col-lg-3">
        <label className="form-control-sm mb-0">型</label>
        <Field type="text" className="form-control form-control-sm" name={`columns[${index}].type`} />
      </div>
      <div className="col-lg-3">
        <div className="d-flex justify-content-around align-items-center h-100">
          <div className="custom-control custom-switch">
            <input type="checkbox" className="custom-control-input" name="is_primary_key" id={`primaryKey${index}`} />
            <label className="custom-control-label" htmlFor={`primaryKey${index}`}><small>主キー</small></label>
          </div>
          <div className="custom-control custom-switch">
            <input type="checkbox" className="custom-control-input" name="is_nullable" id={`nullable${index}`} />
            <label className="custom-control-label" htmlFor={`nullable${index}`}><small>NULL可</small></label>
          </div>
        </div>
      </div>
    </div>
    {selected && <>
      <div className="form-row">
        <div className="col-lg-9">
          <label className="form-control-sm mb-0">説明</label>
          <Field as="textarea" rows={3} className="form-control form-control-sm" name={`columns[${index}].description`} />
        </div>
        <div className="form-group col-lg-3">
          <div className="d-flex flex-column justify-content-between">
            <div className="form-group">
              <label className="form-control-sm mb-0">デフォルト値</label>
              <Field type="text" className="form-control form-control-sm" name={`columns[${index}].default`} />
            </div>
            <div className="d-flex justify-content-end">
              <button className="btn btn-sm btn-secondary mr-1" onClick={e => { e.preventDefault(); onAddColumn(index) }}>
                <FontAwesomeIcon icon={faPlus} className="mr-1" />追加
              </button>
              <button className="btn btn-sm btn-danger" onClick={(e) => { e.preventDefault(); onDeleteColumn(index) }} >
                <FontAwesomeIcon icon={faTrash} className="mr-1" />削除
              </button>
            </div>
          </div>
        </div>
      </div>
    </>}
  </>)
}

export default ColumnItem