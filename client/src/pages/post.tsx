import NavBar from "../components/navbar/navBar";
import PostView from "../components/post/postView";

interface post {
  loged: boolean;
  userData: any;
}

const Post: React.FC<post> = ({ loged, userData }) => {
  return (
    <>
      <NavBar loged={loged} userData={userData} />
      <PostView />
    </>
  );
};

export default Post;
