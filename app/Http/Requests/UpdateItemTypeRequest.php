<?php

declare(strict_types=1);

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

final class UpdateItemTypeRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'item_type_name' => [
                'string',
                'required',
                Rule::unique('item_type', 'item_type_name')->ignore($this->route('id')),
            ],
        ];
    }
}
