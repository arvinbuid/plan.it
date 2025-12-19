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
        return Inertia::render('Dashboard/Index', [
            'stats' => [
                'totalEvents' => $totalEvents
            ]
        ]);
    }
}
