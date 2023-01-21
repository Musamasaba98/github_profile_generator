import React from "react";
import { PieChart, Pie, Cell, Legend, ResponsiveContainer } from "recharts";
import _ from "lodash";
import { Grid, Typography } from "@mui/material";

const MyPieChart = ({ loader }) => {
  const languages = {};
  const colors = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "red", "pink"];
  loader
    .filter((repo) => !repo.fork)
    .forEach((repo) => {
      if (!languages[repo.language]) {
        languages[repo.language] = 0;
      }
      languages[repo.language] += 1;
    });
  const labels = Object.keys(languages);
  const values = Object.values(languages);
  const data = _.zip(labels, values).map((data) => ({
    name: data[0],
    value: data[1],
  }));
  //my pie chart
  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };
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
        Top Languages
      </Typography>
      <ResponsiveContainer width="100%" aspect={1}>
        <PieChart width={400} height={400}>
          <Legend layout="vertical" verticalAlign="top" align="left" />
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={125}
            fill="#8884d8"
            dataKey="value"
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

export default MyPieChart;
