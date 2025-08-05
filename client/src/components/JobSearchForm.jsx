import { useState } from 'react';
import Autosuggest from 'react-autosuggest';
import { keywordSuggestions } from '../data/keywords';

const JobSearchForm = ({ onSearch }) => {
  const [value, setValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const onSuggestionsFetchRequested = ({ value }) => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    const filtered =
      inputLength === 0
        ? []
        : keywordSuggestions.filter((kw) =>
            kw.toLowerCase().includes(inputValue)
          );

    setSuggestions(filtered);
  };

  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const getSuggestionValue = (suggestion) => suggestion;

  const renderSuggestion = (suggestion) => (
    <div className="p-2 hover:bg-gray-100 cursor-pointer">{suggestion}</div>
  );

  // 🧠 This runs when a suggestion is clicked
  const onSuggestionSelected = (event, { suggestion }) => {
    onSearch(suggestion);
  };
  

  return (
    <div className="mb-4">
      <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={onSuggestionsFetchRequested}
        onSuggestionsClearRequested={onSuggestionsClearRequested}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        onSuggestionSelected={onSuggestionSelected}
        inputProps={{
          placeholder: 'Search jobs (e.g. backend, python)',
          value,
          onChange: (e, { newValue }) => setValue(newValue),
          className:
            'p-2 border rounded w-full text-base focus:outline-none',
        }}
      />
    </div>
  );
};

export default JobSearchForm;
