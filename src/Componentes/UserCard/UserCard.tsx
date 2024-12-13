import { FaMapMarkerAlt, FaTwitter, FaGlobe, FaBuilding } from "react-icons/fa";
import styles from "./UserCard.module.css";
import { GitHubUser } from "../../App";

interface UserCardProps {
  user: GitHubUser;
  isLightMode: boolean;
}

export default function UserCard({ user, isLightMode }: UserCardProps) {
  return (
    <div 
    className={`${styles["usercard-container"]} shared-width ${
        isLightMode ? styles["light-mode"] : styles["dark-mode"]
    }`}
    >
      <div className={styles["top-section"]}>
        <img 
          className={styles["user-image"]}
          src={user.avatar_url} 
          alt={`${user.login}'s avatar`} 
        />
        <div className={styles["user-info"]}>
          <div className={styles["name-and-date"]}>
            <h2 className={styles["user-name"]}>{user.name || user.login}</h2>
            <p className={styles["join-date"]}>
              Joined {new Date(user.created_at).toLocaleDateString()}
            </p>
          </div>
          <p className={styles["user-bio"]}>
            {user.bio || "This profile has no bio"}
          </p>
        </div>
      </div>

      <div 
          className={`${styles["stats"]} ${
          isLightMode ? styles["light-mode"] : styles["dark-mode"]
          }`}
      >
        <p>Repos {user.public_repos}</p>
        <p>Followers {user.followers}</p>
        <p>Following {user.following}</p>
      </div>
      <div className={styles.details}>
        <div>
          <FaMapMarkerAlt className={styles["icon"]} />
          <p>{user.location || "Not available"}</p>
        </div>
        <div>
          <FaTwitter className={styles["icon"]} />
          <p>{user.twitter_username || "Not available"}</p>
        </div>
        <div>
          <FaGlobe className={styles["icon"]} />
          <p>{user.blog || "Not available"}</p>
        </div>
        <div>
          <FaBuilding className={styles["icon"]} />
          <p>{user.company || "Not available"}</p>
        </div>
      </div>
    </div>
  );
}
