import React, { useState, useEffect } from 'react';
import { useUserSocialLinkStore } from '../stores/userSocialLinkStore';

// 허용된 소셜 플랫폼 목록
const socialPlatforms = ["GitHub", "Twitter", "LinkedIn", "Instagram"];

// URL 유효성 검사 정규식
const urlPattern = /^https?:\/\/[a-zA-Z0-9.-]+\.[a-z]{2,}\/?.*$/;

const UserSocialLinks: React.FC = () => {
  const { socialLinks, setSocialLinks } = useUserSocialLinkStore();
  const [selectedPlatform, setSelectedPlatform] = useState('');
  const [url, setUrl] = useState('');

  // socialLinks가 배열인지 확인하고, 그렇지 않으면 빈 배열로 설정
  const validSocialLinks = Array.isArray(socialLinks) ? socialLinks : [];

  useEffect(() => {
    // socialLinks가 배열이 아닐 경우 빈 배열로 설정
    if (!Array.isArray(socialLinks)) {
      setSocialLinks([]);
    }
  }, [socialLinks, setSocialLinks]);

  const handleAddSocialLink = () => {
    if (!selectedPlatform || !url) {
      alert('플랫폼과 URL을 입력해주세요.');
      return;
    }

    if (!urlPattern.test(url)) {
      alert('올바른 URL 형식이 아닙니다.');
      return;
    }

    // 이미 추가된 플랫폼인지 확인
    if (validSocialLinks.some((link) => link.socialPlatform === selectedPlatform)) {
      alert('이미 추가된 플랫폼입니다.');
      return;
    }

    // 새로운 소셜 링크 추가
    setSocialLinks([...validSocialLinks, { socialPlatform: selectedPlatform, url }]);
    setSelectedPlatform('');
    setUrl('');
  };

  const handleRemoveSocialLink = (platform: string) => {
    setSocialLinks(validSocialLinks.filter((link) => link.socialPlatform !== platform));
  };

  return (
    <div>
      <label>소셜 링크 추가:</label>
      <div>
        <select value={selectedPlatform} onChange={(e) => setSelectedPlatform(e.target.value)}>
          <option value="">플랫폼 선택</option>
          {socialPlatforms
            .filter((platform) => !validSocialLinks.some((link) => link.socialPlatform === platform))
            .map((platform) => (
              <option key={platform} value={platform}>
                {platform}
              </option>
            ))}
        </select>

        <input type="text" placeholder="URL 입력" value={url} onChange={(e) => setUrl(e.target.value)} />
        <button onClick={handleAddSocialLink}>추가</button>
      </div>

      <ul>
        {validSocialLinks.map((link) => (
          <li key={link.socialPlatform}>
            {link.socialPlatform}: {link.url}
            <button onClick={() => handleRemoveSocialLink(link.socialPlatform)}>삭제</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserSocialLinks;
