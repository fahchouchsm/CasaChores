import NavBar from "../components/navbar/navBar";
import PostView from "../components/post/postView";

interface post {
  loged: boolean;
  userData: any;
}

const Post: React.FC<post> = ({ userData, loged }) => {
  return (
    <>
      <NavBar loged={loged} userData={userData} />
      <PostView userData={userData} loged={loged} />
    </>
  );
};

export default Post;
