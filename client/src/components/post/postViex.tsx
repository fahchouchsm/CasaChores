import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PostHead from "./posthead";
import Loading from "../../pages/loading";

const PostView: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [post, setPost] = useState<any>();
  const { id } = useParams();
  useEffect(() => {
    try {
      const fetchData = async () => {
        const result = await axios.get(`http://localhost:3001/get/post/${id}`);
        await setPost(result.data.post);
      };
      fetchData();
      setLoading(false);
    } catch (error) {
      console.log(error);
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
    <div className="mx-20 mt-8">
      <PostHead post={post} />
    </div>
  );
};

export default PostView;
