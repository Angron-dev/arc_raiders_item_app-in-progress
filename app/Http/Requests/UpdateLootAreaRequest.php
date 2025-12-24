<?php

declare(strict_types=1);

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

final class UpdateLootAreaRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'loot_area_name' => [
                'string',
                'required',
                Rule::unique('loot_areas', 'loot_area_name')->ignore($this->route('id')),
            ],
        ];
    }
}
