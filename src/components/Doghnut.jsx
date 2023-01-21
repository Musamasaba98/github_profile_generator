import React from "react";
import { PieChart, Pie, Cell, Legend, ResponsiveContainer } from "recharts";
import _ from "lodash";
import { Grid, Typography } from "@mui/material";

const Doghnut = ({ loader }) => {
  const languages = {};
  const colors = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "red", "pink"];
  loader
    .filter((repo) => !repo.fork)
    .forEach((repo) => {
      if (!languages[repo.language]) {
        languages[repo.language] = 0;
      }
      languages[repo.language] += repo.stargazers_count;
    });
  const labels = Object.keys(languages);
  const values = Object.values(languages);
  const data = _.zip(labels, values).map((data) => ({
    name: data[0],
    value: data[1],
  }));

  return (
    <Grid item xs={12} sm={6} md={4} p={0}>
      <Typography
        variant="h4"
        element="h4"
        sx={{
          borderBottom: "5px dotted #f2faf3",
          maxWidth: "23rem",
          textAlign: "center",
          marginLeft: "2rem",
        }}
      >
        Stars per Language
      </Typography>
      <ResponsiveContainer width="100%" aspect={1}>
        <PieChart width={400} height={300}>
          <Legend layout="vertical" verticalAlign="top" align="left" />
          <Pie
            data={data}
            dataKey="value"
            outerRadius={120}
            innerRadius={70}
            color={colors}
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={colors[index % colors.length]}
              />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </Grid>
  );
};

export default Doghnut;
