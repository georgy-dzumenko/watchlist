import { motion, useAnimation } from "framer-motion";
import { useEffect, useState } from "react";
import { useHistory, useRouteMatch } from "react-router";
import { getCreatedList } from "./api";

export const ListSelector = ({ id, name }) => {
  const history = useHistory();
  const match = useRouteMatch('/lists/:listId?')
  const animation = useAnimation();

  useEffect(() => {
    console.log(match.params.listId, id)
    if(+match.params.listId === id) {
      animation.start({
        translateX: 10,
        transition: {duration: 0.01},
      })
    } else {
      animation.start({
        translateX: 0,
        transition: {duration: 0.01}
      })
    }
  }, [match.params.listId])

  return (
    <motion.div
      animate={animation}
      key={id}
      className="lists-page__list-option"
      onClick={() => {
        history.push(`/lists/${id}`)
      }}
    >
      {name}
    </motion.div>
  )
}