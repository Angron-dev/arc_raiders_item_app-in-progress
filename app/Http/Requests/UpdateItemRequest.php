<?php

declare(strict_types=1);

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

final class UpdateItemRequest extends FormRequest
{
    public function rules(): array
    {
        $id = $this->route('id');
        return [
            'item_name' => [
                'string',
                'required',
                Rule::unique('items', 'item_name')->ignore($id),
            ],
            'description' => ['string', 'required'],
            'rarity_id' => ['int', 'exists:item_rarity,id', 'required'],
            'item_type_id' => ['int', 'exists:item_type,id', 'nullable'],
            'price' => ['int', 'min:0', 'required'],
            'icon' => ['string', 'url', 'nullable'],
            'loot_areas' => ['array', 'nullable'],
            'loot_areas.*' => ['int', 'exists:loot_areas,id'],
        ];
    }
}
