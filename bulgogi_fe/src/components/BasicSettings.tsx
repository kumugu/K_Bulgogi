import React, { useEffect, useState } from 'react';
import { useAuthStore } from '../stores/authStore'; 
import { useUserSettingsStore } from '../stores/userSettingsStore';
import { getUserSettings, updateUserSetting } from '../api/userSettingsAPI';

const BasicSettings: React.FC = () => {
  const userId = useAuthStore((state) => state.user?.userId); 
  const [settings, setSettings] = useState({
    bio: '',
    theme: '',
    language: '',
  });

  useEffect(() => {
    if (!userId) {
      console.error('User ID가 없습니다.');
      return;
    }

    const fetchData = async () => {
      try {
        const userSettings = await getUserSettings(userId);
        setSettings({
          bio: userSettings.bio,
          theme: userSettings.theme,
          language: userSettings.language,
        });
      } catch (error) {
        console.error('사용자 설정을 가져오는 중 오류 발생:', error);
      }
    };

    fetchData();
  }, [userId]);

  const handleSave = async (key: keyof typeof settings) => {
    if (!userId) return;
    
    try {
      await updateUserSetting(userId, key, settings[key]);
      alert('저장되었습니다!');
    } catch (error) {
      alert('저장 실패');
    }
  };
 
  return (
    <div>
      <h3>기본 설정</h3>
      <div>
        <label>자기소개</label>
        <textarea
          value={settings.bio}
          placeholder="자기소개를 입력하세요..."
          onChange={(e) => setSettings({ ...settings, bio: e.target.value })}
        />
        <button onClick={() => handleSave('bio')}>저장</button>
      </div>

      <div>
        <label>테마</label>
        <select
          value={settings.theme}
          onChange={(e) => setSettings({ ...settings, theme: e.target.value })}
        >
          <option value="light">라이트</option>
          <option value="dark">다크</option>
          <option value="system">시스템 설정</option>
        </select>
        <button onClick={() => handleSave('theme')}>저장</button>
      </div>

      <div>
        <label>언어</label>
        <select
          value={settings.language}
          onChange={(e) => setSettings({ ...settings, language: e.target.value })}
        >
          <option value="ko">한국어</option>
          <option value="en">영어</option>
          <option value="ja">일본어</option>
        </select>
        <button onClick={() => handleSave('language')}>저장</button>
      </div>
    </div>
  );
};

export default BasicSettings;