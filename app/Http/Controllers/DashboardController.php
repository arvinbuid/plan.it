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
        $upcomingEvents = Event::where('start_time', '>=', now())->count();
        $ongoingEvents = Event::where('start_time', '<=', now())->where('end_time', '>=', now())->count();
        $pastEvents = Event::where('end_time', '<', now())->count();

        return Inertia::render('Dashboard/Index', [
            'stats' => [
                'totalEvents' => $totalEvents,
                'upcomingEvents' => $upcomingEvents,
                'ongoingEvents' => $ongoingEvents,
                'pastEvents' => $pastEvents
            ]
        ]);
    }
}
