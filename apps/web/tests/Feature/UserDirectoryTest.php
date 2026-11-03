<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class UserDirectoryTest extends TestCase
{
    use RefreshDatabase;

    public function test_admin_can_search_by_name_and_email_without_changing_global_counts(): void
    {
        $admin = User::factory()->create(['role' => 'admin', 'is_active' => true]);
        $person = User::factory()->create(['name' => 'Pelapor Sungai', 'email' => 'sungai@example.test', 'is_active' => true]);
        User::factory()->create(['is_active' => false]);

        $this->actingAs($admin)->getJson('/data/users?search=Pelapor%20Sungai')
            ->assertOk()->assertJsonCount(1, 'data')->assertJsonPath('data.0.id', $person->id)
            ->assertJsonPath('counts.total', 3)->assertJsonPath('counts.active', 2)->assertJsonPath('counts.admins', 1);
        $this->getJson('/data/users?search=sungai%40example.test')
            ->assertOk()->assertJsonPath('data.0.id', $person->id);
        $this->getJson('/data/users?search=tidak-ditemukan')
            ->assertOk()->assertJsonCount(0, 'data')->assertJsonPath('counts.total', 3);
    }

    public function test_counts_include_users_outside_the_current_page(): void
    {
        $admin = User::factory()->create(['role' => 'admin']);
        User::factory()->count(21)->create(['is_active' => true]);

        $this->actingAs($admin)->getJson('/data/users?page=2')
            ->assertOk()->assertJsonCount(2, 'data')->assertJsonPath('total', 22)
            ->assertJsonPath('counts.total', 22)->assertJsonPath('counts.active', 22);
    }

    public function test_guest_and_reporter_cannot_read_the_user_directory(): void
    {
        $this->getJson('/data/users')->assertUnauthorized();
        $this->actingAs(User::factory()->create())->getJson('/data/users')->assertForbidden();
    }

    public function test_search_input_cannot_change_the_query_scope(): void
    {
        $admin = User::factory()->create(['role' => 'admin']);

        $this->actingAs($admin)->getJson('/data/users?search='.urlencode("' OR 1=1 --"))
            ->assertOk()->assertJsonCount(0, 'data');
    }
}
