import React, { useState } from 'react'
import Autosuggest from 'react-autosuggest'

const languages = [
  {
    name: 'C',
    year: 1972
  },
  {
    name: 'C#',
    year: 2000
  },
  {
    name: 'C++',
    year: 1983
  },
  {
    name: 'Clojure',
    year: 2007
  },
  {
    name: 'Elm',
    year: 2012
  },
  {
    name: 'Go',
    year: 2009
  },
  {
    name: 'Haskell',
    year: 1990
  },
  {
    name: 'Java',
    year: 1995
  },
  {
    name: 'Javascript',
    year: 1995
  },
  {
    name: 'Perl',
    year: 1987
  },
  {
    name: 'PHP',
    year: 1995
  },
  {
    name: 'Python',
    year: 1991
  },
  {
    name: 'Ruby',
    year: 1995
  },
  {
    name: 'Scala',
    year: 2003
  }
];

function ExampleHook() {
  const [value, setValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  // 入力された文字列をもとに、選択肢に出すデータを抽出する
  const getSuggestions = (value) => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;
    return inputLength === 0 ? [] : languages.filter(lang =>
      lang.name.toLowerCase().slice(0, inputLength) === inputValue
    );
  };

  // 選択肢がクリックした時に、元のテキストボックスに戻す値を導出する
  const getSuggestionValue = (suggestion) => suggestion.name;

  // 選択肢をレンダリングする
  const renderSuggestion = (suggestion) => <span>{suggestion.name}</span>;

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
  const inputProps = {
    placeholder: 'Type a programming language',
    value,
    onChange
  };

  return (
    <Autosuggest
      suggestions={suggestions}
      onSuggestionsFetchRequested={({ value }) => setSuggestions(getSuggestions(value))}
      onSuggestionsClearRequested={() => setSuggestions([])}
      getSuggestionValue={getSuggestionValue}
      renderSuggestion={renderSuggestion}
      renderInputComponent={renderInputComponent}
      inputProps={inputProps}
    />
  );
}

export default ExampleHook;