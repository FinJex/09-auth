'use client'

import Image from "next/image";
import css from './EditProfilePage.module.css';
import { useEffect, useState } from 'react';
import { getMe } from '@/lib/api/clientApi';
import { useRouter } from 'next/navigation';
import { updateMe } from "@/lib/api/clientApi";
import { useAuthStore } from '@/lib/store/authStore';
import { User } from "@/types/user";


const EditProfile = () => {
  const router = useRouter();
const [userName, setUserName] = useState('');
const setUser = useAuthStore((state) => state.setUser);
const [user, setLocalUser] = useState<User | null>(null);
const [loading, setLoading] = useState(false);
const [error, setError] = useState('');
	useEffect(() => {
    getMe().then((user) => {
      setLocalUser(user);
      setUserName(user.username ?? '');
    });
  }, []);

 const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(event.target.value);
  };

const handleSaveUser = async (
  event: React.FormEvent<HTMLFormElement>
) => {
  event.preventDefault();

  try {
    setLoading(true);
    setError('');

    const updatedUser = await updateMe({
      username: userName,
    });

    setUser(updatedUser);
    setLocalUser(updatedUser);
  } catch {
    setError('Failed to update profile');
  } finally {
    setLoading(false);
  }
};

    return (
        <main className={css.mainContent}>
  <div className={css.profileCard}>
    <h1 className={css.formTitle}>Edit Profile</h1>

    <Image src={user?.avatar ?? ''}
      alt="User Avatar"
      width={120}
      height={120}
      className={css.avatar}
    />

    <form className={css.profileInfo} onSubmit={handleSaveUser}>
      <div className={css.usernameWrapper}>
        <label htmlFor="username">Username:</label>
        <input id="username"
          type="text"
          className={css.input}
          value={userName}
          onChange={handleChange}
        />
      </div>

      <p>Email: {user?.email}</p>

      {error && <p className={css.error}>{error}</p>}

      <div className={css.actions}>
        <button type="submit" className={css.saveButton} disabled={loading}>
          {loading ? 'Saving...' : 'Save'}
        </button>
        <button type="button" className={css.cancelButton} onClick={() => router.back()}>
          Cancel
        </button>
      </div>
    </form>
  </div>
</main>
    )
}

export default EditProfile;