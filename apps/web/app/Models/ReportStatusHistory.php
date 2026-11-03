<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;
class ReportStatusHistory extends Model { protected $guarded=[]; protected function casts(): array {return ['probabilities'=>'array'];} }