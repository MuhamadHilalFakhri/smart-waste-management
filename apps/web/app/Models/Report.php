<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\SoftDeletes;

class Report extends Model
{
    use SoftDeletes;

    protected $guarded = [];

    protected $hidden = ['photo_path'];

    /** @return BelongsTo<User, $this> */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /** @return HasOne<ReportPrediction, $this> */
    public function prediction(): HasOne
    {
        return $this->hasOne(ReportPrediction::class);
    }

    /** @return HasMany<ReportStatusHistory, $this> */
    public function histories(): HasMany
    {
        return $this->hasMany(ReportStatusHistory::class)->latest();
    }

    /** @param Builder<Report> $q
     * @return Builder<Report> */
    public function scopeVisibleTo(Builder $q, User $u): Builder
    {
        return $u->role === 'admin' ? $q : $q->where('user_id', $u->id);
    }
}
