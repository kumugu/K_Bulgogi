import React, { useState, useEffect } from 'react';
import { useAuthStore } from '../stores/authStore'; 
import { getUserSettings, updateUserSetting } from '../api/userSettingsAPI';

const EmailSettings: React.FC = () => {
  const userId = useAuthStore((state) => state.user?.userId);
  const [emailSettings, setEmailSettings] = useState({
    emailPost: false,
    emailComment: false,
    emailMarketing: false,
  });

  useEffect(() => {
    if (!userId) {
      console.error('User ID가 없습니다.');
      return; // userId가 없으면 API 호출 안 함
    }
  
    const fetchData = async () => {
      try {
        const userSettings = await getUserSettings(userId);
        setEmailSettings({
          emailPost: userSettings.emailPost,
          emailComment: userSettings.emailComment,
          emailMarketing: userSettings.emailMarketing,
        });
      } catch (error) {
        console.error('사용자 설정을 가져오는 중 오류 발생:', error);
      }
    };
  
    fetchData();
  }, [userId]);

  const handleSave = async (key: keyof typeof emailSettings) => {
    try {
      await updateUserSetting(key, emailSettings[key]);
      alert('저장되었습니다!');
    } catch (error) {
      alert('저장 실패');
    }
  };

  return (
    <div>
      <h3>이메일 설정</h3>
      {Object.entries(emailSettings).map(([key, value]) => (
        <div key={key}>
          <label>{key}</label>
          <input
            type="checkbox"
            checked={value}
            onChange={(e) => setEmailSettings({ ...emailSettings, [key]: e.target.checked })}
          />
          <button onClick={() => handleSave(key as keyof typeof emailSettings)}>저장</button>
        </div>
      ))}
    </div>
  );
};

export default EmailSettings;
