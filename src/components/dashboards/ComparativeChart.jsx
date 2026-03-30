import {
  BarChart,
  Bar,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MonthsPT } from "@/constants/MonthsPt";

export function ComparativeChart({ data }) {
  const chartData = data.map((d) => ({
    month: MonthsPT[d.month],
    saldo: d.value,
    gasto: d.totalSpent,
  }));

  const legends = [
    { label: "Saldo", color: "#8E51FF" },
    { label: "Gasto", color: "#EF4444" },
  ];


  return (
    <div className="w-full">
      <Card className="bg-zinc-50/5 md:gap-8">
        <CardHeader>
          <CardTitle className="flex justify-between text-white font-semibold text-lg">
            <p>Comparativo Mensal</p>
            <div className="flex flex-col md:flex-row gap-0.5 md:gap-3">
              {legends.map((item) => (
                <div key={item.label} className="flex items-center gap-1.5">
                  <div
                    className="w-3 h-3 md:w-4 md:h-4 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  <p className="text-sm md:text-base">{item.label}</p>
                </div>
              ))}
            </div>
          </CardTitle>
        </CardHeader>

        <CardContent>
          <div className="w-full h-45 md:h-100">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="0" stroke="#ffffff20" />

                <XAxis
                  dataKey="month"
                  tick={{ fill: "#fff" }}
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  tickFormatter={(value) => value.slice(0, 3)}
                />

                <YAxis
                  width={80}
                  tick={{ fill: "#fff" }}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(value) => `R$ ${value}`}
                />

                <Tooltip
                  cursor={{ fill: "#8E51FF20" }}
                  contentStyle={{
                    backgroundColor: "#18181b",
                    border: "1px solid #27272a",
                    borderRadius: "8px",
                  }}
                  labelStyle={{ color: "#FFFFFF" }}
                />

                <Bar dataKey="saldo" fill="#8E51FF" />
                <Bar dataKey="gasto" fill="#EF4444" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
