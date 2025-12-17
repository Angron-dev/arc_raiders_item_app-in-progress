<?php

declare(strict_types=1);

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

final class CreateItemTypeRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'item_type_name' => ['string', 'unique:item_type,item_type_name', 'required'],
        ];
    }
}
