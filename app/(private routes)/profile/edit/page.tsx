'use client'

import Image from "next/image";
import css from './EditProfilePage.module.css';
import { useEffect, useState } from 'react';
import { getMe, updateMe } from '@/lib/api/serverApi';


const EditProfile = () => {
const [userName, setUserName] = useState('');

	useEffect(() => {
    getMe().then((user) => {
      setUserName(user.userName ?? '');
    });
  }, []);

 const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(event.target.value);
  };

    const handleSaveUser = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await updateMe({ userName});
  };

    return (
        <main className={css.mainContent}>
  <div className={css.profileCard}>
    <h1 className={css.formTitle}>Edit Profile</h1>

    <Image src="avatar"
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
          onChange={handleChange}
        />
      </div>

      <p>Email: user_email@example.com</p>

      <div className={css.actions}>
        <button type="submit" className={css.saveButton}>
          Save
        </button>
        <button type="button" className={css.cancelButton}>
          Cancel
        </button>
      </div>
    </form>
  </div>
</main>
    )
}

export default EditProfile;