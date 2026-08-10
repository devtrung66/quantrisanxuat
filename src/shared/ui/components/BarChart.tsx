import {
  BarChart as RBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from "recharts";

export interface BarDatum {
  name: string;
  plan: number;
  done: number;
}

export function BarChart({ data }: { data: BarDatum[] }) {
  return (
    <ResponsiveContainer width="100%" height={260}>
      <RBarChart data={data} barGap={4} margin={{ top: 10, right: 8, left: -12, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eef2f7" />
        <XAxis dataKey="name" tick={{ fontSize: 11, fill: "#64748b" }} axisLine={false} tickLine={false} />
        <YAxis tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
        <Tooltip cursor={{ fill: "#f8fafc" }} />
        <Legend wrapperStyle={{ fontSize: 12 }} />
        <Bar dataKey="plan" name="Kế hoạch" fill="#2563eb" radius={[3, 3, 0, 0]} maxBarSize={26} />
        <Bar dataKey="done" name="Đã hoàn thành" fill="#16a34a" radius={[3, 3, 0, 0]} maxBarSize={26} />
      </RBarChart>
    </ResponsiveContainer>
  );
}
