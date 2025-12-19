<?php

declare(strict_types=1);

namespace Database\Factories;

use App\Models\FoundIn;
use Illuminate\Database\Eloquent\Factories\Factory;

class FoundInFactory extends Factory
{
    protected $model = FoundIn::class;

    public function definition()
    {
        return [
          'found_in_name' => $this->faker->word(),
        ];
    }
}
