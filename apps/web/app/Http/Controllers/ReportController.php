<?php

namespace App\Http\Controllers;

use App\Actions\SaveReport;
use App\Http\Requests\SaveReportRequest;
use App\Http\Resources\ReportResource;
use App\Jobs\PredictReport;
use App\Models\Report;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\ValidationException;
use Symfony\Component\HttpFoundation\StreamedResponse;

class ReportController
{
    public function index(Request $r): JsonResponse
    {
        $q = Report::visibleTo($r->user())->with('prediction');
        if ($s = $r->query('search')) {
            $q->where(fn ($q) => $q->where('number', 'like', "%$s%")->orWhere('description', 'like', "%$s%"));
        }
        foreach (['status', 'category'] as $key) {
            if ($v = $r->query($key)) {
                $q->where($key, $v);
            }
        }
        foreach (['from' => '>=', 'to' => '<='] as $k => $op) {
            if ($v = $r->query($k)) {
                $q->whereDate('created_at', $op, $v);
            }
        }

        return response()->json($q->latest()->paginate(15)->withQueryString()
            ->through(fn (Report $report) => ReportResource::make($report)->resolve()));
    }

    public function show(Report $report): ReportResource
    {
        Gate::authorize('view', $report);

        return ReportResource::make($report->load(['prediction', 'histories']));
    }

    public function store(SaveReportRequest $r, SaveReport $action): JsonResponse
    {
        return ReportResource::make($action->execute($r->user(), $r->safe()->except('photo'), $r->file('photo')))
            ->response()->setStatusCode(201);
    }

    public function update(SaveReportRequest $r, Report $report, SaveReport $action): ReportResource
    {
        Gate::authorize('update', $report);

        return ReportResource::make($action->execute($r->user(), $r->safe()->except('photo'), $r->file('photo'), $report));
    }

    public function destroy(Report $report): Response
    {
        Gate::authorize('delete', $report);
        $report->delete();

        return response()->noContent();
    }

    public function photo(Report $report): StreamedResponse
    {
        Gate::authorize('view', $report);

        return Storage::disk('local')->response($report->photo_path);
    }

    public function retry(Report $report): JsonResponse
    {
        Gate::authorize('update', $report);
        $report->prediction()->update(['status' => 'pending']);
        PredictReport::dispatch($report->id, $report->photo_version);

        return response()->json(['message' => 'Prediksi dijadwalkan.'], 202);
    }

    public function status(Request $r, Report $report): Report
    {
        abort_unless($r->user()->role === 'admin', 403);
        $d = $r->validate(['status' => 'required|in:in_progress,completed,rejected', 'note' => 'nullable|string|max:2000']);

        return DB::transaction(function () use ($r, $report, $d) {
            $report = Report::lockForUpdate()->findOrFail($report->id);
            $allowed = ['pending' => ['in_progress', 'rejected'], 'in_progress' => ['completed', 'rejected']];
            if (! in_array($d['status'], $allowed[$report->status] ?? []) || ($d['status'] === 'rejected' && empty($d['note']))) {
                throw ValidationException::withMessages(['status' => 'Transisi tidak valid atau alasan penolakan kosong.']);
            }$report->histories()->create(['user_id' => $r->user()->id, 'from_status' => $report->status, 'to_status' => $d['status'], 'note' => $d['note'] ?? null]);
            $report->update(['status' => $d['status']]);

            return $report;
        });
    }

    public function dashboard(Request $r): JsonResponse
    {
        $q = Report::visibleTo($r->user());

        return response()->json(['total' => (clone $q)->count(), 'statuses' => (clone $q)->selectRaw('status, count(*) as total')->groupBy('status')->pluck('total', 'status'), 'categories' => (clone $q)->selectRaw('category, count(*) as total')->groupBy('category')->get(), 'trend' => (clone $q)->where('created_at', '>=', now()->subDays(29))->selectRaw('DATE(created_at) as date, count(*) as total')->groupByRaw('DATE(created_at)')->orderBy('date')->get()]);
    }
}
