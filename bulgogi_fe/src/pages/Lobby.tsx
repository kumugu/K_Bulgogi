import { useEffect, useState } from "react";
import Navigation from "../components/Navigation";

interface Post {
  id: number;
  title: string;
  excerpt: string;
  author: string;
  createdAt: string;
}

// 예시용 더미 데이터
const dummyPosts: Post[] = [
  {
    id: 1,
    title: "블고기의 맛있는 비밀",
    excerpt: "한국의 대표적인 요리 중 하나인 불고기의 숨겨진 비밀 레시피를 공개합니다...",
    author: "요리왕",
    createdAt: "2025-02-25"
  },
  {
    id: 2,
    title: "React와 TypeScript로 블로그 만들기",
    excerpt: "최신 웹 기술을 활용하여 나만의 블로그 플랫폼을 구축하는 방법을 알아봅시다...",
    author: "코딩고수",
    createdAt: "2025-02-24"
  },
  {
    id: 3,
    title: "2025년 트렌드 예측",
    excerpt: "올해 주목해야 할 기술 트렌드와 변화에 대해 알아봅시다...",
    author: "트렌드헌터",
    createdAt: "2025-02-23"
  },
];

export default function Lobby() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 실제 구현에서는 API 호출로 대체
    const fetchPosts = async () => {
      try {
        // 백엔드 API 호출 (예시)
        // const response = await axios.get('/api/posts');
        // setPosts(response.data);
        
        // 현재는 더미 데이터 사용
        setTimeout(() => {
          setPosts(dummyPosts);
          setLoading(false);
        }, 500);  // 로딩 효과를 위한 딜레이
      } catch (error) {
        console.error("게시글 로딩 중 오류 발생:", error);
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navigation />
      
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-bulgogi-dark mb-4">블고기 로비</h1>
          <p className="text-lg text-gray-600">다양한 블로그 글을 확인하고 나만의 이야기를 공유해보세요.</p>
        </div>
        
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <p>게시글을 불러오는 중...</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <div key={post.id} className="card hover:shadow-lg transition-shadow">
                <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
                <p className="text-gray-600 mb-4">{post.excerpt}</p>
                <div className="flex justify-between text-sm text-gray-500">
                  <span>작성자: {post.author}</span>
                  <span>{post.createdAt}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}