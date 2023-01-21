import React from "react";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import _ from "lodash";
import { Grid, Typography } from "@mui/material";

function MyBarChart({ loader }) {
  const sortVariable = "stargazers_count";
  const numberOfRepos = 5;
  const sortRepo = loader
    .filter((repo) => !repo.fork)
    .sort((a, b) => b[sortVariable] - a[sortVariable])
    .slice(0, numberOfRepos);
  const labels = sortRepo.map((repo) => repo.name);
  const values = sortRepo.map((repo) => repo[sortVariable]);
  const dayta = _.zip(labels, values).map((dayta) => ({
    name: dayta[0],
    uv: dayta[1],
  }));
  console.log(dayta);
  const colors = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "red", "pink"];
  const getPath = (x, y, width, height) => {
    return `M${x},${y + height}C${x + width / 3},${y + height} ${
      x + width / 2
    },${y + height / 3}
  ${x + width / 2}, ${y}
  C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${
      x + width
    }, ${y + height}
  Z`;
  };

  const TriangleBar = (props) => {
    const { fill, x, y, width, height } = props;

    return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
  };
  return (
    <Grid item xs={12} sm={6} md={4}>
      <Typography
        variant="h4"
        element="h4"
        sx={{
          borderBottom: "5px dotted #f2faf3",
          maxWidth: "15rem",
          textAlign: "center",
        }}
      >
        Most Starred
      </Typography>
      <ResponsiveContainer width="100%" aspect={1}>
        <BarChart
          width={500}
          height={300}
          data={dayta}
          margin={{
            top: 20,
            right: 30,
            left: 10,
            bottom: 100,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="name"
            label={{
              value: "Repos",
              position: "insideBottomRight",
              offset: 0,
            }}
            angle={-45}
            textAnchor="end"
          />
          <YAxis
            dataKey="uv"
            label={{ value: "Stars", angle: -90, position: "insideLeft" }}
          />
          <Tooltip />
          <Bar
            dataKey="uv"
            fill="#8884d8"
            shape={<TriangleBar />}
            label={{ position: "top" }}
            background={{ fill: "#eee" }}
          >
            {dayta.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[index % 20]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </Grid>
  );
}

export default MyBarChart;
