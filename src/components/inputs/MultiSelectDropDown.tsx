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
    setInputValue(tmp.map((item) => item.label).join(","));
  };

  return (
    <div className="multi-select-dropdown" ref={dropdownRef}>
      <div
        className={`input-box ${isOpen ? "active-input-box" : ""}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="selected-options">
          {inputValue ? inputValue : "Select Options"}
        </div>
        <div className={isOpen ? "active-arrow" : ""}>
          <img src={arrowIcon} alt="^" />
        </div>
      </div>
      {isOpen && (
        <ul className="dropdown-menu">
          {options.map((option) => (
            <li
              key={option.id}
              className={isSelected(option) ? "selected" : ""}
              onClick={() => handleSelectOption(option)}
            >
              <div>{option.label}</div>
              {isSelected(option) ? <div>✓</div> : null}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MultiSelectDropDown;
