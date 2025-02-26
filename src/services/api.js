export const fetchProfile = async (token) => {
    try {
      const response = await fetch("http://localhost:8080/api/v1/auth/my", {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
  
      if (!response.ok) throw new Error("인증 실패");
  
      return await response.json(); // { username: "testUser" } 같은 응답 예상
    } catch (error) {
      console.error(error);
      return null;
    }
  };
  