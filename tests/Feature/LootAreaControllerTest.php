<?php

declare(strict_types=1);

namespace Tests\Feature;

use App\Models\LootArea;
use App\Repository\LootAreaReadRepository;
use App\Repository\LootAreaWriteRepository;
use Mockery;
use PHPUnit\Framework\Attributes\Test;
use Tests\TestCase;

class LootAreaControllerTest extends TestCase
{
    protected function tearDown(): void
    {
        Mockery::close();
        parent::tearDown();
    }

    #[Test]
    public function test_return_single_item_by_id(): void
    {
        $lootArea = LootArea::factory()->create();

        $readRepo = Mockery::mock(LootAreaReadRepository::class);
        $readRepo->shouldReceive('getLootAreaById')
            ->once()
            ->with($lootArea->id)
            ->andReturn($lootArea);

        $this->app->instance(LootAreaReadRepository::class, $readRepo);

        $response = $this->getJson(
            route('api.loot_area.single', $lootArea->id)
        );

        $response->assertStatus(200)
            ->assertJsonFragment([
                'loot_area_name' => $lootArea->loot_area_name,
            ]);
    }

    #[Test]
    public function test_create_loot_area_and_redirect(): void
    {
        $writeRepo = Mockery::mock(LootAreaWriteRepository::class);
        $writeRepo->shouldReceive('save')->once()->with(Mockery::type(LootArea::class));

        $this->app->instance(LootAreaWriteRepository::class, $writeRepo);

        $response = $this->post(route('api.loot_area.create'), ['loot_area_name' => 'Test Found In']);

        $response->assertRedirect(route('loot_area.list'));

    }

    #[Test]
    public function test_update_loot_area(): void
    {
        $lootArea = LootArea::factory()->make(['id' => 1]);

        $readRepo = Mockery::mock(LootAreaReadRepository::class);
        $readRepo->shouldReceive('getLootAreaById')
            ->once()
            ->with($lootArea->id)
            ->andReturn($lootArea);

        $this->app->instance(LootAreaReadRepository::class, $readRepo);

        $response = $this->put(
            route('api.loot_area.edit', $lootArea->id),
            ['loot_area_name' => 'Updated found in name']
        );

        $response->assertStatus(200)
            ->assertJson([
                'message' => 'Item updated successfully',
            ]);
    }

    #[Test]
    public function test_delete_loot_area_and_redirect(): void
    {
        $lootArea = LootArea::factory()->make(['id' => 1]);

        $readRepo = Mockery::mock(LootAreaReadRepository::class);
        $readRepo->shouldReceive('getLootAreaById')
            ->once()
            ->with($lootArea->id)
            ->andReturn($lootArea);

        $writeRepo = Mockery::mock(LootAreaWriteRepository::class);
        $writeRepo->shouldReceive('delete')->once()->with($lootArea);

        $this->app->instance(LootAreaReadRepository::class, $readRepo);
        $this->app->instance(LootAreaWriteRepository::class, $writeRepo);

        $response = $this->delete(route('api.loot_area.delete', $lootArea->id));

        $response->assertRedirect(route('loot_area.list'));
    }
}
