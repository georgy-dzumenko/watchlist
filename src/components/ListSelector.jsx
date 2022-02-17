import { motion, useAnimation } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useHistory, useRouteMatch } from "react-router";
import { getCreatedList } from "./api";
import lottie from "lottie-web";

export const ListSelector = ({ id, name }) => {
  const history = useHistory();
  const match = useRouteMatch('/lists/:listId?')
  const animation = useAnimation();

  useEffect(() => {
    console.log(match.params.listId, id)
    if(+match.params.listId === id) {
      animation.start({
        transformOrigin: "left bottom",
        height: "75px",
        fontSize: "30px",
        backgroundColor: "red",
        transition: {duration: 0.01},
      })
    } else {
      animation.start({
        transformOrigin: "left bottom",
        height: "50px",
        fontSize: "20px",
        backgroundColor: "rgba(255, 0, 0, 0.5)",
        transition: {duration: 0.01},
      })
    }
  }, [match.params.listId])

  return (
    <motion.div
      animate={animation}
      key={id}
      className="lists-page__list-option"
      onClick={() => {
        if(window.location.href.includes(`${id}`)) {
          history.push(`/lists`)
          return;  
        }
        history.push(`/lists/${id}`)
      }}
    >
      {name}
    </motion.div>
  )
}