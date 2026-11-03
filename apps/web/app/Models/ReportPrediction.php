<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ReportPrediction extends Model
{
    protected $guarded = [];

    protected function casts(): array
    {
        return ['probabilities' => 'array'];
    }
}
