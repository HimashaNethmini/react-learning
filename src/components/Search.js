
import { useState, useEffect, useRef } from "react";
import { BiSearch, BiCaretDown, BiCheck } from "react-icons/bi";

// Dropdown function
const DropDown = ({ selectedOption, onSelectOption }) => {
  const options = [
    { label: 'Pet Name', value: 'pet_name' },
    { label: 'Owner Name', value: 'owner_name' },
    { label: 'Date', value: 'date' },
    { label: 'Asc', value: 'asc' },
    { label: 'Desc', value: 'desc' },
  ];

  return (
    <div className="origin-top-right absolute right-0 mt-2 w-56
      rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
      <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
        {options.map((option) => (
          <div
            key={option.value}
            onClick={() => onSelectOption(option.value)}
            className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 flex justify-between cursor-pointer"
            role="menuitem">
            {option.label}
            {selectedOption === option.value && <BiCheck />}
          </div>
        ))}
      </div>
    </div>
  );
};

const Search = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('pet_name');
  const dropdownRef = useRef(null);

  // Handle clicking outside the dropdown to close it
  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Handle dropdown toggle
  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  // Handle option selection
  const handleSelectOption = (option) => {
    setSelectedOption(option);
    setIsDropdownOpen(false);
  };

  return (
    <div className="py-5" ref={dropdownRef}>
      <div className="mt-1 relative rounded-md shadow-sm">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <BiSearch />
          <label htmlFor="query" className="sr-only" />
        </div>
        <input type="text" name="query" id="query"
          className="pl-8 rounded-md focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300" placeholder="Search" />
        <div className="absolute inset-y-0 right-0 flex items-center">
          <div>
            <button type="button"
              className="justify-center px-4 py-2 bg-blue-400 border-2 border-blue-400 text-sm text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 flex items-center"
              id="options-menu" aria-haspopup="true" aria-expanded="true" onClick={toggleDropdown}>
              Sort By <BiCaretDown className="ml-2" />
            </button>
            {isDropdownOpen && (
              <DropDown
                selectedOption={selectedOption}
                onSelectOption={handleSelectOption}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
