import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import MoreVertIcon from "@mui/icons-material/More";
import HowToVoteIcon from "@mui/icons-material/HowToVote";
import { Box } from "@mui/material";

const CardVoting = ({
  id,
  profile,
  username,
  description,
  title,
  imgUrl,
  signatures,
  expired,
  created,
  mainContract,
  account,
  getAllPetisi,
}) => {
  const sortString = (field, maxLength) => {
    return field.split(" ").slice(0, maxLength).join(" ") + "...";
  };

  console.log(Number(signatures));

  const formatDate = (dateString) => {
    const number = Number(dateString);
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    const date = new Date(number * 1000);
    return date.toLocaleDateString("id-ID", options);
  };

  const giveSignature = async (id) => {
    if (!account) {
      alert("Please connect your wallet first");
      return;
    }
    try {
      const tx = await mainContract.vote(id);
      tx.wait();
      alert("Signature Success");
      getAllPetisi();
    } catch (error) {
      alert(error.reason);
    }
  };

  return (
    <Card sx={{ width: 345, height: 550 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            <img src={profile} alt="profileImg" />
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={sortString(title, 7)}
        subheader={formatDate(created)}
      />
      <CardMedia component="img" height="194" image={imgUrl} alt={title} />
      <CardContent>
        <Typography
          variant="body2"
          sx={{ color: "text.secondary", textAlign: "justify" }}
        >
          {sortString(description, 30)}
        </Typography>
      </CardContent>
      <CardActions sx={{ display: "flex", justifyContent: "space-around" }}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <IconButton
            aria-label="add to favorites"
            onClick={() => giveSignature(id)}
          >
            <HowToVoteIcon fontSize="large" />
          </IconButton>
          <Typography variant="body2" color="text.secondary">
            {signatures} Signatures
          </Typography>
        </Box>
        <Typography variant="body2">{formatDate(expired)}</Typography>
      </CardActions>
    </Card>
  );
};

export default CardVoting;
