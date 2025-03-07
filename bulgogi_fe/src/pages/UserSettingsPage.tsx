import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BasicSettings from '../components/BasicSettings';
import EmailSettings from '../components/EmailSettings';
import SocialLinks from '../components/UserSocialLinks';

const categories = [
  { key: 'basic', label: '기본 설정' },
  { key: 'email', label: '이메일 설정' },
  { key: 'social', label: '소셜 링크 설정' },
];

const UserSettingsPage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<'basic' | 'email' | 'social'>('basic');

const handleLogoutClick = () => {
  navigate('/');
}

  return (
    <div>
      {/* 카테고리 선택 UI */}
      <div style={{ display: 'flex', gap: '10px' }}>
        {categories.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setSelectedCategory(key as 'basic' | 'email' | 'social')}
            style={{
              padding: '10px',
              borderBottom: selectedCategory === key ? '2px solid blue' : 'none',
            }}
          >
            {label}
          </button>
        ))}
      </div>

      {/* 선택된 설정만 표시 */}
      <div>
        {selectedCategory === 'basic' && <BasicSettings />}
        {selectedCategory === 'email' && <EmailSettings />}
        {selectedCategory === 'social' && <SocialLinks />}
      </div>
      <button onClick={handleLogoutClick}>Logout</button>
    </div>
    
  );
};

export default UserSettingsPage;
