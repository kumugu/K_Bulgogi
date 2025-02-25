import React from 'react';
import { useLocation } from 'react-router-dom';

const Profile = () => {
  const location = useLocation();
  const username = location.state?.username;

  return (
    <div className="profile-container">
      <h2>내 페이지</h2>
      {username ? (
        <div>
          <p>환영합니다, {username}님!</p>
        </div>
      ) : (
        <p>사용자 정보가 없습니다. 로그인 해주세요.</p>
      )}
    </div>
  );
};

export default Profile;
