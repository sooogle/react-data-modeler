import React from 'react'
import { Field } from 'formik'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import Checkbox from './Checkbox'
import { Column } from './TableForm'
import Input from './Input'
import SuggestInput from './SuggestInput'

interface ColumnItemProps {
  colIndex: number;
  selected: boolean;
  column: Column;
  onDeleteColumn: (index: number) => void;
}

function ColumnItem(props: ColumnItemProps) {
  const { colIndex, selected, onDeleteColumn } = props;
  return (<>
    <div className="form-row">
      <div className="form-group col-lg-3">
        <label className="form-control-sm mb-0">物理名</label>
        <SuggestInput type="text" name={`columns[${colIndex}].physical_name`} />
      </div>
      <div className="form-group col-lg-3">
        <label className="form-control-sm mb-0">論理名</label>
        <Input type="text" name={`columns[${colIndex}].logical_name`} />
      </div>
      <div className="form-group col-lg-3">
        <label className="form-control-sm mb-0">型</label>
        <Input type="text" name={`columns[${colIndex}].type`} />
      </div>
      <div className="form-gorup col-lg-3">
        <div className="d-flex justify-content-around align-items-center h-100">
          <Checkbox label="主キー" name={`columns[${colIndex}].is_primary_key`} />
          <Checkbox label="NULL可" name={`columns[${colIndex}].is_nullable`} />
        </div>
      </div>
    </div>
    {selected && <>
      <div className="form-row">
        <div className="form-gorup col-lg-9">
          <label className="form-control-sm mb-0">説明</label>
          <Field as="textarea" rows={3} className="form-control form-control-sm" name={`columns[${colIndex}].description`} />
        </div>
        <div className="form-group col-lg-3">
          <div className="d-flex flex-column justify-content-between">
            <div className="form-group">
              <label className="form-control-sm mb-0">デフォルト値</label>
              <Input type="text" name={`columns[${colIndex}].default`} />
            </div>
            <div className="d-flex justify-content-end">
              <button type="button" className="btn btn-sm btn-danger" onClick={(e) => { e.preventDefault(); onDeleteColumn(colIndex) }} >
                <FontAwesomeIcon icon={faTrash} className="mr-1" />削除
              </button>
            </div>
          </div>
        </div>
      </div>
    </>}
  </>);
}

export default ColumnItem;