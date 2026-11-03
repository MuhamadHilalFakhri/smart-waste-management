<?php

namespace Tests\Feature;

use App\Jobs\PredictReport;
use App\Models\Report;
use App\Models\User;
use App\Services\PredictionClient;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Queue;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Tests\TestCase;

class WasteTest extends TestCase
{
    use RefreshDatabase;

    private function user(string $role = 'user'): User
    {
        $u = User::factory()->create();
        $u->role = $role;
        $u->save();

        return $u;
    }

    private function report(User $u): Report
    {
        return Report::create(['number' => (string) Str::uuid(), 'user_id' => $u->id, 'description' => 'Tumpukan sampah plastik', 'latitude' => -6.2, 'longitude' => 106.8, 'photo_path' => 'reports/test.jpg', 'photo_version' => (string) Str::uuid(), 'status' => 'pending']);
    }

    public function test_registration_cannot_escalate_role(): void
    {
        $this->postJson('/api/v1/register', ['name' => 'Pelapor', 'email' => 'user@example.com', 'password' => 'password123', 'password_confirmation' => 'password123', 'role' => 'admin'])->assertCreated()->assertJsonPath('user.role', 'user');
    }

    public function test_guest_is_unauthorized(): void
    {
        $this->getJson('/api/v1/reports')->assertUnauthorized();
    }

    public function test_reports_are_scoped_to_owner(): void
    {
        $a = $this->user();
        $r = $this->report($this->user());
        $this->actingAs($a, 'sanctum')->getJson('/api/v1/reports/'.$r->id)->assertForbidden();
        $this->getJson('/api/v1/reports')->assertJsonCount(0, 'data');
        $this->get('/users')->assertForbidden();
    }

    public function test_create_stores_photo_and_dispatches_prediction(): void
    {
        Queue::fake();
        Storage::fake('local');
        $u = $this->user();
        $this->actingAs($u, 'sanctum')->postJson('/api/v1/reports', ['description' => 'Sampah plastik di jalan', 'latitude' => -6, 'longitude' => 106, 'photo' => UploadedFile::fake()->image('waste.jpg')])->assertCreated()->assertJsonPath('status', 'pending');
        Queue::assertPushed(PredictReport::class);
        $this->assertDatabaseCount('report_status_histories', 1);
    }

    public function test_user_cannot_edit_processed_report(): void
    {
        $u = $this->user();
        $r = $this->report($u);
        $r->update(['status' => 'in_progress']);
        $this->actingAs($u, 'sanctum')->deleteJson('/api/v1/reports/'.$r->id)->assertForbidden();
    }

    public function test_transition_records_history_and_reject_requires_reason(): void
    {
        $r = $this->report($this->user());
        $this->actingAs($this->user('admin'), 'sanctum')->patchJson('/api/v1/reports/'.$r->id.'/status', ['status' => 'rejected'])->assertUnprocessable();
        $this->patchJson('/api/v1/reports/'.$r->id.'/status', ['status' => 'in_progress'])->assertOk();
        $this->patchJson('/api/v1/reports/'.$r->id.'/status', ['status' => 'completed'])->assertOk();
        $this->patchJson('/api/v1/reports/'.$r->id.'/status', ['status' => 'in_progress'])->assertUnprocessable();
        $this->assertDatabaseCount('report_status_histories', 2);
    }

    public function test_inactive_account_is_forbidden(): void
    {
        $u = $this->user();
        $u->is_active = false;
        $u->save();
        $this->actingAs($u, 'sanctum')->getJson('/api/v1/reports')->assertForbidden();
    }

    public function test_stale_prediction_does_not_call_service(): void
    {
        Http::fake();
        $r = $this->report($this->user());
        (new PredictReport($r->id, 'old-version'))->handle(new PredictionClient);
        Http::assertNothingSent();
    }

    public function test_ml_failure_preserves_report(): void
    {
        Storage::fake('local');
        Storage::disk('local')->put('reports/test.jpg', 'bytes');
        Http::fake(fn () => Http::response([], 503));
        $r = $this->report($this->user());
        (new PredictReport($r->id, $r->photo_version))->handle(new PredictionClient);
        $this->assertDatabaseHas('report_predictions', ['report_id' => $r->id, 'status' => 'failed']);
        $this->assertDatabaseHas('reports', ['id' => $r->id, 'status' => 'pending']);
    }

    public function test_last_admin_cannot_be_disabled(): void
    {
        $a = $this->user('admin');
        $this->actingAs($a)->patchJson('/data/users/'.$a->id, ['name' => $a->name, 'email' => $a->email, 'role' => 'user', 'is_active' => false])->assertUnprocessable();
    }
}
