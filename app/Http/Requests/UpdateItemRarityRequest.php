<?php

declare(strict_types=1);

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

final class UpdateItemRarityRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'rarity_name' => [
                'string',
                'required',
                Rule::unique('item_rarity', 'rarity_name')->ignore($this->route('id')),
            ],
            'color' => ['string',
                'required',
                'regex:/^#([0-9A-Fa-f]{6})$/',
                Rule::unique('item_rarity', 'color')->ignore($this->route('id')),
            ],
        ];
    }
}
