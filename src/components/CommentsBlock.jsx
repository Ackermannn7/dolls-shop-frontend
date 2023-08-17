import React from "react";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import Skeleton from "@mui/material/Skeleton";
import { Typography } from "@mui/material";
export const CommentsBlock = ({ items, isLoading = true }) => {
  return (
    <div style={{ margin: "0px" }}>
      <List>
        {(isLoading ? [...Array(5)] : items).map((obj, index) => (
          <React.Fragment key={index}>
            <ListItem>
              <ListItemAvatar>
                {isLoading ? (
                  <Avatar sx={{ width: 32, height: 32, marginBottom: 0.5 }} />
                ) : (
                  <Avatar alt={obj.fullName} src={obj.avatarUrl} />
                )}
              </ListItemAvatar>
              {isLoading ? (
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <Skeleton variant="text" height={25} width={120} />
                  <Skeleton variant="text" height={25} width={120} />
                  <Skeleton variant="text" height={18} width={230} />
                </div>
              ) : (
                <ListItemText>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row-reverse",
                      justifyContent: "space-between",
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: "1.2em",
                        "@media (max-width:768px)": {
                          fontSize: "1em",
                        },
                      }}
                      variant="text"
                    >
                      {new Date(obj.createdAt).toLocaleDateString()}
                    </Typography>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: "1.2em",
                          "@media (max-width:768px)": {
                            fontSize: "1em",
                          },
                        }}
                        variant="text"
                      >
                        {obj.fullName}
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: "1em",
                          "@media (max-width:768px)": {
                            fontSize: "0.8em",
                          },
                        }}
                        variant="text"
                      >
                        {obj.comment}
                      </Typography>
                    </div>
                  </div>
                </ListItemText>
              )}
            </ListItem>
            <Divider variant="inset" component="li" />
          </React.Fragment>
        ))}
      </List>
    </div>
  );
};
