<?php

declare(strict_types=1);

namespace App\Http\Requests\Auth;

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
            'found_in_id' => ['int', 'exists:item_can_be_found_in,id', 'nullable'],
            'item_type_id' => ['int', 'exists:item_type,id', 'nullable'],
            'price' => ['int', 'min:0', 'required'],
            'icon' => ['string', 'url', 'nullable'],
        ];
    }
}
