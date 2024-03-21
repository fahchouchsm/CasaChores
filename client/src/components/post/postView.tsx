import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PostHead from "./posthead";
import Loading from "../../pages/loading";

const PostView: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [post, setPost] = useState<any>();
  const { id } = useParams();
  const fetchData = async () => {
    const result = await axios.get(`http://localhost:3001/get/post/${id}`);
    await setPost(result.data.post);
  };

  useEffect(() => {
    try {
      fetchData();
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  if (loading || !post) {
    return (
      <div className="h-96">
        <Loading />
      </div>
    );
  }

  return (
    <div className="sm:mx-20 md:mx-10 mt-8 mx-2">
      <PostHead post={post} fetchData={fetchData} />
    </div>
  );
};

export default PostView;
