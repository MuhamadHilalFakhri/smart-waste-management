<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Report extends Model
{
    use SoftDeletes;

    protected $guarded = [];

    protected $hidden = ['photo_path'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function prediction()
    {
        return $this->hasOne(ReportPrediction::class);
    }

    public function histories()
    {
        return $this->hasMany(ReportStatusHistory::class)->latest();
    }

    public function scopeVisibleTo($q, User $u)
    {
        return $u->role === 'admin' ? $q : $q->where('user_id', $u->id);
    }
}
