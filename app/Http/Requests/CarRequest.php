<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CarRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'color' => ['string'],
            'make' => ['string'],
            'model' => ['string'],
            'category_id'=>['required'],
            'year'=>['string'],
            'registration_no'=>['string'],
        ];
    }
}
