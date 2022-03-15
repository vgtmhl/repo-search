import React from "react";
import style from "./Card.module.css";

export const Card = ({ owner, full_name, stargazers_count, description }) => {
  return (
    <div className={style.Card}>
      <div className={style.PrimaryInfo}>
        <div className={style.Intro}>
          <img
            className={style.RepoOwnerLogo}
            alt="owner logo"
            src={owner.avatar_url}
          />
          {full_name}
        </div>
        <div className={style.Stars}>★ {stargazers_count}</div>
      </div>

      <span>{description}</span>
    </div>
  );
};
