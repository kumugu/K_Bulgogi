import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login"); // 토큰 없으면 로그인 페이지로 이동
      return;
    }

    const fetchProfileData = async () => {
      const data = await fetchProfile(token); // 프로필 데이터 가져오기
      if (data) {
        setUser(data); // 성공적으로 데이터를 가져오면 상태 업데이트
      } else {
        navigate("/login"); // 인증 실패 시 로그인 페이지로 이동
      }
    };

    fetchProfileData();
  }, [navigate]);

  if (!user) return <p>로딩 중...</p>;

  return (
    <div style={styles.container}>
      <h1>내 프로필</h1>
      <p><strong>아이디:</strong> {user.username}</p>
      <p><strong>이메일:</strong> {user.email}</p>
    </div>
  );
};

// 프로필 가져오는 함수
const fetchProfile = async (token) => {
  try {
    const response = await fetch("http://localhost:8080/api/v1/user/profile", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("프로필 정보를 가져오는데 실패했습니다.");
    }

    return await response.json(); // 데이터 반환
  } catch (error) {
    console.error("API 요청 실패:", error);
    return null; // 실패 시 null 반환
  }
};

const styles = {
  container: {
    marginTop: "80px",
    textAlign: "center",
    padding: "20px",
  }
};

export default Profile;
