import { Area, AreaChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis } from 'recharts';

interface EventsChartProps {
    data: Array<{
        date: string;
        total: number;
    }>
}

const EventsChart = (data: EventsChartProps) => {
    return (
        <AreaChart
            style={{ width: '100%', maxWidth: '700px', maxHeight: '55vh', aspectRatio: 1.618 }}
            responsive
            data={data.data}
            margin={{ top: 30, right: 0, left: 0, bottom: 0 }}
        >
            <defs>
                <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#e12afb" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#e12afb" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#e12afb" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#e12afb" stopOpacity={0} />
                </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
                dataKey='date'
                tickCount={0}
                interval={6}
                tickFormatter={(value) =>
                    new Date(value).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric'
                    })}
            />
            <YAxis width="auto" allowDecimals={false} />
            <Tooltip />
            <Legend verticalAlign="top" height={36} />
            <Area
                type="basisOpen"
                dataKey="date"
                stroke="#5049d6"
                fillOpacity={1}
                fill="url(#colorUv)"
            />
            <Area
                type="basisOpen"
                dataKey="total"
                stroke="#e12afb"
                fillOpacity={1}
                fill="url(#colorPv)"
            />
        </AreaChart>
    );
}

export default EventsChart;