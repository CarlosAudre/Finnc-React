import {
  Area,
  AreaChart,
  CartesianGrid,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function OverviewChart({ data }) {
  const monthsPT = {
    JANUARY: "Janeiro",
    FEBRUARY: "Fevereiro",
    MARCH: "Março",
    APRIL: "Abril",
    MAY: "Maio",
    JUNE: "Junho",
    JULY: "Julho",
    AUGUST: "Agosto",
    SEPTEMBER: "Setembro",
    OCTOBER: "Outubro",
    NOVEMBER: "Novembro",
    DECEMBER: "Dezembro",
  };

  const chartData = data.map((d) => ({
    month: monthsPT[d.month],
    saldo: d.value,
    gasto: d.totalSpent,
    economia: d.totalEconomy,
  }));

  const legends = [
    { label: "Saldo", color: "#8E51FF" },
    { label: "Gasto", color: "#EF4444" },
    { label: "Economia", color: "#10B981" },
  ];

  return (
    <div className="w-full">
      <Card className="bg-zinc-50/5 md:gap-8">
        <CardHeader>
          <CardTitle className="flex justify-between text-white font-semibold text-lg">
            <p>Evolução mensal</p>
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
          <Legend />
        </CardHeader>

        <CardContent>
          <div className="w-full h-45 md:h-100">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={chartData}
                margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
              >
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
                  tick={{ fill: "#fff" }}
                  axisLine={false}
                  tickLine={false}
                  domain={[0, "dataMax + 500"]}
                />

                <Tooltip/> //card

                <defs>
                  <linearGradient
                    id="saldoGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="0%" stopColor="#8E51FF" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="#8E51FF" stopOpacity={0} />
                  </linearGradient>

                  <linearGradient
                    id="economiaGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="0%" stopColor="#10B981" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="#10B981" stopOpacity={0} />
                  </linearGradient>

                  <linearGradient
                    id="gastoGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="0%" stopColor="#EF4444" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="#EF4444" stopOpacity={0} />
                  </linearGradient>
                </defs>

                <Area
                  type="monotone"
                  dataKey="gasto"
                  stroke="#EF4444"
                  fill="url(#gastoGradient)"
                />

                <Area
                  type="monotone"
                  dataKey="economia"
                  stroke="#10B981"
                  fill="url(#economiaGradient)"
                />

                <Area
                  type="monotone" //Line type
                  dataKey="saldo"
                  stroke="#8E51FF" //Line color
                  fill="url(#saldoGradient)" //Area color
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
