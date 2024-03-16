interface postImgs {
  post: any;
}

const PostImgs: React.FC<postImgs> = ({ post }) => {
  return (
    <div className="flex gap-3">
      {post.images.map((img: string, i: number) => {
        return (
          <img
            src={img}
            className="w-24 h-24 rounded-lg bg-cover cursor-pointer"
            alt={i + ""}
            key={i}
          />
        );
      })}
    </div>
  );
};

export default PostImgs;
