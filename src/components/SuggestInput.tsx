import React, { useState } from 'react'
import Autosuggest from 'react-autosuggest'
import { useField, FieldConfig } from 'formik'

const options = [
  'id',
  'product_code',
  'product_name',
  'price',
  'weight',
  'depth',
  'width',
  'height',
  'supplier_id',
  'supplier_name',
  'tariff_code',
];

interface SuggestInputProps extends FieldConfig {
}

function SuggestInput(props: SuggestInputProps) {
  const [field, meta, helper] = useField(props);
  const [suggestions, setSuggestions] = useState<string[]>([]);

  // 入力された文字列をもとに、選択肢に出すデータを抽出する
  const getSuggestions = (value: string) => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;
    return inputLength === 0 ? [] :
      options.filter(opt => opt.toLowerCase().slice(0, inputLength) === inputValue);
  }

  const onChange = (_e: React.FormEvent<any>, params: Autosuggest.ChangeEvent) => {
    helper.setValue(params.newValue);
    helper.setTouched(true);
  }

  const renderInputComponent = (inputProps: any) => {
    const { className, ...other } = inputProps;
    return (
      <>
        <input className={'form-control form-control-sm ' + (meta.touched && meta.error ? 'is-invalid' : '')}
          id={field.name} {...field} {...other} />
        {meta.touched && meta.error && <div className="invalid-feedback">{meta.error}</div>}
      </>
    );
  }

  return (
    <Autosuggest
      suggestions={suggestions}
      onSuggestionsFetchRequested={({ value }) => setSuggestions(getSuggestions(value))}
      onSuggestionsClearRequested={() => setSuggestions([])}
      getSuggestionValue={suggestion => suggestion}
      renderSuggestion={suggestion => <span>{suggestion}</span>}
      renderInputComponent={renderInputComponent}
      inputProps={{ value: field.value, onChange }}
    />
  )
}

export default SuggestInput;