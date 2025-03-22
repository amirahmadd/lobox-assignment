import { useEffect, useRef, useState } from "react";
import { Option } from "../../types/Option";
import arrowIcon from "../../assets/icon/arrow.svg";

interface Props {
  onChange: (list: Option[]) => void;
  options: Option[];
}
const MultiSelectDropDown = ({ onChange, options }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState<Option[]>([]);
  const [availableOptions, setAvailableOptions] = useState(options);
  const [inputValue, setInputValue] = useState<string>("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (inputValue.trim()) {
      const tmp = options.filter((item) =>
        item.label
          .trim()
          .toLowerCase()
          .includes(inputValue.trim().toLowerCase())
      );
      setAvailableOptions(tmp);
    } else {
      setAvailableOptions(options);
    }
  }, [inputValue, options]);

  const isSelected = (option: Option) => {
    return selectedOptions.find((item) => item.id === option.id);
  };

  const handleAddNewOption = (option: Option) => {
    const newSelectedOptions = [...selectedOptions, option];
    setSelectedOptions(newSelectedOptions);
    return newSelectedOptions;
  };

  const handleRemoveOption = (option: Option) => {
    const newSelectedOptions = selectedOptions.filter(
      (item) => item.id !== option.id
    );
    setSelectedOptions(newSelectedOptions);
    return newSelectedOptions;
  };

  const handleSelectOption = (option: Option) => {
    let tmp: Option[] = [];
    if (isSelected(option)) {
      tmp = handleRemoveOption(option);
    } else {
      tmp = handleAddNewOption(option);
    }
    onChange(tmp);
    setInputValue("");
  };

  const handleInputEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && inputValue.trim()) {
      if (availableOptions.length) {
        handleSelectOption(availableOptions[0]);
      } else {
        window.alert(
          "No options found matching the given text. Please try again."
        );
      }
    }
  };
  return (
    <div className="multi-select-dropdown" ref={dropdownRef}>
      <div
        className={`input-box ${isOpen ? "active-input-box" : ""}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="selected-options">
          <input
            className="input"
            type="text"
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value);
              setIsOpen(true);
            }}
            onKeyDown={handleInputEnter}
            placeholder="Type to add..."
          />
        </div>
        <div className={isOpen ? "active-arrow" : ""}>
          <img src={arrowIcon} alt="^" />
        </div>
      </div>
      {isOpen && (
        <ul className="dropdown-menu">
          {availableOptions.length ? (
            availableOptions.map((option) => (
              <li
                key={option.id}
                className={isSelected(option) ? "selected" : ""}
                onClick={() => handleSelectOption(option)}
              >
                <div>{option.label}</div>
                {isSelected(option) ? <div>✓</div> : null}
              </li>
            ))
          ) : (
            <li>No Option found</li>
          )}
        </ul>
      )}
    </div>
  );
};

export default MultiSelectDropDown;
