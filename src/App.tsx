import { useEffect, useState } from "react";
import styles from "./App.module.css";
import SearchBar from "./Componentes/SearchBar/SearchBar";
import UserCard from "./Componentes/UserCard/UserCard";
import { FiSun, FiMoon } from "react-icons/fi";

export interface GitHubUser {
  login: string;
  avatar_url: string;
  name: string | null;
  bio: string | null;
  public_repos: number;
  followers: number;
  following: number;
  location: string | null;
  blog: string | null;
  twitter_username: string | null;
  company: string | null;
  created_at: string; 
}

function App() {
  const [username, setUsername] = useState("octocat");
  
  const [userData, setUserData] = useState<GitHubUser | null>(null);
  const [error, setError] = useState(false);

  const [isLightMode, setIsLightMode] = useState(false);

  
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: light)");
    const handleChange = (e: MediaQueryListEvent) => {
      setIsLightMode(e.matches); 
    };

    
    setIsLightMode(mediaQuery.matches);

    
    mediaQuery.addEventListener("change", handleChange);

    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, []);


    useEffect(() => {
      fetchUser(username); 
    }, []);

    useEffect(() => {
      document.documentElement.className = isLightMode ? "light" : "dark";
    }, [isLightMode]);
    
  const fetchUser = async (username: string) => {
    try {
      const response = await fetch(`https://api.github.com/users/${username}`);
      if (!response.ok) {
        throw new Error("User not found");
      }

      const data: GitHubUser = await response.json();
      setUserData(data);
      setError(false);
    } catch (err) {
      setError(true);
      setUserData(null);
    }
  };

  return (
    <div className={isLightMode ? styles.light : styles.dark}>
      <div className={styles.header}>
        <h1 className={styles.title}>devfinder</h1>
        <button
           onClick={() => setIsLightMode(!isLightMode)}
          className={styles.toggleButton}
        >
          {isLightMode ? (
            <>
              DARK <FiMoon className={styles.icon} />
            </>
            ) : (
            <>
              LIGHT <FiSun className={styles.icon} />
            </>
          )}
        </button>
      </div>
      <SearchBar
        onSearch={(inputUsername) => {
          setUsername(inputUsername);
          fetchUser(inputUsername);  
        }}
        isLightMode={isLightMode}
      />
      <div>
        {error && <p className={styles.error}>User not found</p>}
        {userData && <UserCard user={userData} isLightMode={isLightMode} />}
      </div>
    </div>
  );
}

export default App;
