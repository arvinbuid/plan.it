<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Scope;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
    /** @use HasFactory<\Database\Factories\EventFactory> */
    use HasFactory;

    protected $fillable = [
        'title',
        'description',
        'location',
        'type',
        'start_time',
        'end_time'
    ];

    protected $casts = [
        'start_time' => 'datetime',
        'end_time' => 'datetime'
    ];

    #[Scope]
    public function sortBy(Builder $query, $sort, $order = 'desc')
    {
        $columns = ['title', 'created_at', 'updated_at', 'start_time', 'location'];
        $orders = ['desc', 'asc'];

        if (! in_array($sort, $columns)) {
            $sort = 'created_at';
        }

        if (! in_array(strtolower($order), $orders)) {
            $order = 'desc';
        }

        return $query->orderBy($sort, $order);
    }

    #[Scope]
    public function search(Builder $query, $searchTerm)
    {
        if (!filled($searchTerm)) {
            return $query;
        }

        $term = trim($searchTerm);

        return $query->where(function ($q) use ($term) {
            $q->where('title', 'like', "%{$term}%")
                ->orWhere('description', 'like', "%{$term}%")
                ->orWhere('location', 'like', "%{$term}%")
                ->orWhere('type', 'like', "%{$term}%");
        });
    }
}
