<?php

namespace App\Providers;

use App\Models\Event;
use App\Models\User;
use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Gate;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Gate::define('update-event', function (User $user, Event $event) {
            return $user->id === $event->user_id;
        });

        Gate::define('delete-event', function (User $user, Event $event) {
            return $user->id === $event->user_id;
        });

        Gate::define('update-user', function (User $user, User $anotherUser) {
            return $user->id === $anotherUser->id;
        });

        Gate::define('delete-user', function (User $user, User $anotherUser) {
            return $user->id === $anotherUser->id;
        });
    }
}
