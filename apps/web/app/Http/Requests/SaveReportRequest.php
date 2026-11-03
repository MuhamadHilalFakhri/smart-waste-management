<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\In;

class SaveReportRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    /** @return array<string, array<int, string|In>> */
    public function rules(): array
    {
        return ['description' => ['required', 'string', 'min:10', 'max:5000'], 'photo' => [$this->route('report') ? 'nullable' : 'required', 'image', 'mimes:jpeg,png,webp', 'max:5120'], 'latitude' => ['required', 'numeric', 'between:-90,90'], 'longitude' => ['required', 'numeric', 'between:-180,180'], 'category' => ['nullable', Rule::in(['organic', 'plastic', 'paper'])]];
    }
}
