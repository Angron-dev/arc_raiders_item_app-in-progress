<?php

declare(strict_types=1);

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

final class CreateItemCanBeFoundRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'found_in_name' => ['string', 'unique:item_can_be_found_in,found_in_name', 'required'],
        ];
    }
}
