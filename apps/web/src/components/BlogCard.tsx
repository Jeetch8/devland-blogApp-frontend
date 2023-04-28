interface BlogCardProps {
  title: string;
  description: string;
  image: string;
  author: string;
  date: string;
}

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import { useNavigate, useNavigation } from "react-router-dom";
import CommentIcon from "@mui/icons-material/Comment";
import FavoriteIcon from "@mui/icons-material/Favorite";

export default function BlogCard({ obj }: any) {
  const navigate = useNavigate();
  const navigateToBlog = () => {
    let title = obj.title;
    let temp = encodeURIComponent(title.replace(/\s+/g, "-"));
    navigate(`/blog/${temp}-${obj.id}`);
  };

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea onClick={navigateToBlog}>
        <CardMedia
          component="img"
          height="140"
          image={obj.banner_img}
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {obj.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {obj.short_description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <span>
          <FavoriteIcon /> {obj.number_of_likes}
        </span>
        <span>
          <CommentIcon /> {obj.number_of_comments}
        </span>
      </CardActions>
    </Card>
  );
}
