import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CategoriesDetails } from "./CategoriesDetails";

export function CategoriesChart({ data }) {
  const totalValue = data.reduce((acc, d) => acc + d.value, 0) || 1;
  const chartData = data.map((d) => ({
    title: d.title,
    value: d.value,
    percent: ((d.value / totalValue) * 100).toFixed(1),
  }));

  // Generates visually distinct colors based on index using golden angle
  const getColor = (index) => {
    const hue = (index * 137.508) % 360;
    return `hsl(${hue}, 65%, 50%)`;
  };

  const isMobile = window.innerWidth < 768;

  return (
    <div className="w-full flex flex-col md:flex-row gap-5 ">
      <Card className="w-full md:w-1/2 bg-zinc-50/5">
        <CardHeader>
          <CardTitle className="flex justify-between text-white font-semibold text-lg p-3">
            <p>Gastos por Categoria</p>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="w-full h-45 md:h-100">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  dataKey="value"
                  nameKey="title"
                  innerRadius={isMobile ? 50 : 80}
                  outerRadius={isMobile ? 80 : 120}
                  paddingAngle={4}
                  cornerRadius={3}
                  stroke="#FFFFFF70"
                  strokeWidth={2}
                >
                  {data.map((d, index) => (
                    <Cell key={index} fill={getColor(index)} />
                  ))}
                </Pie>

                <Tooltip
                  contentStyle={{
                    backgroundColor: "#18181b",
                    border: "1px solid #27272a",
                    borderRadius: "8px",
                  }}
                  labelStyle={{ color: "#FFFFFF" }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card className="w-full md:w-1/2 bg-zinc-50/5 ">
        <CardHeader>
          <CardTitle className="flex justify-between text-white font-semibold text-lg p-3">
            <p>Detalhamento</p>
          </CardTitle>
        </CardHeader>

        <CardContent>
          <div className="flex flex-col gap-5 max-h-100 overflow-y-auto pr-2">
            {chartData.map((d, index) => (
              <CategoriesDetails
                key={d.name}
                categoria={d.title}
                value={d.value}
                color={getColor(index)}
                percent={d.percent}
              />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
