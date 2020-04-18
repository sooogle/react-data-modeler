import React, { useState } from 'react'
import { useField } from 'formik'
import Autosuggest from 'react-autosuggest'

const options = [
  'C',
  'C#',
  'C++',
  'Clojure',
  'Elm',
  'Go',
  'Haskell',
  'Java',
  'Javascript',
  'Perl',
  'PHP',
  'Python',
  'Ruby',
  'Scala',
];

function AutoSuggestInput(props) {
  const [field, meta, helper] = useField(props)
  const [value, setValue] = useState(field.value)
  const [suggestions, setSuggestions] = useState([])

  // 入力された文字列をもとに、選択肢に出すデータを抽出する
  const getSuggestions = (value) => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;
    return inputLength === 0 ? [] :
      options.filter(opt => opt.toLowerCase().slice(0, inputLength) === inputValue);
  };

  const onChange = (event, { newValue }) => {
    helper.setValue(newValue);
    setValue(newValue);
  };

  const renderInputComponent = inputProps => {
    console.log("auto suggestion render")
    const { className, ...other } = inputProps
    return (
      <>
        <input className={'form-control form-control-sm ' + (meta.touched && meta.error ? 'is-invalid' : '')}
          id={field.name} {...field} {...other} />
        {meta.touched && meta.error && <div className="invalid-feedback">{meta.error}</div>}
      </>
    )
  }

  return (
    <Autosuggest
      suggestions={suggestions}
      onSuggestionsFetchRequested={({ value }) => setSuggestions(getSuggestions(value))}
      onSuggestionsClearRequested={() => setSuggestions([])}
      getSuggestionValue={suggestion => suggestion}
      renderSuggestion={suggestion => <span>{suggestion}</span>}
      renderInputComponent={renderInputComponent}
      inputProps={{ value, onChange }}
    />
  );
}

export default AutoSuggestInput;