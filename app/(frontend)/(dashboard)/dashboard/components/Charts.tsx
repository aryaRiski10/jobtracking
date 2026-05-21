'use client'
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"

interface ChartProps {
  data: { week: string; applications: number }[]
}

export default function ApplicationActivityChart({ data }: ChartProps) {
  return (
    <ResponsiveContainer width="100%" height={200}>
      <AreaChart data={data}>
        <defs>
          <linearGradient id="colorApp" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2}/>
            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
          </linearGradient>
        </defs>
        <XAxis dataKey="week" />
        <YAxis />
        <Tooltip />
        <Area
          type="monotone"
          dataKey="applications"
          stroke="#3b82f6"
          fill="url(#colorApp)"
          strokeWidth={2}
          dot={{ r: 4, fill: "#3b82f6" }}
        />
      </AreaChart>
    </ResponsiveContainer>
  )
}