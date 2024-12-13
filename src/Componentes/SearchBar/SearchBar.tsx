import { FiSearch } from "react-icons/fi";
import styles from "./SearchBar.module.css";
import { useState } from "react";

interface SearchBarProps {
  onSearch: (username: string) => void;
  isLightMode: boolean;
}

export default function SearchBar({ onSearch, isLightMode }: SearchBarProps) {
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = () => {
    if (inputValue.trim() !== "") {
      onSearch(inputValue);
    }
  };

  return (
    <div 
        className={styles["search-bar-container"]}
       
    
    >
      <label htmlFor="search-user">
        <FiSearch className={styles["search-icon"]} />
      </label>
      <input
        id="search-user"
        type="text"
        name="search-user"
        placeholder="Search GitHub username..."
        className={`${styles["search-input"]} shared-width ${isLightMode ? styles["light-mode"] : styles["dark-mode"]}`}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") handleSubmit();
        }}
      />
      <button className={styles["search-btn"]} onClick={handleSubmit}>
        Search
      </button>
    </div>
  );
}
