import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import {
  deleteUserProfile,
  getUserProfile,
  updateUserProfile,
  type UserProfile,
} from "../firebase/users";
import { logoutUser } from "../firebase/auth";

function ProfilePage() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    async function loadProfile() {
      if (!user) {
        return;
      }

      try {
        const userProfile = await getUserProfile(user.uid);
        setProfile(userProfile);
        setName(userProfile.name);
        setAddress(userProfile.address);
      } catch (error) {
        console.error("Profile load error:", error);
        setErrorMessage("Could not load profile.");
      }
    }

    loadProfile();
  }, [user]);

  if (loading) {
    return <p>Loading profile...</p>;
  }

  if (!user) {
    return <p>You must be logged in to view your profile.</p>;
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage("");
    setErrorMessage("");

    try {
      await updateUserProfile(user.uid, { name, address });
      setProfile((currentProfile) =>
        currentProfile ? { ...currentProfile, name, address } : currentProfile,
      );
      setMessage("Profile updated successfully.");
    } catch (error) {
      console.error("Profile update error:", error);
      setErrorMessage("Could not update profile.");
    }
  };

  const handleDeleteAccount = async () => {
    setMessage("");
    setErrorMessage("");

    try {
      await deleteUserProfile(user);
      await logoutUser();
      navigate("/register");
    } catch (error) {
      console.error("Delete account error:", error);
      setErrorMessage("Could not delete account.");
    }
  };

  return (
    <section className="profile-page">
      <h2>My Profile</h2>

      {profile && (
        <p className="profile-email">
          <strong>Email:</strong> {profile.email}
        </p>
      )}

      <form className="auth-form" onSubmit={handleSubmit}>
        <label htmlFor="profile-name">Name</label>
        <input
          id="profile-name"
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />

        <label htmlFor="profile-address">Address</label>
        <input
          id="profile-address"
          type="text"
          value={address}
          onChange={(event) => setAddress(event.target.value)}
        />

        <button type="submit">Save Profile</button>
      </form>

      {message && <p className="cart-success">{message}</p>}
      {errorMessage && <p className="auth-error">{errorMessage}</p>}

      <button
        type="button"
        className="profile-delete-button"
        onClick={handleDeleteAccount}
      >
        Delete Account
      </button>
    </section>
  );
}

export default ProfilePage;
