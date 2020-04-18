import React, { useState } from 'react'
import * as Yup from 'yup'
import { Formik, Form, FieldArray } from 'formik'
import ColmunItem from './ColmunItem'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUp, faArrowDown, faPlus } from '@fortawesome/free-solid-svg-icons'
import IndexItem from './IndexItem'

export interface Column {
  logical_name: string,
  physical_name: string,
  type: string,
  is_primary_key: boolean
  is_nullable: boolean
  default: string,
  description: string,
}

export interface Index {
  name: string,
  columns: string[],
  is_unique: boolean,
}

function TableForm() {
  const defaultColumn: Column = {
    logical_name: '', physical_name: '', type: '', is_primary_key: false, is_nullable: false, default: '', description: ''
  }
  const columns: Column[] = [
    { logical_name: 'ID', physical_name: 'id', type: 'BIGSERIAL', is_primary_key: true, is_nullable: false, default: '', description: '主キー' },
    { logical_name: '商品コード', physical_name: 'product_code', type: 'VARCHAR(32)', is_primary_key: false, is_nullable: false, default: '', description: '' },
    { logical_name: '商品名', physical_name: 'product_name', type: 'VARCHAR(100)', is_primary_key: false, is_nullable: true, default: '', description: '' },
    { logical_name: '価格', physical_name: 'price', type: 'INTEGER', is_primary_key: false, is_nullable: true, default: '10000', description: '' },
  ];
  const indexes: Index[] = [
    { name: 'idx_products_on_name', columns: ["name"], is_unique: true },
  ];
  const [selectedColIndex, setSelectedColIndex] = useState(0)
  return (
    <Formik initialValues={{ columns, indexes }}
      onSubmit={(values) => alert(JSON.stringify(values, null, 2))}
      validationSchema={
        Yup.object().shape({
          columns: Yup.array().of(Yup.object().shape({
            physical_name: Yup.string()
              .required("入力必須です")
              .max(64, "64文字以内で入力してください"),
            logical_name: Yup.string()
              .required("入力必須です")
              .max(64, "64文字以内で入力してください"),
            type: Yup.string()
              .required("入力必須です")
              .max(64, "64文字以内で入力してください"),
          })),
          indexes: Yup.array().of(Yup.object().shape({
            name: Yup.string()
              .required("入力必須です")
              .max(64, "64文字以内で入力してください"),
          }))
        })
      }
      enableReinitialize>
      {(formikProps) => (
        <Form>
          <FieldArray name="columns">
            {(arrayHelper) => (<>
              <h5 className="mb-3">テーブル設計ツールプロトタイプ</h5>
              <div className="card mb-3">
                <div className="card-header d-flex justify-content-between align-items-center">
                  <div>カラム定義</div>
                  <div>
                    <div className="btn-group" role="group">
                      <button type="button"
                        className="btn btn-sm btn-outline-secondary"
                        disabled={selectedColIndex < 1}
                        onClick={(e) => {
                          e.preventDefault();
                          arrayHelper.swap(selectedColIndex - 1, selectedColIndex);
                          setSelectedColIndex(i => i - 1);
                        }}><FontAwesomeIcon icon={faArrowUp} /></button>
                      <button type="button"
                        className="btn btn-sm btn-outline-secondary"
                        disabled={selectedColIndex < 0 || selectedColIndex === formikProps.values.columns.length - 1}
                        onClick={(e) => {
                          e.preventDefault();
                          arrayHelper.swap(selectedColIndex, selectedColIndex + 1)
                          setSelectedColIndex(i => i + 1);
                        }}><FontAwesomeIcon icon={faArrowDown} /></button>
                    </div>
                    <button type="button"
                      className="btn btn-sm btn-outline-secondary ml-2"
                      onClick={(e) => {
                        e.preventDefault();
                        arrayHelper.push(defaultColumn);
                      }}><FontAwesomeIcon icon={faPlus} /></button>
                  </div>
                </div>
                {
                  formikProps.values.columns.map((column, colIndex) => (
                    <React.Fragment key={colIndex}>
                      <div
                        className={"card-body py-2 " + (selectedColIndex === colIndex ? "bg-light" : "")}
                        onFocus={() => setSelectedColIndex(colIndex)} >
                        <ColmunItem colIndex={colIndex} selected={colIndex === selectedColIndex} column={column}
                          onDeleteColumn={i => { arrayHelper.remove(i); setSelectedColIndex(0) }} />
                      </div>
                      {colIndex < formikProps.values.columns.length - 1 && <hr className="my-0" />}
                    </React.Fragment>
                  ))
                }
              </div>
            </>)}
          </FieldArray>
          <FieldArray name="indexes">
            {(arrayHelper) => (<>
              <div className="card">
                <div className="card-header d-flex justify-content-between align-items-center">
                  <div>インデックス定義</div>
                  <button type="button"
                    className="btn btn-sm btn-outline-secondary"
                    onClick={(e) => {
                      e.preventDefault();
                      arrayHelper.push({});
                    }}><FontAwesomeIcon icon={faPlus} /></button>
                </div>
                {
                  formikProps.values.indexes.map((data, idxIndex) => (
                    <React.Fragment key={idxIndex}>
                      <div key={idxIndex} className="card-body py-2">
                        <IndexItem idxIndex={idxIndex} onDeleteIndex={i => { arrayHelper.remove(i); }} />
                      </div>
                      {idxIndex < formikProps.values.indexes.length - 1 && <hr className="my-0" />}
                    </React.Fragment>
                  ))
                }
              </div>
            </>)}
          </FieldArray>
          <button type="button" className="btn btn-primary my-3">保存</button>
          <pre className="alert alert-primary">
            {JSON.stringify({ selectedColIndex, ...formikProps.values }, null, 2)}
          </pre>
        </Form>
      )}
    </Formik>
  )
}

export default TableForm