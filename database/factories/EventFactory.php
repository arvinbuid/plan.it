<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Event>
 */
class EventFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $title = fake()->randomElement(['class', 'meeting', 'exam_week']);
        $startDate = fake()->dateTimeBetween('-1 month', '+4 months');

        [$endDate, $type] = match ($title) {
            'class' => [
                (clone $startDate)->modify('+' . fake()->numberBetween(60, 120) . ' minutes'),
                'academic'
            ],
            'meeting' => [
                (clone $startDate)->modify('+' . fake()->numberBetween(3, 5) . ' hours'),
                'administrative'
            ],
            'exam_week' => [
                (clone $startDate)->modify('+' . fake()->numberBetween(3, 7) . ' days'),
                'academic'
            ],
            default => [
                (clone $startDate)->modify('+90 minutes'),
                'academic'
            ],
        };

        return [
            'title' => $this->getSchoolTitle($title),
            'description' => fake()->paragraph(),
            'location'    => fake()->randomElement(['Room 101', 'Auditorium', 'Main Gym', 'Library']),
            'type' => $type,
            'start_time' => $startDate,
            'end_time' => $endDate
        ];
    }

    private function getSchoolTitle($eventTitle)
    {
        return match ($eventTitle) {
            'class'     => fake()->randomElement(['History 101', 'Advanced Algebra', 'Biology Lab']),
            'meeting'   => fake()->randomElement(['PTA Meeting', 'Faculty Sync', 'Graduation Rehearsal']),
            'exam_week' => fake()->randomElement(['Midterm Exams', 'Finals Week', 'Science Fair']),
        };
    }
}
