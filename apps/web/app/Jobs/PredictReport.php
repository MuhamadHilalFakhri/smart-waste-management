<?php

namespace App\Jobs;

use App\Models\Report;
use App\Services\PredictionClient;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Support\Facades\DB;

class PredictReport implements ShouldQueue
{
    use Queueable;

    public int $tries = 1;

    public int $timeout = 45;

    public function __construct(public int $reportId, public string $version) {}

    public function handle(PredictionClient $client): void
    {
        $r = Report::find($this->reportId);
        if (! $r || $r->photo_version !== $this->version) {
            return;
        }
        try {
            $result = $client->predict($r->photo_path);
            $values = ['status' => 'succeeded', ...$result];
        } catch (\Throwable $e) {
            report($e);
            $values = ['status' => 'failed', 'label' => null, 'confidence' => null, 'probabilities' => null, 'model_version' => null];
        }
        DB::transaction(function () use ($values) {
            $r = Report::lockForUpdate()->find($this->reportId);
            if ($r && $r->photo_version === $this->version) {
                $r->prediction()->updateOrCreate([], $values);
            }
        });
    }

    public function failed(?\Throwable $exception): void
    {
        $report = Report::find($this->reportId);
        if ($report && $report->photo_version === $this->version) {
            $report->prediction()->update(['status' => 'failed']);
        }
    }
}
