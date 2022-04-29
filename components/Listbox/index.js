import { useState, useEffect, Fragment } from "react";

import { Listbox } from "@headlessui/react";
import styles from "./listbox.module.scss";

export default function CustomListbox({ onSelect, activeFilter, options }) {
  const [selectedOption, setSelectedOption] = useState(options[0].label);

  useEffect(() => {
    activeFilter && setSelectedOption(activeFilter);
  }, [activeFilter]);

  const handleChange = (selected) => {
    setSelectedOption(selected);
    onSelect(selected);
  };

  const CheckIcon = () => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        className={styles.iconCheck}
      >
        <path
          fillRule="evenodd"
          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
          clipRule="evenodd"
        />
      </svg>
    );
  };

  const DownArrowIcon = () => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={styles.iconDownArrow}
        viewBox="0 0 30 30"
        fill="currentColor"
      >
        <path d="M30 15C30 12.0333 29.1203 9.13319 27.472 6.66645C25.8238 4.19971 23.4811 2.27714 20.7402 1.14182C17.9994 0.00650974 14.9834 -0.290555 12.0736 0.288223C9.16392 0.867001 6.49118 2.29562 4.39339 4.39341C2.2956 6.4912 0.867014 9.16395 0.288234 12.0737C-0.290545 14.9834 0.0064842 17.9994 1.1418 20.7403C2.27711 23.4812 4.19972 25.8238 6.66646 27.4721C9.1332 29.1203 12.0333 30 15 30C18.9782 30 22.7936 28.4197 25.6066 25.6066C28.4196 22.7936 30 18.9783 30 15ZM14.6475 20.7435L8.8245 11.7345C8.78339 11.6712 8.76017 11.598 8.75727 11.5226C8.75436 11.4472 8.7719 11.3724 8.80802 11.3062C8.84415 11.2399 8.8975 11.1847 8.96246 11.1463C9.02741 11.1079 9.10156 11.0877 9.17702 11.088L20.8245 11.088C20.8998 11.088 20.9738 11.1083 21.0385 11.1469C21.1033 11.1854 21.1564 11.2407 21.1924 11.3069C21.2283 11.3731 21.2457 11.4477 21.2428 11.523C21.2398 11.5983 21.2166 11.6713 21.1755 11.7345L15.3465 20.7435C15.3084 20.8014 15.2565 20.8489 15.1955 20.8817C15.1345 20.9146 15.0663 20.9318 14.997 20.9318C14.9277 20.9318 14.8595 20.9146 14.7985 20.8817C14.7375 20.8489 14.6856 20.8014 14.6475 20.7435Z" />
      </svg>
    );
  };

  return (
    <div className={styles.filter}>
      <Listbox value={selectedOption} onChange={handleChange}>
        <Listbox.Button className={styles.listLabel}>
          {selectedOption} <DownArrowIcon />
        </Listbox.Button>
        <Listbox.Options className={styles.listOptions}>
          {options.map((option, index) => (
            <Listbox.Option key={option.label} value={option.label} as={Fragment}>
              {({ active }) => (
                <li
                  className={`${active ? styles.active : ""} ${
                    selectedOption === option.label ? styles.selected : ""
                  }`}
                  aria-label={
                    selectedOption === option.label
                      ? `Currently filtering by ${option.label}`
                      : `Filter by ${option.label}`
                  }
                >
                  {selectedOption === option.label && (
                    <span className={styles.icon}>
                      <CheckIcon />
                    </span>
                  )}
                  <span className={styles.label}>{option.label}</span>
                </li>
              )}
            </Listbox.Option>
          ))}
        </Listbox.Options>
      </Listbox>
    </div>
  );
}
