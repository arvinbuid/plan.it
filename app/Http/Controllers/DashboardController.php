<?php

namespace App\Http\Controllers;

use App\Models\Event;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $totalEvents = Event::count();
        $upcomingEventsCount = Event::where('start_time', '>=', now())->count();
        $ongoingEvents = Event::where('start_time', '<=', now())->where('end_time', '>=', now())->count();
        $pastEvents = Event::where('end_time', '<', now())->count();

        $eventsChartData = Event::query()
            ->selectRaw('DATE(start_time) as date, COUNT(*) as total')
            ->groupBy('date')
            ->orderBy('date')
            ->get();

        return Inertia::render('Dashboard/Index', [
            'stats' => [
                'totalEvents' => $totalEvents,
                'upcomingEventsCount' => $upcomingEventsCount,
                'ongoingEvents' => $ongoingEvents,
                'pastEvents' => $pastEvents
            ],
            'eventsChartData' => $eventsChartData
        ]);
    }
}
