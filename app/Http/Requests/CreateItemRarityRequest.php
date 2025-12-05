<?php

declare(strict_types=1);

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

final class CreateItemRarityRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'rarity_name' => ['string', 'unique:item_rarity,rarity_name', 'required'],
            'color' => ['string', 'required', 'regex:/^#([0-9A-Fa-f]{6})$/', 'unique:item_rarity,color'],
        ];
    }
}
