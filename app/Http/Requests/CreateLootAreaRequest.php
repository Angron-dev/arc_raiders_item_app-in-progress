<?php

declare(strict_types=1);

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

final class CreateLootAreaRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'loot_area_name' => ['string', 'unique:loot_area,loot_area_name', 'required'],
        ];
    }
}
