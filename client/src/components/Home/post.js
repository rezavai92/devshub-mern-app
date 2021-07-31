import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import "./post.css";

import GetProfilePic from "../GetProfilePic/getProfilePic";
import { context } from "../../contexts/context";
import { Card, Button } from "react-bootstrap";
import Detail from "./detail";
const Post = (props) => {
  const [detail, setDetail] = useState({});
  const [image, setImage] = useState("");
  const [shortedText, setShortedText] = useState(props.text);
  const [willShowDetail, setWillShowDetail] = useState(false);
  const { loginToken } = useContext(context);
  //console.log("details.js",detail)

  useEffect(() => {
    async function fetchData() {
      try {
        const postCreatorProfile = await axios.get(
          `/api/profile/user/${props.userId}`
        );

        setImage(postCreatorProfile.data.profile.photo);
        //  console.log("post creator ",postCreatorProfile.data.profile.photo)
      } catch (error) {}
    }

    fetchData();

    const trimmed = shortedText.slice(0, 50);

    setShortedText(trimmed);
  }, []);
  const contReadHandler = () => {
    setWillShowDetail(true);
  };

  return (
    <div className="container">
      {willShowDetail ? (
        <div className="">
          <Detail detail={detail} id={props.id} image={image}></Detail>
        </div>
      ) : (
        <div className="postCard">
          <Card>
            <Card.Body>
              {image ? (
                <GetProfilePic
                  imgData={image}
                  height="50px"
                  borderRadius="50%"
                  width="50px"
                />
              ) : null}
              <Card.Title>{props.name}</Card.Title>
              <Card.Text>{props.date}</Card.Text>
              <Card.Text>
                {shortedText}
                <Button
                  variant="link"
                  onClick={() => {
                    contReadHandler();
                  }}
                >
                  {" "}
                  Continue reading
                </Button>
              </Card.Text>
            </Card.Body>
          </Card>
        </div>
      )}
    </div>
  );
};

export default Post;
