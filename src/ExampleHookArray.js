import React, { useState } from 'react'
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

function ExampleHookArray() {
  const [value, setValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  // 入力された文字列をもとに、選択肢に出すデータを抽出する
  const getSuggestions = (value) => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;
    return inputLength === 0 ? [] :
      options.filter(opt => opt.toLowerCase().slice(0, inputLength) === inputValue);
  };

  const onChange = (event, { newValue }) => {
    setValue(newValue);
  };

  const renderInputComponent = inputProps => {
    const { className, ...other } = inputProps
    return (
      <input
        className="form-control form-control-sm"
        type="search"
        {...other}
      />
    )
  }

  // inputに渡す属性
  const inputProps = { value, onChange };

  return (
    <Autosuggest
      suggestions={suggestions}
      onSuggestionsFetchRequested={({ value }) => setSuggestions(getSuggestions(value))}
      onSuggestionsClearRequested={() => setSuggestions([])}
      getSuggestionValue={suggestion => suggestion}
      renderSuggestion={suggestion => <span>{suggestion}</span>}
      renderInputComponent={renderInputComponent}
      inputProps={inputProps}
    />
  );
}

export default ExampleHookArray;