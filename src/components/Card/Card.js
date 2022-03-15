import React from "react";

export const Card = ({ owner, full_name, stargazers_count, description }) => {
  return (
    <div>
      {owner.avatar_url}
      {full_name}
      {stargazers_count}
      {description}
    </div>
  );
};
