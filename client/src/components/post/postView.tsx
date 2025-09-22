import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PostHead from "./posthead";
import Loading from "../../pages/loading";

interface postView {
  userData: any;
  loged: boolean;
}

const PostView: React.FC<postView> = ({ userData, loged }) => {
  const [loading, setLoading] = useState(true);
  const [post, setPost] = useState<any>();
  const { id } = useParams();

  const fakePost = {
    _id: "1",
    title: "React Wizard - Pixel-Perfect Apps",
    description:
      "Need a React app that works flawlessly? I'll deliver clean code, responsive UI, and zero bugs. Let's build something great.",
    city: "Casablanca",
    serviceOfred: ["React", "TypeScript", "Tailwind"],
    images: [
      "https://picsum.photos/id/1018/800/600",
      "https://picsum.photos/id/1024/800/600",
      "https://picsum.photos/id/1025/800/600",
      "https://picsum.photos/id/1036/800/600",
    ],
    // This is likely what PostComment needs - post-level comments
    comments: [
      {
        _id: "comment1",
        text: "Omar delivered my React app on time and it was flawless! 5 stars!",
        user: {
          _id: "user2",
          name: "Aicha",
          lastName: "Hassan",
          pfpLink: "https://picsum.photos/id/1025/150/150",
        },
        rating: 5,
        createdAt: "2024-01-15T10:30:00Z",
      },
      {
        _id: "comment2",
        text: "Best React developer in Casablanca. Highly recommend!",
        user: {
          _id: "user3",
          name: "Karim",
          lastName: "El Idrissi",
          pfpLink: "https://picsum.photos/id/659/150/150",
        },
        rating: 5,
        createdAt: "2024-01-10T14:20:00Z",
      },
      {
        _id: "comment3",
        text: "Professional, communicative, and delivered exactly what I needed.",
        user: {
          _id: "user4",
          name: "Leila",
          lastName: "Bennani",
          pfpLink: "https://picsum.photos/id/823/150/150",
        },
        rating: 4,
        createdAt: "2024-01-05T09:15:00Z",
      },
    ],
    user: {
      _id: "user1",
      name: "Omar",
      lastName: "Belkacem",
      pfpLink: "https://picsum.photos/id/237/150/150",
      userRating: 4.8,
      reviews: [
        {
          _id: "review1",
          rating: 5,
          text: "Great work!",
          user: { name: "Aicha" },
        },
        {
          _id: "review2",
          rating: 5,
          text: "Amazing!",
          user: { name: "Karim" },
        },
        {
          _id: "review3",
          rating: 4,
          text: "Good job",
          user: { name: "Leila" },
        },
        {
          _id: "review4",
          rating: 5,
          text: "Perfect!",
          user: { name: "Nabil" },
        },
        {
          _id: "review5",
          rating: 5,
          text: "Excellent!",
          user: { name: "Soukaina" },
        },
      ],
      // Keep this for the count in PostHead, but comments are at post level
      comments: [], // Empty since post.comments is what matters
    },
    seller: {
      bio: "Seasoned React dev with 5+ years crushing frontends. I turn coffee into code and bugs into features. Let's collab!",
      userName: "@omar_reactguru",
    },
  };

  const fetchData = async () => {
    setPost(fakePost);
    setLoading(false);
  };

  useEffect(() => {
    try {
      fetchData();
    } catch (error) {
      console.log("Fetch failed, using fake data", error);
      setPost(fakePost);
      setLoading(false);
    }
  }, [id]);

  if (loading || !post) {
    return (
      <div className="h-96">
        <Loading />
      </div>
    );
  }

  return (
    <div className="lg:mx-20 md:mx-10 mt-8 mx-3">
      <PostHead
        post={post}
        loged={loged}
        userData={userData}
        fetchData={fetchData}
      />
    </div>
  );
};

export default PostView;
