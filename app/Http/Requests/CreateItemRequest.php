<?php

declare(strict_types=1);

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

final class CreateItemRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'item_name' => ['string', 'unique:items,item_name', 'required'],
            'description' => ['string', 'required'],
            'rarity_id' => ['int', 'exists:item_rarity,id', 'required'],
            'found_in_id' => ['int', 'exists:item_can_be_found_in,id', 'nullable'],
            'item_type_id' => ['int', 'exists:item_type,id', 'nullable'],
            'price' => ['int', 'min:0', 'required'],
            'icon' => ['string', 'url', 'nullable'],
        ];
    }
}
